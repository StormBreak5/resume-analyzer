"""
Módulo de matching inteligente usando embeddings semânticos
"""
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import re

class IntelligentMatcher:
    def __init__(self):
        # Modelo multilíngue otimizado para português
        print("Carregando modelo de IA...")
        self.model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
        print("Modelo carregado com sucesso!")
        
    def extract_skills_intelligent(self, text):
        """
        Extrai habilidades de forma mais inteligente usando NLP
        """
        # Normalizar texto
        text = text.lower()
        
        # Padrões comuns de habilidades
        patterns = [
            r'\b\w+\.js\b',  # JavaScript frameworks
            r'\b\w+\+\+\b',  # C++, etc
            r'\b[a-z]+\s+[a-z]+\b',  # Duas palavras (machine learning)
        ]
        
        # Extrair sentenças que mencionam habilidades
        sentences = re.split(r'[.;,\n]', text)
        skill_sentences = []
        
        keywords = ['experiência', 'conhecimento', 'domínio', 'habilidade', 
                   'proficiência', 'familiaridade', 'expertise', 'skills',
                   'tecnologias', 'ferramentas', 'linguagens']
        
        for sentence in sentences:
            if any(keyword in sentence for keyword in keywords):
                skill_sentences.append(sentence.strip())
        
        return skill_sentences
    
    def semantic_match(self, cv_text, job_text, cv_skills, job_skills):
        """
        Realiza matching semântico entre CV e vaga
        """
        # 1. Similaridade geral entre textos completos
        cv_embedding = self.model.encode([cv_text])
        job_embedding = self.model.encode([job_text])
        overall_similarity = cosine_similarity(cv_embedding, job_embedding)[0][0]
        
        # 2. Matching de habilidades individuais com threshold semântico
        cv_skills_embeddings = self.model.encode(cv_skills)
        job_skills_embeddings = self.model.encode(job_skills)
        
        # Calcular similaridade entre cada skill do CV e da vaga
        similarity_matrix = cosine_similarity(cv_skills_embeddings, job_skills_embeddings)
        
        # Encontrar matches (threshold de 0.7 = 70% de similaridade)
        threshold = 0.7
        matched_skills = []
        matched_job_skills = set()
        skill_matches_detail = []
        
        for i, cv_skill in enumerate(cv_skills):
            for j, job_skill in enumerate(job_skills):
                similarity = similarity_matrix[i][j]
                if similarity >= threshold:
                    matched_skills.append({
                        'cv_skill': cv_skill,
                        'job_skill': job_skill,
                        'similarity': float(similarity)
                    })
                    matched_job_skills.add(j)
                    skill_matches_detail.append({
                        'cv': cv_skill,
                        'job': job_skill,
                        'match': round(similarity * 100, 1)
                    })
        
        # Habilidades faltantes (não matcheadas)
        missing_skills = [job_skills[j] for j in range(len(job_skills)) 
                         if j not in matched_job_skills]
        
        # 3. Calcular score final (combinação de múltiplos fatores)
        if len(job_skills) > 0:
            skill_coverage = len(matched_job_skills) / len(job_skills)
        else:
            skill_coverage = 0
        
        # Score ponderado
        final_score = (
            overall_similarity * 0.3 +  # 30% similaridade geral
            skill_coverage * 0.7         # 70% cobertura de skills
        ) * 100
        
        return {
            'score': round(final_score, 2),
            'overall_similarity': round(overall_similarity * 100, 2),
            'skill_coverage': round(skill_coverage * 100, 2),
            'matched_skills': len(matched_job_skills),
            'total_job_skills': len(job_skills),
            'skill_matches': skill_matches_detail,
            'missing_skills': missing_skills,
            'confidence': 'high' if final_score >= 70 else 'medium' if final_score >= 40 else 'low'
        }
    
    def analyze_experience_level(self, text):
        """
        Detecta nível de experiência usando análise semântica
        """
        text_lower = text.lower()
        
        # Padrões de senioridade
        senior_keywords = ['sênior', 'senior', 'líder', 'lead', 'arquiteto', 
                          'especialista', 'expert', 'coordenador', 'gerente']
        pleno_keywords = ['pleno', 'mid-level', 'intermediário']
        junior_keywords = ['júnior', 'junior', 'trainee', 'estagiário', 'iniciante']
        
        # Contar anos de experiência
        years_pattern = r'(\d+)\s*(?:anos?|years?)'
        years_matches = re.findall(years_pattern, text_lower)
        years = max([int(y) for y in years_matches], default=0)
        
        # Determinar nível
        if any(keyword in text_lower for keyword in senior_keywords) or years >= 5:
            level = 'Sênior'
        elif any(keyword in text_lower for keyword in pleno_keywords) or years >= 2:
            level = 'Pleno'
        elif any(keyword in text_lower for keyword in junior_keywords) or years < 2:
            level = 'Júnior'
        else:
            level = 'Não identificado'
        
        return {
            'level': level,
            'years_experience': years
        }
    
    def generate_recommendations(self, missing_skills, score):
        """
        Gera recomendações personalizadas baseadas no resultado
        """
        recommendations = []
        
        if score < 40:
            recommendations.append({
                'type': 'warning',
                'message': 'Seu perfil tem baixa compatibilidade com esta vaga. Considere desenvolver as habilidades faltantes antes de se candidatar.'
            })
        elif score < 70:
            recommendations.append({
                'type': 'info',
                'message': 'Você tem um match razoável! Destaque suas habilidades em comum na candidatura.'
            })
        else:
            recommendations.append({
                'type': 'success',
                'message': 'Excelente match! Você é um candidato forte para esta vaga.'
            })
        
        # Recomendações de estudo
        if missing_skills:
            top_missing = missing_skills[:3]  # Top 3 mais importantes
            recommendations.append({
                'type': 'study',
                'message': f'Priorize aprender: {", ".join(top_missing)}',
                'skills': top_missing
            })
        
        return recommendations
