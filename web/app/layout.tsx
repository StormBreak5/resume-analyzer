import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Analisador de Vagas',
  description: 'Analise o match entre seu CV e vagas de emprego',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
