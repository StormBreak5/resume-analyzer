from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
import pdfplumber
from docx import Document
import json
import os
from werkzeug.utils import secure_filename
from ai_matcher import IntelligentMatcher

app = Flask(__name__)
CORS(app)

# Configurações
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'docx'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max

# Carregar modelo spaCy (português)
try:
    nlp = spacy.load("pt_core_news_lg")
except:
    print("Modelo pt_core_news_lg não encontrado. Instale com: python -m spacy download pt_core_news_lg")
    nlp = None

# Inicializar matcher inteligente
print("Inicializando IA...")
ai_matcher = IntelligentMatcher()
print("IA pronta!")

# Armazenamento simples em memória (em produção, use banco de dados)
cv_data = {}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(file_path):
    """Extrai texto de PDF"""
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text

def extract_text_from_docx(file_path):
    """Extrai texto de DOCX"""
    doc = Document(file_path)
    return "\n".join([paragraph.text for paragraph in doc.paragraphs])

def extract_skills(text):
    """Extrai habilidades do texto usando spaCy e lista customizada"""
    
    # Lista de habilidades técnicas comuns (expandir conforme necessário)
    skills_keywords = [
        'python', 'javascript', 'java', 'react', 'angular', 'vue', 'node.js', 'nodejs',
        'django', 'flask', 'fastapi', 'sql', 'mysql', 'postgresql', 'mongodb',
        'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'git', 'agile', 'scrum',
        'html', 'css', 'typescript', 'next.js', 'nextjs', 'express', 'rest', 'api',
        'machine learning', 'data science', 'pandas', 'numpy', 'tensorflow',
        'ci/cd', 'jenkins', 'linux', 'windows', 'excel', 'power bi', 'tableau'
    ]
    
    text_lower = text.lower()
    found_skills = []
    
    for skill in skills_keywords:
        if skill in text_lower:
            found_skills.append(skill)
    
    # Usar spaCy para extrair entidades adicionais
    if nlp:
        doc = nlp(text)
        for ent in doc.ents:
            if ent.label_ in ['ORG', 'PRODUCT', 'SKILL']:
                found_skills.append(ent.text.lower())
    
    return list(set(found_skills))  # Remover duplicatas

def calculate_match(cv_skills, job_skills):
    """Calcula o match entre CV e vaga"""
    cv_skills_set = set(cv_skills)
    job_skills_set = set(job_skills)
    
    common_skills = cv_skills_set.intersection(job_skills_set)
    missing_skills = job_skills_set - cv_skills_set
    
    if len(job_skills_set) == 0:
        score = 0
    else:
        score = (len(common_skills) / len(job_skills_set)) * 100
    
    return {
        'score': round(score, 2),
        'common_skills': list(common_skills),
        'missing_skills': list(missing_skills),
        'total_cv_skills': len(cv_skills_set),
        'total_job_skills': len(job_skills_set)
    }

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'spacy_loaded': nlp is not None})

@app.route('/upload-cv', methods=['POST'])
def upload_cv():
    """Endpoint para upload e processamento do CV"""

    if 'file' not in request.files:
        return jsonify({'error': 'Nenhum arquivo enviado'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'Nenhum arquivo selecionado'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Extrair texto baseado no tipo de arquivo
        try:
            if filename.endswith('.pdf'):
                text = extract_text_from_pdf(filepath)
            elif filename.endswith('.docx'):
                text = extract_text_from_docx(filepath)
            else:
                return jsonify({'error': 'Formato não suportado'}), 400
            
            # Extrair habilidades
            skills = extract_skills(text)
            
            # Salvar em memória (usar user_id em produção)
            user_id = 'default_user'
            cv_data[user_id] = {
                'text': text,
                'skills': skills,
                'filename': filename
            }
            
            # Limpar arquivo temporário
            os.remove(filepath)
            
            return jsonify({
                'message': 'CV processado com sucesso',
                'skills_found': len(skills),
                'skills': skills
            })
        
        except Exception as e:
            return jsonify({'error': f'Erro ao processar arquivo: {str(e)}'}), 500
    
    return jsonify({'error': 'Tipo de arquivo não permitido'}), 400

@app.route('/analyze-job', methods=['POST'])
def analyze_job():
    """Endpoint para análise de vaga com IA"""
    data = request.get_json()
    
    if not data or 'job_description' not in data:
        return jsonify({'error': 'Descrição da vaga não fornecida'}), 400
    
    job_description = data['job_description']
    user_id = 'default_user'
    
    # Verificar se existe CV salvo
    if user_id not in cv_data:
        return jsonify({'error': 'Nenhum CV encontrado. Faça upload primeiro.'}), 400
    
    # Extrair habilidades da vaga
    job_skills = extract_skills(job_description)
    cv_skills = cv_data[user_id]['skills']
    cv_text = cv_data[user_id]['text']
    
    # Análise inteligente com IA
    ai_result = ai_matcher.semantic_match(cv_text, job_description, cv_skills, job_skills)
    
    # Análise de nível de experiência
    cv_level = ai_matcher.analyze_experience_level(cv_text)
    job_level = ai_matcher.analyze_experience_level(job_description)
    
    # Gerar recomendações
    recommendations = ai_matcher.generate_recommendations(
        ai_result['missing_skills'], 
        ai_result['score']
    )
    
    # Combinar resultados
    result = {
        **ai_result,
        'cv_level': cv_level,
        'job_level': job_level,
        'recommendations': recommendations,
        'analysis_type': 'semantic_ai'
    }
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
