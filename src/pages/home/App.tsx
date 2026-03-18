import { useEffect, useRef } from 'react'
import { Code2, Command, FileCode2, Rocket, Sparkles, Zap } from 'lucide-react'
import './App.css'

const App = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const hlsInstanceRef = useRef<any>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const source = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8'
    const scriptId = 'hls-cdn-script'

    const setupPlayer = () => {
      const Hls = (window as any).Hls
      if (Hls?.isSupported?.()) {
        const hls = new Hls()
        hls.loadSource(source)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {})
        })
        hlsInstanceRef.current = hls
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = source
        video.play().catch(() => {})
      }
    }

    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null
    if (existingScript) {
      if ((window as any).Hls) {
        setupPlayer()
      } else {
        existingScript.addEventListener('load', setupPlayer, { once: true })
      }
    } else {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest'
      script.async = true
      script.onload = setupPlayer
      document.body.appendChild(script)
    }

    return () => {
      if (hlsInstanceRef.current) {
        hlsInstanceRef.current.destroy()
        hlsInstanceRef.current = null
      }
      video.removeAttribute('src')
      video.load()
    }
  }, [])

  const highlights = [
    {
      icon: FileCode2,
      emoji: '🧩',
      title: '动态多页面入口',
      desc: '自动扫描 src/pages/**/index.tsx，新增页面无需手改入口配置。',
    },
    {
      icon: Code2,
      emoji: '🛡️',
      title: 'TypeScript 严格模式',
      desc: '默认更高类型安全，减少线上回归与隐性错误。',
    },
    {
      icon: Sparkles,
      emoji: '🎨',
      title: 'Tailwind + PostCSS',
      desc: '已完成 Tailwind 3.4.19 接入，可快速构建业务页面。',
    },
  ]

  const commands = ['pnpm install', 'pnpm dev', 'pnpm build', 'pnpm preview']

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="bg-grid" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(1,1,1,0.35),rgba(1,1,1,0.78))]" />
      </div>

      <nav className="fixed left-0 right-0 top-0 z-20 flex items-center justify-between border-b border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl md:px-8">
        <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Rocket className="h-4 w-4 text-fuchsia-300" />
          react-mpa-page
        </div>
        <div className="hidden items-center gap-6 text-xs text-white/70 md:flex">
          <a className="transition hover:text-white" href="#intro">
            📘 项目介绍
          </a>
          <a className="transition hover:text-white" href="#highlights">
            ✨ 核心能力
          </a>
          <a className="transition hover:text-white" href="#quick-start">
            🚀 快速开始
          </a>
        </div>
        <a
          className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black transition hover:bg-white/90"
          href="./demo"
        >
          <Zap className="h-3.5 w-3.5" />
          查看 Demo 🎬
        </a>
      </nav>

      <main
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-5 pb-10 pt-28 text-center md:px-8"
        id="intro"
      >
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-fuchsia-300 to-violet-700 text-[11px]">
            ⚡
          </span>
          基于 Rsbuild 的 React 多页面工程模板 💫
        </span>
        <h1 className="mb-4 text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.03em] md:text-[4.3rem]">
          快速搭建现代化
          <br />
          <span className="bg-gradient-to-b from-white to-fuchsia-300 bg-clip-text text-transparent">
            React MPA 项目
          </span>
        </h1>
        <p className="mb-8 max-w-3xl text-sm leading-7 text-white/75 md:text-base">
          这个项目使用 TypeScript + pnpm + Rsbuild，支持动态页面入口、路径别名和
          Tailwind，适合营销页、后台系统与多业务子站并行开发。
        </p>

        <section
          className="mb-6 grid w-full max-w-5xl grid-cols-1 gap-3 md:grid-cols-3"
          id="highlights"
        >
          {highlights.map(item => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/15 bg-white/10 p-4 text-left backdrop-blur-md"
            >
              <h3 className="mb-2 inline-flex items-center gap-2 text-sm font-semibold">
                <item.icon className="h-4 w-4 text-fuchsia-300" />
                <span>{item.emoji}</span>
                {item.title}
              </h3>
              <p className="text-xs leading-6 text-white/80">{item.desc}</p>
            </article>
          ))}
        </section>

        <section id="quick-start">
          <h2 className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-white/90">
            <Command className="h-4 w-4 text-fuchsia-300" />
            常用命令 🧪
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {commands.map(cmd => (
              <code
                className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs text-white/95"
                key={cmd}
              >
                <span></span>
                {cmd}
              </code>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
