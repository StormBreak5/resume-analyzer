'use client'

import { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const API_URL = 'http://localhost:5000'

// Font Awesome icons as inline SVG components
const Icons = {
  Target: () => (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 512 512">
      <path d="M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/>
    </svg>
  ),
  File: () => (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 384 512">
      <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"/>
    </svg>
  ),
  Rocket: () => (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 512 512">
      <path d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2v82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9V380.8c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/>
    </svg>
  ),
  Check: () => (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 448 512">
      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
    </svg>
  ),
  Robot: () => (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 640 512">
      <path d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z"/>
    </svg>
  ),
  Lightbulb: () => (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 384 512">
      <path d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"/>
    </svg>
  ),
  ChartBar: () => (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 512 512">
      <path d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zm96 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32zm32 64H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 96H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
    </svg>
  ),
  Xmark: () => (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 384 512">
      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
    </svg>
  ),
  Clock: () => (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 512 512">
      <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
    </svg>
  ),
}

export default function Home() {
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [cvSkills, setCvSkills] = useState<string[]>([])
  const [jobDescription, setJobDescription] = useState('')
  const [matchResult, setMatchResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0])
      setMatchResult(null)
      toast.success(`Arquivo selecionado: ${e.target.files[0].name}`)
    }
  }

  const handleUploadCV = async () => {
    if (!cvFile) {
      toast.error('Selecione um arquivo primeiro')
      return
    }

    setLoading(true)
    const loadingToast = toast.loading('Processando seu CV...')

    const formData = new FormData()
    formData.append('file', cvFile)

    try {
      const response = await axios.post(`${API_URL}/upload-cv`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setCvSkills(response.data.skills)
      toast.success(`${response.data.skills_found} habilidades encontradas!`, {
        id: loadingToast,
        duration: 4000
      })
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Erro ao processar CV', {
        id: loadingToast
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyzeJob = async () => {
    if (!jobDescription.trim()) {
      toast.error('Cole a descrição da vaga primeiro')
      return
    }

    if (cvSkills.length === 0) {
      toast.error('Faça upload do CV primeiro')
      return
    }

    setLoading(true)
    const loadingToast = toast.loading('Analisando com IA...')

    try {
      const response = await axios.post(`${API_URL}/analyze-job`, {
        job_description: jobDescription
      })
      setMatchResult(response.data)
      toast.success('Análise concluída!', {
        id: loadingToast,
        duration: 3000
      })
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Erro ao analisar vaga', {
        id: loadingToast
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f97316',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 mx-auto text-emerald-400">
              <Icons.Target />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Job Matcher AI
          </h1>
          <p className="text-slate-400 text-lg">
            Análise inteligente com IA semântica
          </p>
        </div>

        {/* Upload CV */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 mb-6 hover:border-slate-600 transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              1
            </div>
            <h2 className="text-2xl font-semibold text-white">
              Upload do Currículo
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <label className="flex-1 cursor-pointer">
              <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 hover:border-emerald-500 transition-all text-center bg-slate-900/50">
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 mx-auto mb-2 text-slate-400">
                  <Icons.File />
                </div>
                <p className="text-slate-300 font-medium">
                  {cvFile ? cvFile.name : 'Clique para selecionar'}
                </p>
                <p className="text-slate-500 text-sm mt-1">PDF ou DOCX</p>
              </div>
            </label>
            
            <button
              onClick={handleUploadCV}
              disabled={loading || !cvFile}
              className="md:w-48 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-emerald-500/50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5">
                    <Icons.Clock />
                  </div>
                  Processando...
                </>
              ) : (
                <>
                  <div className="w-5 h-5">
                    <Icons.Rocket />
                  </div>
                  Processar
                </>
              )}
            </button>
          </div>
          
          {cvSkills.length > 0 && (
            <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <p className="font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                <div className="w-5 h-5">
                  <Icons.Check />
                </div>
                CV processado! {cvSkills.length} habilidades encontradas
              </p>
              <div className="flex flex-wrap gap-2">
                {cvSkills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="bg-teal-500/20 text-teal-300 px-3 py-1.5 rounded-lg text-sm border border-teal-500/30 hover:bg-teal-500/30 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Análise de Vaga */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 mb-6 hover:border-slate-600 transition-all">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">
              2
            </div>
            <h2 className="text-2xl font-semibold text-white">
              Descrição da Vaga
            </h2>
          </div>
          
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Cole aqui a descrição completa da vaga que você deseja analisar..."
            className="w-full h-48 bg-slate-900/50 border border-slate-600 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
          />
          
          <button
            onClick={handleAnalyzeJob}
            disabled={loading || cvSkills.length === 0}
            className="w-full mt-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-700 hover:to-amber-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-orange-500/50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5">
                  <Icons.Robot />
                </div>
                Analisando com IA...
              </>
            ) : (
              <>
                <div className="w-5 h-5">
                  <Icons.Target />
                </div>
                Analisar Match
              </>
            )}
          </button>
        </div>

        {/* Resultados */}
        {matchResult && (
          <div className="space-y-6 animate-fadeIn">
            {/* Score Principal */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 hover:border-slate-600 transition-all">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 text-emerald-400">
                      <Icons.Robot />
                    </div>
                    Análise com IA
                  </h2>
                  <p className="text-slate-400 mt-1">Análise semântica avançada</p>
                </div>
                <div className="text-center md:text-right">
                  <div className={`text-5xl font-bold mb-1 ${
                    matchResult.score >= 70 ? 'text-emerald-400' :
                    matchResult.score >= 40 ? 'text-amber-400' : 'text-orange-400'
                  }`}>
                    {matchResult.score}%
                  </div>
                  <div className={`text-sm font-medium px-3 py-1 rounded-full inline-block ${
                    matchResult.confidence === 'high' ? 'bg-emerald-500/20 text-emerald-400' :
                    matchResult.confidence === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    Confiança: {matchResult.confidence === 'high' ? 'Alta' : matchResult.confidence === 'medium' ? 'Média' : 'Baixa'}
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-slate-700 rounded-full h-3 mb-6 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    matchResult.score >= 70 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
                    matchResult.score >= 40 ? 'bg-gradient-to-r from-amber-500 to-orange-400' : 
                    'bg-gradient-to-r from-orange-500 to-red-400'
                  }`}
                  style={{ width: `${matchResult.score}%` }}
                />
              </div>

              {/* Métricas Detalhadas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-teal-500/10 border border-teal-500/30 p-4 rounded-xl">
                  <div className="text-sm text-teal-300 mb-1">Similaridade Geral</div>
                  <div className="text-3xl font-bold text-teal-400">
                    {matchResult.overall_similarity}%
                  </div>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-xl">
                  <div className="text-sm text-cyan-300 mb-1">Cobertura de Skills</div>
                  <div className="text-3xl font-bold text-cyan-400">
                    {matchResult.skill_coverage}%
                  </div>
                </div>
              </div>
            </div>

            {/* Recomendações */}
            {matchResult.recommendations && matchResult.recommendations.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 hover:border-slate-600 transition-all">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-7 h-7 text-amber-400">
                    <Icons.Lightbulb />
                  </div>
                  Recomendações
                </h3>
                <div className="space-y-3">
                  {matchResult.recommendations.map((rec: any, idx: number) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border-l-4 ${
                        rec.type === 'success' ? 'bg-emerald-500/10 border-emerald-500' :
                        rec.type === 'warning' ? 'bg-amber-500/10 border-amber-500' :
                        rec.type === 'study' ? 'bg-teal-500/10 border-teal-500' :
                        'bg-slate-700/50 border-slate-500'
                      }`}
                    >
                      <p className="text-slate-200">{rec.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Análise de Nível */}
            {matchResult.cv_level && matchResult.job_level && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 hover:border-slate-600 transition-all">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-7 h-7 text-cyan-400">
                    <Icons.ChartBar />
                  </div>
                  Análise de Senioridade
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-teal-500/10 border border-teal-500/30 p-5 rounded-xl">
                    <div className="text-sm text-teal-300 mb-2">Seu Perfil</div>
                    <div className="text-2xl font-bold text-teal-400 mb-1">
                      {matchResult.cv_level.level}
                    </div>
                    {matchResult.cv_level.years_experience > 0 && (
                      <div className="text-sm text-slate-400">
                        {matchResult.cv_level.years_experience} anos de experiência
                      </div>
                    )}
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/30 p-5 rounded-xl">
                    <div className="text-sm text-orange-300 mb-2">Vaga Requer</div>
                    <div className="text-2xl font-bold text-orange-400 mb-1">
                      {matchResult.job_level.level}
                    </div>
                    {matchResult.job_level.years_experience > 0 && (
                      <div className="text-sm text-slate-400">
                        {matchResult.job_level.years_experience} anos de experiência
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Skills Matcheadas com Detalhes */}
            {matchResult.skill_matches && matchResult.skill_matches.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 hover:border-slate-600 transition-all">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-7 h-7 text-emerald-400">
                    <Icons.Check />
                  </div>
                  Habilidades Compatíveis ({matchResult.skill_matches.length})
                </h3>
                <div className="space-y-2">
                  {matchResult.skill_matches.map((match: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl hover:bg-emerald-500/20 transition-all">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-emerald-300">{match.cv}</span>
                        {match.cv !== match.job && (
                          <>
                            <span className="text-slate-500">≈</span>
                            <span className="text-emerald-400">{match.job}</span>
                          </>
                        )}
                      </div>
                      <span className="text-sm font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-lg">
                        {match.match}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Habilidades Faltantes */}
            {matchResult.missing_skills && matchResult.missing_skills.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 hover:border-slate-600 transition-all">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-7 h-7 text-orange-400">
                    <Icons.Xmark />
                  </div>
                  Habilidades para Desenvolver ({matchResult.missing_skills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {matchResult.missing_skills.map((skill: string, idx: number) => (
                    <span key={idx} className="bg-orange-500/10 border border-orange-500/30 text-orange-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-500/20 transition-all">
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
