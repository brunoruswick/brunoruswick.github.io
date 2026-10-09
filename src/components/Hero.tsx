import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import WordsPullUp from './WordsPullUp'

const NAV = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Stack', href: '#projetos' },
  { label: 'GitHub', href: 'https://github.com/brunoruswick' },
  { label: 'Contato', href: 'mailto:brunoruswick@gmail.com' },
]

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  return (
    <section className="h-screen p-4 md:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8">
          <ul className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[10px] sm:text-xs md:text-sm transition-colors"
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)')}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-12 items-end gap-4 px-4 pb-4 md:px-8 md:pb-6">
          <div className="col-span-12 lg:col-span-8">
            <h1
              className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em]"
              style={{ color: '#E1E0CC' }}
            >
              <WordsPullUp text="Bruno" showAsterisk />
            </h1>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col gap-5 pb-4 lg:pb-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              className="text-primary/70 text-xs sm:text-sm md:text-base"
              style={{ lineHeight: 1.2 }}
            >
              Sou estudante de Análise e Desenvolvimento de Sistemas, com foco em back-end. Transformo
              problemas em software testado e simples de manter — de CLIs com SQLite a apps Flutter e
              serviços na edge.
            </motion.p>

            <motion.a
              href="mailto:brunoruswick@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease }}
              className="group inline-flex w-fit items-center gap-2 hover:gap-3 transition-all bg-primary rounded-full pl-5 pr-1 py-1 text-black font-medium text-sm sm:text-base"
            >
              Fale comigo
              <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-110">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#E1E0CC' }} />
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
