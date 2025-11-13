# 🎯 Analisador de Vagas - Job Matcher

Aplicação completa para analisar o match entre seu currículo e descrições de vagas de emprego.

## 📋 Funcionalidades

### 🤖 Análise Inteligente com IA
- **Matching Semântico**: Usa embeddings de IA para entender sinônimos e contexto
- **Análise de Similaridade**: Detecta habilidades relacionadas (ex: "React" ≈ "React.js")
- **Score Multidimensional**: Combina similaridade geral + cobertura de skills
- **Detecção de Senioridade**: Identifica nível júnior/pleno/sênior automaticamente
- **Recomendações Personalizadas**: Sugestões inteligentes baseadas no resultado

### 📄 Processamento de Documentos
- Upload de currículo (PDF ou DOCX)
- Extração automática de habilidades usando NLP
- Análise de anos de experiência

### 📊 Visualização
- Score percentual de compatibilidade com confiança
- Métricas detalhadas (similaridade geral, cobertura de skills)
- Habilidades em comum com % de match individual
- Habilidades faltantes priorizadas
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

# Instalar dependências (pode demorar alguns minutos)
pip install -r requirements.txt

# Baixar modelo spaCy em português
python -m spacy download pt_core_news_lg

# (OPCIONAL) Testar se a IA está funcionando
python test_ai.py

# Executar servidor
# Na primeira execução, o modelo de IA será baixado automaticamente (~400MB)
python app.py
```

O backend estará em `http://localhost:5000`

**⚠️ Primeira execução**: O download do modelo de IA pode levar alguns minutos dependendo da sua conexão.

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

- [x] ~~Implementar análise semântica com IA~~ ✅ **IMPLEMENTADO!**
- [ ] Adicionar autenticação de usuários
- [ ] Banco de dados para persistência
- [ ] Histórico de análises
- [ ] Exportar relatórios em PDF
- [ ] Integração com APIs de cursos (Udemy, Coursera)
- [ ] Análise de soft skills
- [ ] Integração com LinkedIn
- [ ] Ranking de múltiplas vagas
- [ ] Geração de carta de apresentação com GPT

## 📦 Tecnologias

**Backend:**
- Flask
- Sentence Transformers (IA para embeddings semânticos)
- spaCy (NLP)
- scikit-learn (similaridade por cosseno)
- pdfplumber
- python-docx

**Frontend:**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios
- React Hot Toast (notificações elegantes)

## 📝 Licença

MIT
