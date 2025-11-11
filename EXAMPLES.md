# 📚 Exemplos de Uso da IA

## Exemplo 1: Desenvolvedor Frontend

### CV
```
Maria Santos
Desenvolvedora Frontend com 2 anos de experiência

Habilidades:
- React, Vue.js
- HTML5, CSS3, Sass
- JavaScript ES6+
- Git, GitHub
- Responsive Design
```

### Vaga
```
Desenvolvedor Front-End Pleno

Requisitos:
- ReactJS
- Estilização com CSS/SCSS
- JavaScript moderno
- Controle de versão
- Design responsivo
```

### Resultado da IA
```json
{
  "score": 92,
  "overall_similarity": 88,
  "skill_coverage": 100,
  "confidence": "high",
  
  "skill_matches": [
    {"cv": "react", "job": "reactjs", "match": 96},
    {"cv": "sass", "job": "scss", "match": 94},
    {"cv": "javascript es6+", "job": "javascript moderno", "match": 89},
    {"cv": "git", "job": "controle de versão", "match": 82},
    {"cv": "responsive design", "job": "design responsivo", "match": 98}
  ],
  
  "missing_skills": [],
  
  "recommendations": [
    {
      "type": "success",
      "message": "Excelente match! Você é um candidato forte para esta vaga."
    }
  ]
}
```

---

## Exemplo 2: Desenvolvedor Backend (Match Parcial)

### CV
```
Pedro Oliveira
Desenvolvedor Backend Júnior - 1 ano de experiência

Habilidades:
- Python, Flask
- MySQL
- REST APIs
- Git
```

### Vaga
```
Desenvolvedor Backend Sênior

Requisitos:
- Python, Django
- PostgreSQL, MongoDB
- Microserviços
- Docker, Kubernetes
- AWS
- 5+ anos de experiência
```

### Resultado da IA
```json
{
  "score": 45,
  "overall_similarity": 52,
  "skill_coverage": 40,
  "confidence": "medium",
  
  "skill_matches": [
    {"cv": "python", "job": "python", "match": 100},
    {"cv": "flask", "job": "django", "match": 72},
    {"cv": "mysql", "job": "postgresql", "match": 78},
    {"cv": "rest apis", "job": "microserviços", "match": 68}
  ],
  
  "missing_skills": ["mongodb", "docker", "kubernetes", "aws"],
  
  "cv_level": {"level": "Júnior", "years_experience": 1},
  "job_level": {"level": "Sênior", "years_experience": 5},
  
  "recommendations": [
    {
      "type": "warning",
      "message": "Seu perfil tem baixa compatibilidade com esta vaga. Considere desenvolver as habilidades faltantes antes de se candidatar."
    },
    {
      "type": "study",
      "message": "Priorize aprender: mongodb, docker, kubernetes",
      "skills": ["mongodb", "docker", "kubernetes"]
    }
  ]
}
```

---

## Exemplo 3: Desenvolvedor Full Stack

### CV
```
Ana Costa
Desenvolvedora Full Stack - 4 anos de experiência

Habilidades:
- JavaScript, TypeScript
- React, Next.js
- Node.js, Express
- PostgreSQL, MongoDB
- Docker
- AWS (básico)
- Scrum, Agile
```

### Vaga
```
Full Stack Developer - Pleno/Sênior

Requisitos:
- TypeScript
- React.js ou Vue
- Node com Express ou Fastify
- Banco de dados SQL e NoSQL
- Containerização
- Cloud (AWS, Azure ou GCP)
- Metodologias ágeis
```

### Resultado da IA
```json
{
  "score": 88,
  "overall_similarity": 85,
  "skill_coverage": 95,
  "confidence": "high",
  
  "skill_matches": [
    {"cv": "typescript", "job": "typescript", "match": 100},
    {"cv": "react", "job": "react.js", "match": 97},
    {"cv": "node.js", "job": "node", "match": 98},
    {"cv": "express", "job": "express", "match": 100},
    {"cv": "postgresql", "job": "sql", "match": 85},
    {"cv": "mongodb", "job": "nosql", "match": 88},
    {"cv": "docker", "job": "containerização", "match": 92},
    {"cv": "aws", "job": "cloud", "match": 79},
    {"cv": "scrum", "job": "metodologias ágeis", "match": 86}
  ],
  
  "missing_skills": ["fastify", "azure", "gcp"],
  
  "cv_level": {"level": "Pleno", "years_experience": 4},
  "job_level": {"level": "Pleno", "years_experience": 0},
  
  "recommendations": [
    {
      "type": "success",
      "message": "Excelente match! Você é um candidato forte para esta vaga."
    },
    {
      "type": "info",
      "message": "Considere mencionar experiência com alternativas como Fastify se já trabalhou com frameworks similares."
    }
  ]
}
```

---

## Exemplo 4: Transição de Carreira

### CV
```
Carlos Mendes
Analista de Dados - 3 anos de experiência

Habilidades:
- Python (Pandas, NumPy)
- SQL avançado
- Excel, Power BI
- Estatística
- Git
```

### Vaga
```
Desenvolvedor Python Júnior

Requisitos:
- Python
- Conhecimento em frameworks web (Django ou Flask)
- Banco de dados SQL
- Git
- APIs REST
```

### Resultado da IA
```json
{
  "score": 58,
  "overall_similarity": 62,
  "skill_coverage": 60,
  "confidence": "medium",
  
  "skill_matches": [
    {"cv": "python", "job": "python", "match": 100},
    {"cv": "sql", "job": "sql", "match": 100},
    {"cv": "git", "job": "git", "match": 100}
  ],
  
  "missing_skills": ["django", "flask", "apis rest"],
  
  "cv_level": {"level": "Pleno", "years_experience": 3},
  "job_level": {"level": "Júnior", "years_experience": 0},
  
  "recommendations": [
    {
      "type": "info",
      "message": "Você tem um match razoável! Destaque suas habilidades em comum na candidatura."
    },
    {
      "type": "study",
      "message": "Priorize aprender: django, flask, apis rest",
      "skills": ["django", "flask", "apis rest"]
    },
    {
      "type": "info",
      "message": "Sua experiência com Python e SQL é valiosa. Considere fazer projetos pessoais com Django/Flask para fortalecer seu perfil."
    }
  ]
}
```

---

## Como a IA Ajuda em Cada Caso

### ✅ Caso 1 (Match Alto)
- Identifica sinônimos: "React" = "ReactJS"
- Reconhece variações: "Sass" ≈ "SCSS"
- Entende contexto: "JavaScript ES6+" ≈ "JavaScript moderno"

### ⚠️ Caso 2 (Match Baixo)
- Detecta gap de senioridade: Júnior vs Sênior
- Prioriza skills faltantes mais importantes
- Sugere caminho de desenvolvimento

### 🎯 Caso 3 (Match Excelente)
- Reconhece habilidades relacionadas
- Entende que "Docker" = "Containerização"
- Valida nível de experiência compatível

### 🔄 Caso 4 (Transição)
- Identifica skills transferíveis
- Sugere aprendizado direcionado
- Reconhece potencial mesmo com gaps
