# ⚡ Quick Start - Job Matcher com IA

## 🚀 Instalação Rápida (5 minutos)

### 1️⃣ Backend (Python)

```bash
# Navegar para pasta do backend
cd api

# Criar ambiente virtual
python -m venv venv

# Ativar (Windows)
venv\Scripts\activate

# Instalar tudo (pode demorar 2-3 minutos)
pip install -r requirements.txt

# Baixar modelo de português
python -m spacy download pt_core_news_lg

# Testar se funciona (OPCIONAL)
python test_ai.py

# Iniciar servidor
python app.py
```

✅ Backend rodando em `http://localhost:5000`

---

### 2️⃣ Frontend (Next.js)

**Em outro terminal:**

```bash
# Navegar para pasta do frontend
cd web

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

✅ Frontend rodando em `http://localhost:3000`

---

## 🎯 Como Usar

1. **Abra** `http://localhost:3000` no navegador
2. **Faça upload** do seu CV (PDF ou DOCX)
3. **Aguarde** o processamento (alguns segundos)
4. **Cole** a descrição da vaga desejada
5. **Clique** em "Analisar Match"
6. **Veja** o resultado com IA! 🤖

---

## ⚠️ Primeira Execução

Na primeira vez que rodar o backend, o modelo de IA será baixado automaticamente:
- **Tamanho**: ~400MB
- **Tempo**: 2-5 minutos (depende da internet)
- **Só acontece uma vez**: Depois fica salvo no cache

---

## 🐛 Problemas Comuns

### Erro: "Modelo pt_core_news_lg não encontrado"
```bash
python -m spacy download pt_core_news_lg
```

### Erro: "Module 'sentence_transformers' not found"
```bash
pip install sentence-transformers
```

### Erro: "Port 5000 already in use"
Mude a porta no `app.py`:
```python
app.run(debug=True, port=5001)  # Usar 5001
```

E no frontend `web/app/page.tsx`:
```typescript
const API_URL = 'http://localhost:5001'  // Atualizar
```

### Frontend não conecta no backend
Verifique se:
1. Backend está rodando (`http://localhost:5000/health`)
2. CORS está habilitado (já está no código)
3. Firewall não está bloqueando

---

## 📊 Testando a IA

Execute o script de teste:
```bash
cd api
python test_ai.py
```

Você verá:
```
🧪 Testando IA do Job Matcher...

1. Carregando modelo de IA...
✅ Modelo carregado!

2. Executando análise semântica...

📊 RESULTADOS:
   Score Final: 78.5%
   Similaridade Geral: 72%
   Cobertura de Skills: 85%
   Confiança: high

✅ Skills Matcheadas: 6/7
   • react ≈ react.js (96.0%)
   • node.js ≈ node (98.0%)
   ...

✅ Todos os testes passaram!
```

---

## 📚 Próximos Passos

- Leia `AI_EXPLANATION.md` para entender como funciona
- Veja `EXAMPLES.md` para casos de uso reais
- Confira `UPGRADE_GUIDE.md` para ver o que mudou

---

## 💡 Dica Pro

Para desenvolvimento, mantenha 2 terminais abertos:
- **Terminal 1**: Backend (`cd api && python app.py`)
- **Terminal 2**: Frontend (`cd web && npm run dev`)

Assim você vê os logs de ambos em tempo real!
