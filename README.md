# 🎯 Analisador de Vagas - Job Matcher

Aplicação completa para analisar o match entre seu currículo e descrições de vagas de emprego.

## 📋 Funcionalidades

- Upload de currículo (PDF ou DOCX)
- Extração automática de habilidades usando NLP
- Análise de match com descrições de vagas
- Score percentual de compatibilidade
- Identificação de habilidades em comum e faltantes
- Interface moderna e responsiva

## 🏗️ Arquitetura

### Backend (Python + Flask)
- Processamento de PDFs e DOCX
- NLP com spaCy para extração de habilidades
- API REST com CORS habilitado
- Algoritmo de matching por palavras-chave

### Frontend (Next.js + TypeScript)
- Interface moderna com Tailwind CSS
- Upload de arquivos
- Visualização de resultados em tempo real
- Design responsivo

## 🚀 Como Executar

### 1. Backend

```bash
cd api

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual (Windows)
venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt

# Baixar modelo spaCy em português
python -m spacy download pt_core_news_lg

# Executar servidor
python app.py
```

O backend estará em `http://localhost:5000`

### 2. Frontend

```bash
cd web

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

O frontend estará em `http://localhost:3000`

## 📊 Como Usar

1. **Upload do CV**: Faça upload do seu currículo em PDF ou DOCX
2. **Aguarde o processamento**: O sistema extrairá suas habilidades automaticamente
3. **Cole a vaga**: Copie e cole a descrição completa da vaga desejada
4. **Analise o resultado**: Veja o score de match e as habilidades em comum/faltantes

## 🔧 Melhorias Futuras

- [ ] Implementar Método B (comparação semântica com BERT/SBERT)
- [ ] Adicionar autenticação de usuários
- [ ] Banco de dados para persistência
- [ ] Histórico de análises
- [ ] Exportar relatórios em PDF
- [ ] Sugestões de cursos para habilidades faltantes
- [ ] Análise de soft skills
- [ ] Integração com LinkedIn

## 📦 Tecnologias

**Backend:**
- Flask
- spaCy
- pdfplumber
- python-docx

**Frontend:**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios

## 📝 Licença

MIT
