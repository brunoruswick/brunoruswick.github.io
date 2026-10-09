import { useEffect, useRef } from 'react'

/**
 * Campo de estrelas animado (canvas 2D): cintilam e deslizam devagar, tipo
 * "voando pelo espaço". Usado como fundo dos cards de projeto, para dar a
 * mesma sensação de movimento que o vídeo do card "Do código ao produto",
 * sem precisar de outro arquivo de vídeo.
 *
 * Respeita prefers-reduced-motion (desenha um frame só, sem animar) e pausa
 * o loop quando a aba está em segundo plano.
 */
export default function SpaceCanvas({ density = 70, className = '' }: { density?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    type Star = { x: number; y: number; r: number; baseAlpha: number; twinkleSpeed: number; phase: number; vx: number; vy: number }
    let width = 0
    let height = 0
    let stars: Star[] = []
    let frameId = 0

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.max(20, Math.min(density, Math.round((width * height) / 3500)))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.25,
        baseAlpha: Math.random() * 0.55 + 0.3,
        twinkleSpeed: Math.random() * 0.8 + 0.2,
        phase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.01,
        vy: Math.random() * 0.012 + 0.004, // leve deriva para baixo
      }))
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    function draw(animar: boolean, dt: number) {
      ctx!.clearRect(0, 0, width, height)
      for (const s of stars) {
        if (animar) {
          s.phase += s.twinkleSpeed * dt * 0.002
          s.x += s.vx * dt
          s.y += s.vy * dt
          if (s.x < 0) s.x += width
          if (s.x > width) s.x -= width
          if (s.y < 0) s.y += height
          if (s.y > height) s.y -= height
        }
        const alpha = s.baseAlpha * (0.5 + 0.5 * Math.sin(s.phase))
        ctx!.beginPath()
        ctx!.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    if (prefersReducedMotion) {
      draw(false, 0)
      return () => ro.disconnect()
    }

    let last = performance.now()
    function tick(now: number) {
      const dt = Math.min(now - last, 50)
      last = now
      if (!document.hidden) draw(true, dt)
      frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frameId)
      ro.disconnect()
    }
  }, [density])

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} />
}
