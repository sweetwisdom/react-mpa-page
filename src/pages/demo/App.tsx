import { ArrowRight, Layers3, Sparkles, Wand2 } from 'lucide-react'
import './App.css'

const features = [
  {
    title: '模块化页面拼装',
    desc: '多块内容独立维护，支持快速增删改，适合迭代型业务。',
    icon: Layers3,
    emoji: '🧱',
  },
  {
    title: '统一视觉语言',
    desc: '通过 Tailwind 设计 token 约束间距、圆角和文字层级。',
    icon: Sparkles,
    emoji: '🎯',
  },
  {
    title: '动效与氛围背景',
    desc: '轻量动画提升页面质感，同时保证首屏渲染稳定。',
    icon: Wand2,
    emoji: '🌌',
  },
]

const steps = ['规划内容模块', '搭建页面骨架', '填充真实文案', '验证移动端体验']

const App = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070f] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="demo-glow glow-a" />
        <div className="demo-glow glow-b" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_36%),linear-gradient(to_bottom,#060912_0%,#05070f_65%,#04050a_100%)]" />
      </div>

      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 pb-12 pt-12 md:px-8">
        <header className="mb-10 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-md md:p-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
            <span>🚀</span>
            Demo Playground
          </div>
          <h1 className="mb-3 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            演示页已升级为
            <span className="bg-gradient-to-b from-white to-cyan-300 bg-clip-text text-transparent"> 内容型页面</span>
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-white/75 md:text-base">
            这一页用于快速验证布局、文案、组件与交互。你可以把它当作新页面开发的模板起点，
            先把业务内容塞进来，再逐步替换为真实数据。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
              href="./home"
            >
              返回 Home
              <ArrowRight className="h-4 w-4" />
            </a>
            <button className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/15">
              ✨ 预览组件状态
            </button>
          </div>
        </header>

        <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map(item => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                <item.icon className="h-5 w-5" />
              </div>
              <h2 className="mb-2 text-base font-semibold">
                {item.emoji} {item.title}
              </h2>
              <p className="text-sm leading-6 text-white/75">{item.desc}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-white/15 bg-black/25 p-5 backdrop-blur md:p-6">
          <h3 className="mb-4 text-lg font-semibold">🛠️ 页面迭代步骤</h3>
          <ol className="grid gap-3 text-sm md:grid-cols-2">
            {steps.map((step, idx) => (
              <li key={step} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/85">
                <span className="mr-2 text-cyan-300">0{idx + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  )
}

export default App
