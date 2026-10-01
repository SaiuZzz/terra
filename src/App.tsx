import { useState } from 'react'
import logoImg from '@/imports/image-3.png'
import beachCircle from '@/imports/image.png'
import kakiwinCircle from '@/imports/image-4.png'
import mascotImg from '@/imports/assistant.png'

const GREEN = '#2d5a27'
const TERRA = '#c85a32'
const CREAM = '#f4efea'
const BLACK = '#000000'

interface Trail {
  id: number
  name: string
  tag: string
  difficulty: string
  distance: string
  duration: string
  description: string
  highlights: string[]
  photo: string
}

const trails: Trail[] = [
  {
    id: 1,
    name: 'Ruta Costera',
    tag: 'Ruta del Mar',
    difficulty: 'Moderado',
    distance: '12 km · 4 h',
    duration: '180 m elevación',
    description:
      'Costa virgen entre palmeras y acantilados. Playas privadas, snorkel en arrecife y atardeceres que no olvidarás.',
    highlights: ['Playa privada', 'Snorkel', 'Mirador del faro', 'Puesta de sol'],
    photo: beachCircle,
  },
  {
    id: 2,
    name: 'Ruta Kakiwin',
    tag: 'Bosque Profundo',
    difficulty: 'Difícil',
    distance: '18 km · 7 h',
    duration: '820 m elevación',
    description:
      'Antiguos caminos de exploradores a través de bosque tropical. Cascadas ocultas, aves exóticas y flora endémica.',
    highlights: ['Cascada escondida', 'Avistamiento de aves', 'Flora endémica', 'Campamento'],
    photo: kakiwinCircle,
  },
]

const diffColor: Record<string, string> = {
  Fácil: '#2d5a27',
  Moderado: '#b07a20',
  Difícil: '#c85a32',
  Extremo: '#7a1a1a',
}

function SocialIcon({ name }: { name: 'Instagram' | 'Facebook' | 'TikTok' | 'YouTube' }) {
  if (name === 'Instagram') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.7" cy="6.4" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
  if (name === 'Facebook') return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
      <path d="M14.3 21v-8h2.5l.4-3.1h-2.9V8c0-.9.3-1.5 1.5-1.5h1.6V3.7a21 21 0 0 0-2.3-.1c-2.4 0-4.1 1.5-4.1 4.2v2.1H8.5V13H11v8h3.3Z" />
    </svg>
  )
  if (name === 'TikTok') return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
      <path d="M16.2 2c.2 2.2 1.4 3.5 3.8 3.7v3.1a8.4 8.4 0 0 1-3.8-1.1v7.2a6 6 0 1 1-5.4-6v3.2a2.8 2.8 0 1 0 2.2 2.8V2h3.2Z" />
    </svg>
  )
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="m10 8.7 5.4 3.3-5.4 3.3V8.7Z" fill="currentColor" />
    </svg>
  )
}

function TrailModal({ trail, onClose }: { trail: Trail; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: CREAM, maxHeight: '88vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex flex-col items-center pt-7 px-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-lg"
            style={{ background: GREEN }}
            aria-label="Cerrar detalles de la ruta"
          >×</button>
          <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-[#2d5a27]" style={{ background: CREAM }}>
            <img src={trail.photo} alt={trail.name} className={`w-full h-full object-contain ${trail.id === 2 ? 'scale-[1.2]' : ''}`} />
          </div>
          <p className="text-xs uppercase tracking-widest mt-5 mb-1" style={{ color: TERRA }}>{trail.tag}</p>
          <h3 className="font-display font-bold text-2xl leading-none" style={{ color: GREEN }}>{trail.name}</h3>
        </div>

        <div className="p-6">
          <div className="flex gap-3 mb-5">
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: diffColor[trail.difficulty] }}>{trail.difficulty}</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: '#e0d8cf', color: BLACK }}>{trail.distance}</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: '#e0d8cf', color: BLACK }}>{trail.duration}</span>
          </div>

          <p className="text-sm leading-relaxed mb-5" style={{ color: '#2a2a2a' }}>{trail.description}</p>

          <div className="grid grid-cols-2 gap-2 mb-6">
            {trail.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-sm">
                <span style={{ color: TERRA }}>✦</span> {h}
              </div>
            ))}
          </div>

          <button
            className="w-full py-3 rounded-xl text-white font-semibold tracking-wide transition-opacity hover:opacity-90"
            style={{ background: GREEN }}
          >
            Reservar esta ruta
          </button>
        </div>
      </div>
    </div>
  )
}

