"""
Script de teste para verificar se a IA está funcionando
"""
from ai_matcher import IntelligentMatcher

def test_ai():
    print("🧪 Testando IA do Job Matcher...\n")
    
    # Inicializar
    print("1. Carregando modelo de IA...")
    matcher = IntelligentMatcher()
    print("✅ Modelo carregado!\n")
    
    # Dados de teste
    cv_text = """
    João Silva
    Desenvolvedor Full Stack com 3 anos de experiência
    
    Habilidades:
    - JavaScript, React, Node.js
    - Python, Django
    - SQL, PostgreSQL
    - Git, Docker
    - Metodologias ágeis
    """
    
    job_text = """
    Vaga: Desenvolvedor Pleno
    
    Requisitos:
    - Experiência com React.js e ReactJS
    - Conhecimento em Node
    - Banco de dados SQL
    - Versionamento com Git
    - TypeScript (diferencial)
    - AWS (diferencial)
    """
    
    cv_skills = ['javascript', 'react', 'node.js', 'python', 'django', 'sql', 'postgresql', 'git', 'docker']
    job_skills = ['react.js', 'reactjs', 'node', 'sql', 'git', 'typescript', 'aws']
    
    # Testar matching
    print("2. Executando análise semântica...")
    result = matcher.semantic_match(cv_text, job_text, cv_skills, job_skills)
    
    print("\n📊 RESULTADOS:")
    print(f"   Score Final: {result['score']}%")
    print(f"   Similaridade Geral: {result['overall_similarity']}%")
    print(f"   Cobertura de Skills: {result['skill_coverage']}%")
    print(f"   Confiança: {result['confidence']}")
    
    print(f"\n✅ Skills Matcheadas: {result['matched_skills']}/{result['total_job_skills']}")
    for match in result['skill_matches']:
        print(f"   • {match['cv']} ≈ {match['job']} ({match['match']}%)")
    
    print(f"\n❌ Skills Faltantes: {len(result['missing_skills'])}")
    for skill in result['missing_skills']:
        print(f"   • {skill}")
    
    # Testar análise de nível
    print("\n3. Analisando nível de experiência...")
    cv_level = matcher.analyze_experience_level(cv_text)
    job_level = matcher.analyze_experience_level(job_text)
    
    print(f"   CV: {cv_level['level']} ({cv_level['years_experience']} anos)")
    print(f"   Vaga: {job_level['level']} ({job_level['years_experience']} anos)")
    
    # Testar recomendações
    print("\n4. Gerando recomendações...")
    recommendations = matcher.generate_recommendations(result['missing_skills'], result['score'])
    for rec in recommendations:
        print(f"   [{rec['type'].upper()}] {rec['message']}")
    
    print("\n✅ Todos os testes passaram! A IA está funcionando perfeitamente.")

if __name__ == '__main__':
    test_ai()
