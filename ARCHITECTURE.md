# 🏗️ Arquitetura do Job Matcher com IA

## Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                        USUÁRIO                               │
│                     (Navegador Web)                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  page.tsx (React Component)                          │  │
│  │  - Upload de CV                                      │  │
│  │  - Input de descrição da vaga                        │  │
│  │  - Visualização de resultados                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         │ Axios (HTTP Client)                │
└─────────────────────────┼────────────────────────────────────┘
                          │
                          │ REST API
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Flask)                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  app.py (API Server)                                 │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │  Endpoints:                                     │ │  │
│  │  │  - POST /upload-cv                              │ │  │
│  │  │  - POST /analyze-job                            │ │  │
│  │  │  - GET /health                                  │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Processamento de Documentos                         │  │
│  │  - pdfplumber (PDF)                                  │  │
│  │  - python-docx (DOCX)                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  ai_matcher.py (Módulo de IA)                        │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │  IntelligentMatcher                             │ │  │
│  │  │  - semantic_match()                             │ │  │
│  │  │  - analyze_experience_level()                   │ │  │
│  │  │  - generate_recommendations()                   │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Sentence Transformers (IA)                          │  │
│  │  - Modelo: paraphrase-multilingual-MiniLM-L12-v2    │  │
│  │  - Gera embeddings semânticos                        │  │
│  │  - Calcula similaridade por cosseno                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  spaCy (NLP)                                         │  │
│  │  - Modelo: pt_core_news_lg                           │  │
│  │  - Extração de entidades                             │  │
│  │  - Análise linguística                               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Fluxo de Dados

### 1. Upload de CV

```
Usuário
  │
  │ 1. Seleciona arquivo (PDF/DOCX)
  ▼
Frontend
  │
  │ 2. FormData com arquivo
  ▼
Backend (POST /upload-cv)
  │
  │ 3. Salva temporariamente
  ▼
Extração de Texto
  │
  ├─ PDF → pdfplumber.extract_text()
  └─ DOCX → Document.paragraphs
  │
  │ 4. Texto extraído
  ▼
Extração de Skills
  │
  ├─ Keywords matching
  └─ spaCy NLP
  │
  │ 5. Lista de habilidades
  ▼
Armazenamento em Memória
  │
  │ 6. cv_data[user_id] = {text, skills}
  ▼
Resposta JSON
  │
  │ 7. {skills_found, skills: [...]}
  ▼
Frontend
  │
  │ 8. Exibe habilidades encontradas
  ▼
Usuário
```

---

### 2. Análise de Vaga

```
Usuário
  │
  │ 1. Cola descrição da vaga
  ▼
Frontend
  │
  │ 2. JSON {job_description}
  ▼
Backend (POST /analyze-job)
  │
  │ 3. Recupera CV da memória
  ▼
Extração de Skills da Vaga
  │
  │ 4. job_skills = extract_skills(job_text)
  ▼
IA - Análise Semântica
  │
  ├─ 5a. Gera embeddings do CV
  │      cv_embedding = model.encode(cv_text)
  │
  ├─ 5b. Gera embeddings da vaga
  │      job_embedding = model.encode(job_text)
  │
  ├─ 5c. Similaridade geral
  │      overall_sim = cosine_similarity(cv_emb, job_emb)
  │
  ├─ 5d. Matching de skills individuais
  │      Para cada cv_skill vs job_skill:
  │        similarity = cosine_similarity(...)
  │        if similarity >= 0.7: MATCH!
  │
  └─ 5e. Calcula score final
         score = (overall_sim * 0.3) + (coverage * 0.7)
  │
  │ 6. Resultado da IA
  ▼
Análise de Senioridade
  │
  ├─ 7a. Detecta nível do CV
  └─ 7b. Detecta nível da vaga
  │
  │ 8. {cv_level, job_level}
  ▼
Geração de Recomendações
  │
  │ 9. Baseado em score e missing_skills
  ▼
Resposta JSON Completa
  │
  │ 10. {score, matches, recommendations, ...}
  ▼
Frontend
  │
  │ 11. Renderiza resultados
  ▼
Usuário
```

---

## Componentes Principais

### Frontend (Next.js)

```typescript
web/
├── app/
│   ├── page.tsx          // Componente principal
│   ├── layout.tsx        // Layout global
│   └── globals.css       // Estilos globais
├── package.json          // Dependências
└── tailwind.config.ts    // Configuração Tailwind
```

**Responsabilidades:**
- Interface do usuário
- Upload de arquivos
- Chamadas HTTP para API
- Visualização de resultados

---

### Backend (Flask)

```python
api/
├── app.py                # Servidor Flask + Endpoints
├── ai_matcher.py         # Módulo de IA
├── test_ai.py            # Testes da IA
├── requirements.txt      # Dependências Python
└── uploads/              # Pasta temporária (criada automaticamente)
```

