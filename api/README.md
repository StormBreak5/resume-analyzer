# Backend - Analisador de Vagas

## Instalação

```bash
# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Baixar modelo spaCy em português
python -m spacy download pt_core_news_lg
```

## Executar

```bash
python app.py
```

O servidor estará disponível em `http://localhost:5000`

## Endpoints

### POST /upload-cv
Upload do currículo (PDF ou DOCX)

### POST /analyze-job
Análise de match entre CV e vaga
Body: `{ "job_description": "texto da vaga..." }`

### GET /health
Verificar status do servidor
