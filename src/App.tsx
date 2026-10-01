import { useState } from 'react'
import logoImg from '@/imports/image-3.png'
import beachCircle from '@/imports/image.png'
import kakiwinCircle from '@/imports/image-4.png'
import mascotImg from '@/imports/image-2.png'

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
        <div className="relative h-48 overflow-hidden">
          <img src={trail.photo} alt={trail.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%,transparent 60%)' }} />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-lg"
            style={{ background: 'rgba(0,0,0,0.4)' }}
          >×</button>
          <div className="absolute bottom-4 left-5 text-white">
            <p className="text-xs uppercase tracking-widest opacity-70 mb-1">{trail.tag}</p>
            <h3 className="font-display font-bold text-2xl leading-none">{trail.name}</h3>
          </div>
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
          style={{ width: 310, height: 400, background: CREAM, border: `2px solid ${GREEN}` }}
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
        className="rounded-full overflow-hidden shadow-xl transition-transform hover:scale-105 active:scale-95"
        style={{ width: 84, height: 84, border: `3px solid ${GREEN}`, background: CREAM }}
        aria-label="Chat de asistencia"
      >
        <img src={mascotImg} alt="Asistente" className="w-full h-full object-contain" style={{ transform: 'scale(1.15)', transformOrigin: 'center 60%' }} />
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
            <p className="text-xs uppercase tracking-[0.28em] font-semibold mb-4" style={{ color: '#e9bd9d' }}>Senderos para volver a sentir</p>
            <h1 className="font-display font-bold text-white leading-[0.9] tracking-tight" style={{ fontSize: 'clamp(5rem, 13vw, 11rem)' }}>Terra<span style={{ color: TERRA }}>.</span></h1>
            <p className="font-display italic text-2xl md:text-4xl mt-5" style={{ color: CREAM }}>El camino empieza aquí.</p>
          </div>
          <div className="md:max-w-xs md:pb-3">
            <p className="text-sm md:text-base leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.78)' }}>
              Dos rutas, infinitas formas de conectar con la naturaleza. Elige tu próxima aventura.
            </p>
            <a href="#rutas" className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white transition-transform hover:-translate-y-1" style={{ background: TERRA }}>
              Explorar rutas <span aria-hidden="true">↗</span>
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
                className="group block w-full overflow-hidden rounded-2xl text-left shadow-[0_18px_50px_rgba(0,0,0,0.14)] transition-transform duration-300 hover:-translate-y-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c85a32]"
                style={{ background: CREAM }}
                aria-label={`Ver ruta ${trail.name}`}
              >
                <div className="relative h-56 sm:h-72 md:h-64 lg:h-80 overflow-hidden" style={{ background: '#171d18' }}>
                  <img src={trail.photo} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-5 left-5 rounded-full bg-[#f4efea] px-4 py-2 text-[11px] font-semibold uppercase tracking-widest" style={{ color: GREEN }}>
                    {String(index + 1).padStart(2, '0')} / {trail.tag}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-3 px-5 py-6 sm:px-7 sm:py-7">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: TERRA }}>{trail.difficulty} · {trail.distance}</p>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl leading-tight" style={{ color: GREEN }}>{trail.name}</h2>
                    <p className="text-sm mt-2" style={{ color: '#595650' }}>Descubre el recorrido y sus detalles</p>
                  </div>
                  <span className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full text-white text-xl transition-colors group-hover:bg-[#c85a32]" style={{ background: GREEN }} aria-hidden="true">↗</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" style={{ background: GREEN }}>
        <div className="max-w-4xl mx-auto px-6 md:px-20 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: '#e8a427' }}>Quiénes somos</p>
            <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}>
              Pasión por el sendero
            </h2>
            <p className="text-sm leading-loose mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Somos una agencia especializada en ecoturismo y senderismo. Diseñamos cada ruta con respeto por el entorno natural y alianzas con comunidades locales. Nuestros guías certificados exploran los paisajes más auténticos del país.
            </p>
            <div className="flex gap-8">
              {[['2', 'Rutas'], ['24', 'Guías'], ['8.400', 'Viajeros']].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display font-bold text-3xl text-white">{v}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1527301460062-0b9f5a0b96d5?w=700&h=500&fit=crop&auto=format"
            alt="Guías de Terra"
            className="w-full rounded-2xl object-cover"
            style={{ height: 340 }}
          />
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