**Responsabilidades:**
- API REST
- Processamento de documentos
- Orquestração da IA
- Gerenciamento de dados

---

### Módulo de IA (ai_matcher.py)

```python
class IntelligentMatcher:
    
    def __init__(self):
        # Carrega modelo de embeddings
        self.model = SentenceTransformer(...)
    
    def semantic_match(cv_text, job_text, cv_skills, job_skills):
        # 1. Embeddings
        # 2. Similaridade
        # 3. Matching de skills
        # 4. Score final
        return {...}
    
    def analyze_experience_level(text):
        # Detecta júnior/pleno/sênior
        return {level, years}
    
    def generate_recommendations(missing_skills, score):
        # Gera sugestões personalizadas
        return [...]
```

---

## Tecnologias e Bibliotecas

### Backend

| Biblioteca | Versão | Função |
|------------|--------|--------|
| Flask | 3.0.0 | Framework web |
| sentence-transformers | 2.2.2 | IA para embeddings |
| spaCy | 3.7.2 | NLP |
| scikit-learn | 1.3.2 | Cálculos matemáticos |
| pdfplumber | 0.10.3 | Leitura de PDF |
| python-docx | 1.1.0 | Leitura de DOCX |
| flask-cors | 4.0.0 | CORS |

### Frontend

| Biblioteca | Versão | Função |
|------------|--------|--------|
| Next.js | 14.2.0 | Framework React |
| React | 18 | UI Library |
| TypeScript | 5 | Tipagem |
| Tailwind CSS | 3.3.0 | Estilização |
| Axios | 1.6.0 | HTTP Client |

---

## Modelos de IA

### Sentence Transformers
```
Modelo: paraphrase-multilingual-MiniLM-L12-v2
Tamanho: ~400MB
Idiomas: 50+ (incluindo português)
Dimensões: 384
Treinamento: Milhões de pares de sentenças
```

**Características:**
- Multilíngue
- Otimizado para similaridade semântica
- Rápido (inferência em CPU)
- Pré-treinado (não precisa treinar)

### spaCy
```
Modelo: pt_core_news_lg
Tamanho: ~560MB
Idioma: Português
Componentes: tokenizer, tagger, parser, NER
```

**Características:**
- Específico para português
- Extração de entidades
- Análise morfológica
- POS tagging

---

## Armazenamento

### Memória (Atual)
```python
cv_data = {
    'default_user': {
        'text': '...',
        'skills': [...],
        'filename': 'cv.pdf'
    }
}
```

**Limitações:**
- Dados perdidos ao reiniciar
- Não suporta múltiplos usuários
- Sem histórico

### Futuro (Banco de Dados)
```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    email VARCHAR(255)
);

CREATE TABLE cvs (
    id INT PRIMARY KEY,
    user_id INT,
    text TEXT,
    skills JSON,
    uploaded_at TIMESTAMP
);

CREATE TABLE analyses (
    id INT PRIMARY KEY,
    cv_id INT,
    job_description TEXT,
    score FLOAT,
    result JSON,
    created_at TIMESTAMP
);
```

---

## Segurança

### Validações
```python
# Tipos de arquivo
ALLOWED_EXTENSIONS = {'pdf', 'docx'}

# Tamanho máximo
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB

# Sanitização
filename = secure_filename(file.filename)
```

### CORS
```python
CORS(app)  # Permite requisições do frontend
```

### Limpeza
```python
os.remove(filepath)  # Remove arquivo após processar
```

---

## Performance

### Otimizações
1. **Cache do modelo**: Carregado uma vez na inicialização
2. **Processamento assíncrono**: Possível adicionar Celery
3. **Batch processing**: Processar múltiplas skills de uma vez
4. **Compressão**: Gzip nas respostas HTTP

### Métricas
```
Tempo de resposta:
- Upload CV: ~1-2s
- Análise: ~2-3s
- Total: ~4-6s

Uso de memória:
- Modelo IA: ~500MB
- spaCy: ~600MB
- Total: ~1.2GB
```

---

## Escalabilidade

### Horizontal
```
Load Balancer
    │
    ├─ Backend Instance 1
    ├─ Backend Instance 2
    └─ Backend Instance 3
         │
         └─ Shared Database
```

### Vertical
- Mais RAM para modelos maiores
- GPU para inferência mais rápida
- SSD para I/O de arquivos

---

## Monitoramento (Futuro)

```python
# Métricas a coletar
- Tempo de resposta por endpoint
- Taxa de erro
- Uso de memória/CPU
- Número de análises por dia
- Score médio das análises
```

**Ferramentas sugeridas:**
- Prometheus + Grafana
- Sentry (erros)
- ELK Stack (logs)
