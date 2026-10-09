import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check, Glasses, PackageSearch, BarChart3, type LucideIcon } from 'lucide-react'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'

const PROJECTS: { title: string; num: string; icon: LucideIcon; href: string; items: string[] }[] = [
  {
    title: 'Smart Glasses Companion.',
    num: '01',
    icon: Glasses,
    href: 'https://github.com/brunoruswick/smart-glasses-companion',
    items: [
      'App Flutter (Dart) para óculos inteligentes via BLE.',
      'Serviço em Cloudflare Workers, com allowlist de escrita byte a byte.',
      'Transferência de mídia por Wi-Fi Direct, assistente de voz e tradução ao vivo.',
      '945 testes, todos rodando offline.',
    ],
  },
  {
    title: 'Sistema de Estoque.',
    num: '02',
    icon: PackageSearch,
    href: 'https://github.com/brunoruswick/sistema-estoque',
    items: [
      'Gestão de estoque via linha de comando, em Python.',
      'Persistência em SQLite.',
      'Orientação a objetos e prevenção de SQL injection.',
    ],
  },
  {
    title: 'Análise de Vendas.',
    num: '03',
    icon: BarChart3,
    href: 'https://github.com/brunoruswick/analise-vendas',
    items: [
      'Script Python para processar dados de vendas.',
      'Extração de métricas com Pandas.',
      'Geração de gráficos com Matplotlib.',
    ],
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

function Card({ index, className = '', children }: { index: number; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: EASE }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function Features() {
  return (
    <section id="projetos" className="relative min-h-screen bg-black px-4 py-16 md:px-6 md:py-24">
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 md:mb-16 text-center">
          <WordsPullUpMultiStyle
            className="max-w-3xl text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal"
            segments={[
              { text: 'Projetos reais, código testado.', className: 'text-[#E1E0CC]' },
              { text: 'Do banco de dados ao dispositivo.', className: 'text-gray-500' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:grid-cols-4 lg:h-[480px]">
          <Card index={0} className="min-h-[320px]">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 text-xl sm:text-2xl" style={{ color: '#E1E0CC' }}>
              Do código ao produto.
            </p>
          </Card>

          {PROJECTS.map((p, i) => (
            <Card key={p.num} index={i + 1} className="bg-[#212121] p-5 sm:p-6 flex flex-col">
              <span className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-[#2e2e2a] to-[#141414]">
                <p.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 text-lg sm:text-xl" style={{ color: '#E1E0CC' }}>
                {p.title} <span className="text-gray-500 text-sm">({p.num})</span>
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-xs sm:text-sm text-gray-400">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {it}
                  </li>
                ))}
              </ul>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="mt-auto pt-6 inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all"
              >
                Ver no GitHub <ArrowRight className="h-4 w-4 -rotate-45" />
              </a>
            </Card>
          ))}
        </div>

        <footer className="mt-16 flex flex-col items-center gap-2 text-center text-xs text-gray-500">
          <a href="https://www.linkedin.com/in/bruno-ruswick-bernardo-freitas-952491275/" target="_blank" rel="noreferrer" className="hover:text-primary">LinkedIn</a>
          <a href="mailto:brunoruswick@gmail.com" className="hover:text-primary">brunoruswick@gmail.com</a>
          <span>Vila Velha, ES — Brasil</span>
        </footer>
      </div>
    </section>
  )
}
