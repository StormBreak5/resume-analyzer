'use client'

import { useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:5000'

export default function Home() {
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [cvSkills, setCvSkills] = useState<string[]>([])
  const [jobDescription, setJobDescription] = useState('')
  const [matchResult, setMatchResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0])
      setMatchResult(null)
    }
  }

  const handleUploadCV = async () => {
    if (!cvFile) {
      setError('Selecione um arquivo')
      return
    }

    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', cvFile)

    try {
      const response = await axios.post(`${API_URL}/upload-cv`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setCvSkills(response.data.skills)
      setError('')
      alert('CV processado com sucesso!')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao processar CV')
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyzeJob = async () => {
    if (!jobDescription.trim()) {
      setError('Cole a descrição da vaga')
      return
    }

    if (cvSkills.length === 0) {
      setError('Faça upload do CV primeiro')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await axios.post(`${API_URL}/analyze-job`, {
        job_description: jobDescription
      })
      setMatchResult(response.data)
      setError('')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao analisar vaga')
    } finally {
      setLoading(false)
    }
  }

  return (

    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Analisador de Vagas
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Descubra o match entre seu currículo e a vaga dos sonhos
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Upload CV */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            1. Upload do Currículo
          </h2>
          <div className="flex gap-4 items-center">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="flex-1 border border-gray-300 rounded px-3 py-2"
            />
            <button
              onClick={handleUploadCV}
              disabled={loading || !cvFile}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Processando...' : 'Processar CV'}
            </button>
          </div>
          
          {cvSkills.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold text-green-600 mb-2">
                ✓ CV processado! {cvSkills.length} habilidades encontradas:
              </p>
              <div className="flex flex-wrap gap-2">
                {cvSkills.map((skill, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Análise de Vaga */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            2. Descrição da Vaga
          </h2>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Cole aqui a descrição completa da vaga..."
            className="w-full h-48 border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <button
            onClick={handleAnalyzeJob}
            disabled={loading || cvSkills.length === 0}
            className="w-full bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? 'Analisando...' : 'Analisar Match'}
          </button>
        </div>

        {/* Resultados */}
        {matchResult && (
          <div className="space-y-6">
            {/* Score Principal */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Análise com IA 🤖
                  </h2>
                  <p className="text-sm text-gray-500">Análise semântica avançada</p>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold ${
                    matchResult.score >= 70 ? 'text-green-600' :
                    matchResult.score >= 40 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {matchResult.score}%
                  </div>
                  <div className="text-sm text-gray-500 capitalize">
                    Confiança: {matchResult.confidence}
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className={`h-4 rounded-full transition-all ${
                    matchResult.score >= 70 ? 'bg-green-600' :
                    matchResult.score >= 40 ? 'bg-yellow-600' : 'bg-red-600'
                  }`}
                  style={{ width: `${matchResult.score}%` }}
                />
              </div>

              {/* Métricas Detalhadas */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-blue-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Similaridade Geral</div>
                  <div className="text-xl font-bold text-blue-600">
                    {matchResult.overall_similarity}%
                  </div>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <div className="text-sm text-gray-600">Cobertura de Skills</div>
                  <div className="text-xl font-bold text-purple-600">
                    {matchResult.skill_coverage}%
                  </div>
                </div>
              </div>
            </div>

            {/* Recomendações */}
            {matchResult.recommendations && matchResult.recommendations.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  💡 Recomendações
                </h3>
                <div className="space-y-3">
                  {matchResult.recommendations.map((rec: any, idx: number) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border-l-4 ${
                        rec.type === 'success' ? 'bg-green-50 border-green-500' :
                        rec.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                        rec.type === 'study' ? 'bg-blue-50 border-blue-500' :
                        'bg-gray-50 border-gray-500'
                      }`}
                    >
                      <p className="text-gray-800">{rec.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Análise de Nível */}
            {matchResult.cv_level && matchResult.job_level && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  📊 Análise de Senioridade
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-indigo-50 p-4 rounded">
                    <div className="text-sm text-gray-600 mb-1">Seu Perfil</div>
                    <div className="text-lg font-bold text-indigo-600">
                      {matchResult.cv_level.level}
                    </div>
                    {matchResult.cv_level.years_experience > 0 && (
                      <div className="text-sm text-gray-600">
                        {matchResult.cv_level.years_experience} anos de experiência
                      </div>
                    )}
                  </div>
                  <div className="bg-pink-50 p-4 rounded">
                    <div className="text-sm text-gray-600 mb-1">Vaga Requer</div>
                    <div className="text-lg font-bold text-pink-600">
                      {matchResult.job_level.level}
                    </div>
                    {matchResult.job_level.years_experience > 0 && (
                      <div className="text-sm text-gray-600">
                        {matchResult.job_level.years_experience} anos de experiência
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Skills Matcheadas com Detalhes */}
            {matchResult.skill_matches && matchResult.skill_matches.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  ✓ Habilidades Compatíveis ({matchResult.skill_matches.length})
                </h3>
                <div className="space-y-2">
                  {matchResult.skill_matches.map((match: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between bg-green-50 p-3 rounded">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-green-800">{match.cv}</span>
                        {match.cv !== match.job && (
                          <>
                            <span className="text-gray-400">≈</span>
                            <span className="text-green-600">{match.job}</span>
                          </>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-green-600">
                        {match.match}% match
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Habilidades Faltantes */}
            {matchResult.missing_skills && matchResult.missing_skills.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  ✗ Habilidades para Desenvolver ({matchResult.missing_skills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {matchResult.missing_skills.map((skill: string, idx: number) => (
                    <span key={idx} className="bg-red-100 text-red-800 px-3 py-2 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
