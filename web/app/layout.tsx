import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Job Matcher AI - Análise Inteligente de Vagas',
  description: 'Análise semântica com IA para descobrir o match perfeito entre seu CV e vagas de emprego',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  )
}