function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! ¿En qué aventura puedo ayudarte hoy? 🌿' },
  ])
  const [input, setInput] = useState('')

  const replies = [
    'Tenemos rutas para todos los niveles. ¿Cuál te llama la atención?',
    'Para reservar, haz clic en el círculo de la ruta que te interese.',
    'Todos nuestros recorridos incluyen guía certificado.',
    '¿Vienes en grupo o es una experiencia privada?',
    'Las rutas están disponibles todo el año. ¡Escríbenos y organizamos tu fecha!',
  ]

  function send() {
    if (!input.trim()) return
    setMessages((m) => [
      ...m,
      { from: 'user', text: input },
      { from: 'bot', text: replies[Math.floor(Math.random() * replies.length)] },
    ])
    setInput('')
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div
          className="rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ width: 310, height: 400, maxHeight: 'calc(100dvh - 190px)', background: CREAM }}
        >
          <div className="flex items-center gap-3 px-4 py-3" style={{ background: GREEN }}>
            <img src={mascotImg} alt="Asistente" className="w-9 h-9 object-contain" />
            <p className="text-white font-semibold text-sm">Asistente de viajes</p>
            <button onClick={() => setOpen(false)} className="ml-auto text-white/70 hover:text-white text-xl leading-none">×</button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className="max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed"
                style={{
                  alignSelf: m.from === 'bot' ? 'flex-start' : 'flex-end',
                  background: m.from === 'bot' ? '#e4ddd5' : GREEN,
                  color: m.from === 'bot' ? BLACK : 'white',
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-3 flex gap-2" style={{ borderTop: '1px solid #ddd4c8' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Escribe aquí..."
              className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
              style={{ background: '#e4ddd5', color: BLACK }}
            />
            <button
              onClick={send}
              className="px-3 py-2 rounded-lg text-white text-sm font-bold"
              style={{ background: TERRA }}
            >→</button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="block w-24 h-36 p-0 bg-transparent border-0 transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c85a32]"
        aria-label="Chat de asistencia"
      >
        <img src={mascotImg} alt="" className="w-full h-full object-contain" />
      </button>
    </div>
  )
}

export default function App() {
  const [activeTrail, setActiveTrail] = useState<Trail | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{ background: CREAM, minHeight: '100vh' }}>

      {/* NAV */}
      <nav
        className="sticky top-0 z-30 flex items-center justify-between px-6 py-3"
        style={{ background: 'rgba(244,239,234,0.93)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #ddd4c8' }}
      >
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Terra" className="h-12 w-12 shrink-0 rounded-full object-contain p-1.5" style={{ border: `2px solid ${GREEN}`, background: CREAM }} />
          <div>
            <p className="font-display font-bold text-base leading-none" style={{ color: GREEN }}>Terra</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Inicio', 'Rutas', 'Nosotros', 'Contacto'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium hover:opacity-60 transition-opacity" style={{ color: BLACK }}>
              {l}
            </a>
          ))}
          <a href="#contacto" className="px-5 py-2 rounded-full text-sm font-semibold text-white" style={{ background: GREEN }}>
            Reservar
          </a>
        </div>

        <button className="md:hidden text-2xl" style={{ color: GREEN }} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </nav>

      {menuOpen && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderBottom: '1px solid #ddd4c8' }}>
          {['Inicio', 'Rutas', 'Nosotros', 'Contacto'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium" style={{ color: BLACK }} onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="inicio" className="px-6 md:px-12 lg:px-20 pt-16 md:pt-20 pb-28 md:pb-36" style={{ background: GREEN }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="max-w-md text-sm tracking-wide font-semibold mb-4" style={{ color: '#e9bd9d' }}>Regálate un momento de paz. Descubre lo que nuestro sendero tiene preparado para ti.</p>
            <h1 className="font-display font-bold text-white leading-[0.9] tracking-tight" style={{ fontSize: 'clamp(5rem, 13vw, 11rem)' }}>Terra<span style={{ color: TERRA }}>.</span></h1>
            <p className="font-display italic text-2xl md:text-4xl mt-5" style={{ color: CREAM }}>El camino empieza aquí.</p>
          </div>
          <div className="md:max-w-xs md:pb-3">
            <p className="text-sm md:text-base leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.78)' }}>
              Dos rutas, infinitas formas de conectar con la naturaleza. Elige tu próxima aventura.
            </p>
            <a href="#rutas" className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm text-center font-semibold text-white transition-transform hover:-translate-y-1" style={{ background: TERRA }}>
              ¡VAMOS A UNA NIKOAVENTURA!
            </a>
          </div>
        </div>
      </section>

      {/* RUTAS */}
      <section id="rutas" className="relative z-10 -mt-16 md:-mt-20 px-6 md:px-12 lg:px-20 pb-20 md:pb-28 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6 text-white">
            <span className="text-xs font-semibold uppercase tracking-[0.24em]">Elige tu ruta</span>
            <span className="h-px flex-1 bg-white/40" />
            <span className="text-xs tracking-widest">01 — 02</span>
          </div>
          <div className="grid md:grid-cols-2 gap-5 md:gap-7">
            {trails.map((trail, index) => (
              <button
                key={trail.id}
                onClick={() => setActiveTrail(trail)}
                className="group flex w-full flex-col items-center overflow-hidden rounded-2xl text-center shadow-[0_18px_50px_rgba(0,0,0,0.14)] transition-transform duration-300 hover:-translate-y-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c85a32]"
                style={{ background: CREAM }}
                aria-label={`Ver ruta ${trail.name}`}
              >
                <div className="flex w-full items-center justify-between gap-3 px-6 pt-6 text-[11px] font-semibold uppercase tracking-widest" style={{ color: GREEN }}>
                  <span>{String(index + 1).padStart(2, '0')} / {trail.tag}</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-[#2d5a27]/25" />
                </div>
                <div className="mt-7 mb-6 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden ring-4 ring-[#2d5a27] shadow-[0_12px_28px_rgba(0,0,0,0.18)]" style={{ background: CREAM }}>
                  <img src={trail.photo} alt="" className={`w-full h-full object-contain transition-transform duration-500 ${trail.id === 2 ? 'scale-[1.2] group-hover:scale-[1.25]' : 'group-hover:scale-105'}`} />
                </div>
                <p className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: TERRA }}>{trail.difficulty} · {trail.distance}</p>
                <h2 className="font-display font-bold text-2xl sm:text-3xl leading-tight" style={{ color: GREEN }}>{trail.name}</h2>
                <span className="inline-flex items-center gap-2 mt-4 mb-7 text-sm font-semibold" style={{ color: GREEN }}>Conoce la ruta <span aria-hidden="true">↗</span></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" style={{ background: GREEN }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-24 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-5" style={{ color: '#e9bd9d' }}>Quiénes somos</p>
            <h2 className="font-display font-bold text-white leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)' }}>
              Cada ruta tiene <em className="font-normal" style={{ color: '#e9bd9d' }}>su historia.</em>
            </h2>
            <p className="text-base leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.8)' }}>
              En Terra nos mueve descubrir los caminos que conectan con la naturaleza. Desde la brisa de la Ruta Costera hasta los senderos de Kakiwin, creamos recorridos para caminar sin prisa, explorar con respeto y llevarte historias que permanecen.
            </p>
            <div className="mt-9 flex items-center gap-4">
              <span className="h-px w-12" style={{ background: TERRA }} />
              <span className="text-sm font-medium" style={{ color: CREAM }}>La aventura se vive paso a paso.</span>
            </div>
          </div>
          <div className="rounded-3xl p-6 sm:p-8 shadow-[0_22px_50px_rgba(0,0,0,0.14)]" style={{ background: CREAM }}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] mb-3" style={{ color: TERRA }}>Más allá del sendero</p>
            <h3 className="font-display font-bold text-2xl sm:text-3xl mb-3" style={{ color: GREEN }}>Terra en redes</h3>
            <p className="text-sm leading-relaxed mb-7" style={{ color: '#595650' }}>Un espacio para compartir paisajes, caminos y momentos de cada aventura.</p>
            <div className="grid grid-cols-2 gap-3">
              {(['Instagram', 'Facebook', 'TikTok', 'YouTube'] as const).map((name) => (
                <div key={name} className="flex flex-col items-center justify-center gap-3 rounded-2xl py-7 px-3" style={{ background: '#eae3da', color: GREEN }}>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full text-white" style={{ background: name === 'Instagram' || name === 'YouTube' ? TERRA : GREEN }}>
                    <SocialIcon name={name} />
                  </span>
                  <span className="text-sm font-semibold">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-16 px-6 md:px-20">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: TERRA }}>Contacto</p>
          <h2 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: GREEN }}>
            ¿Listo para explorar?
          </h2>
          <p className="text-sm mb-8" style={{ color: '#666' }}>Cuéntanos qué buscas y te contactamos en menos de 24 horas.</p>
          <form className="flex flex-col gap-3 text-left" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-3">
              <input type="text" placeholder="Tu nombre" className="rounded-xl px-4 py-3 text-sm outline-none" style={{ background: '#e8e2da', color: BLACK, border: '1px solid #ccc4bb' }} />
              <input type="email" placeholder="Correo electrónico" className="rounded-xl px-4 py-3 text-sm outline-none" style={{ background: '#e8e2da', color: BLACK, border: '1px solid #ccc4bb' }} />
            </div>
            <select className="rounded-xl px-4 py-3 text-sm outline-none appearance-none" style={{ background: '#e8e2da', color: BLACK, border: '1px solid #ccc4bb' }}>
              <option value="">Selecciona una ruta</option>
              {trails.map((t) => <option key={t.id}>{t.name}</option>)}
              <option>Ruta personalizada</option>
            </select>
            <textarea rows={3} placeholder="Mensaje o detalles de tu grupo..." className="rounded-xl px-4 py-3 text-sm outline-none resize-none" style={{ background: '#e8e2da', color: BLACK, border: '1px solid #ccc4bb' }} />
            <button type="submit" className="py-3 rounded-xl text-white font-semibold tracking-wide hover:opacity-90 transition-opacity" style={{ background: GREEN }}>
              Enviar consulta
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 md:px-20" style={{ background: BLACK }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Terra" className="h-11 w-11 shrink-0 rounded-full object-contain p-1" style={{ border: '1.5px solid rgba(255,255,255,0.3)', background: CREAM }} />
            <p className="font-display font-bold text-white text-sm">Terra</p>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>© 2026 Terra · Todos los derechos reservados</p>
          <div className="flex gap-5">
            {['Instagram', 'Facebook', 'WhatsApp'].map((s) => (
              <a key={s} href="#" className="text-xs hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>{s}</a>
            ))}
          </div>
        </div>
      </footer>

      {activeTrail && <TrailModal trail={activeTrail} onClose={() => setActiveTrail(null)} />}
      <ChatWidget />
    </div>
  )
}
