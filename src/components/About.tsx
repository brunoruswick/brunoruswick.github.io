import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'
import AnimatedLetter from './AnimatedLetter'

const PARAGRAPH =
  'Moro em Vila Velha, no Espírito Santo, e curso Análise e Desenvolvimento de Sistemas. Gosto de back-end: modelagem de dados, prevenção de SQL injection, testes automatizados e software que funciona até offline. Meus projetos vão de um sistema de estoque em Python a um app Flutter com 945 testes.'

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })
  const chars = Array.from(PARAGRAPH)

  return (
    <section id="sobre" className="bg-black px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl rounded-2xl md:rounded-[2rem] bg-[#101010] px-6 py-16 text-center sm:px-10 md:py-28">
        <p className="mb-6 text-[10px] sm:text-xs text-primary">Desenvolvimento back-end</p>

        <WordsPullUpMultiStyle
          className="mx-auto max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] sm:leading-[0.9]"
          segments={[
            { text: 'Sou Bruno Ruswick,', className: 'font-normal' },
            { text: 'dev back-end em formação.', className: 'italic font-serif' },
            { text: 'Gosto de dados, testes e código que não quebra.', className: 'font-normal' },
          ]}
        />

        <p
          ref={ref}
          className="mx-auto mt-10 max-w-2xl text-xs sm:text-sm md:text-base text-[#DEDBC8]"
        >
          {chars.map((c, i) => (
            <AnimatedLetter key={i} char={c} index={i} total={chars.length} progress={scrollYProgress} />
          ))}
        </p>
      </div>
    </section>
  )
}
