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
  circle: 'beach' | 'kakiwin' | 'volcano' | 'valley'
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
    circle: 'beach',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&auto=format',
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
    circle: 'kakiwin',
    photo: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=500&fit=crop&auto=format',
  },
]

const diffColor: Record<string, string> = {
  Fácil: '#2d5a27',
  Moderado: '#b07a20',
  Difícil: '#c85a32',
  Extremo: '#7a1a1a',
}

function CircleIcon({ type }: { type: Trail['circle'] }) {
  if (type === 'beach')
    return <img src={beachCircle} alt="Sendero Costero" className="w-full h-full object-cover" />
  if (type === 'kakiwin')
    return <img src={kakiwinCircle} alt="Ruta Kakiwin" className="w-full h-full object-cover" />
  if (type === 'volcano')
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ background: 'linear-gradient(160deg,#1a0800,#3d1500,#7a2a0a)' }}>
        <circle cx="100" cy="100" r="95" fill="none" stroke={TERRA} strokeWidth="5" />
        <polygon points="100,28 148,138 52,138" fill="#2a0d00" />
        <polygon points="100,28 118,72 82,72" fill="#6a1500" />
        <ellipse cx="100" cy="30" rx="20" ry="11" fill="#e8921a" opacity="0.9" />
        <path d="M52,138 Q76,118 100,138 Q124,118 148,138 L162,168 H38Z" fill="#1a0800" />
        <text x="100" y="183" textAnchor="middle" fill={CREAM} fontSize="10" fontFamily="Outfit,sans-serif" fontWeight="600" letterSpacing="3">VOLCÁN</text>
      </svg>
    )
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" style={{ background: 'linear-gradient(160deg,#6aad4a,#2d5a27,#c8a027)' }}>
      <circle cx="100" cy="100" r="95" fill="none" stroke={GREEN} strokeWidth="5" />
      <ellipse cx="100" cy="128" rx="78" ry="46" fill={GREEN} />
      <circle cx="58" cy="100" r="22" fill="#3d7a28" />
      <circle cx="144" cy="95" r="18" fill="#3d7a28" />
      <ellipse cx="100" cy="96" rx="28" ry="28" fill="#3d7a28" />
      <circle cx="84" cy="78" r="14" fill="#4a8f30" />
      <circle cx="116" cy="76" r="16" fill="#5aa838" />
      <circle cx="100" cy="70" r="18" fill="#6ac040" />
      <circle cx="100" cy="54" r="16" fill="#e8a427" opacity="0.9" />
      <text x="100" y="183" textAnchor="middle" fill={CREAM} fontSize="10" fontFamily="Outfit,sans-serif" fontWeight="600" letterSpacing="2">VALLE DORADO</text>
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
        style={{ width: 64, height: 64, border: `3px solid ${GREEN}`, background: CREAM }}
        aria-label="Chat de asistencia"
      >
        <img src={mascotImg} alt="Asistente" className="w-full h-full object-contain" />
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
          <img src={logoImg} alt="Tierra Aventura" className="h-11 w-11 object-cover rounded-full" style={{ border: `2px solid ${GREEN}` }} />
          <div>
            <p className="font-display font-bold text-base leading-none" style={{ color: GREEN }}>Tierra Aventura</p>
            <p className="text-xs tracking-widest uppercase mt-0.5" style={{ color: TERRA }}>Agencia de Viajes</p>
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
      <section id="inicio" className="py-24 px-6 md:px-20 text-center" style={{ background: GREEN }}>
        <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: '#e8a427' }}>Agencia de Viajes</p>
        <h1
          className="font-display font-bold text-white leading-tight mx-auto mb-5"
          style={{ fontSize: 'clamp(2.4rem,6vw,4rem)', maxWidth: 640 }}
        >
          Descubre rutas de sendero únicas
        </h1>
        <p className="text-sm max-w-sm mx-auto mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Guías expertos, paisajes auténticos y experiencias que transforman.
        </p>
        <a
          href="#rutas"
          className="inline-block px-8 py-3 rounded-full font-semibold text-white"
          style={{ background: TERRA }}
        >
          Ver Rutas
        </a>
      </section>

      {/* RUTAS */}
      <section id="rutas" className="py-20 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: TERRA }}>Expediciones</p>
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(2rem,5vw,3rem)', color: GREEN }}>
              Rutas de Sendero
            </h2>
            <p className="mt-3 text-sm max-w-md mx-auto leading-relaxed" style={{ color: '#555' }}>
              Haz clic en cada círculo para conocer los detalles de la ruta y reservar tu lugar.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-10 md:gap-14">
            {trails.map((trail) => (
              <button
                key={trail.id}
                onClick={() => setActiveTrail(trail)}
                className="flex flex-col items-center gap-4 group"
                aria-label={`Ver ruta ${trail.name}`}
              >
                <div
                  className="rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105"
                  style={{
                    width: 190,
                    height: 190,
                    boxShadow: `0 0 0 4px ${GREEN}, 0 6px 20px rgba(0,0,0,0.15)`,
                  }}
                >
                  <CircleIcon type={trail.circle} />
                </div>
                <div className="text-center">
                  <p className="font-display font-semibold text-base leading-tight" style={{ color: GREEN }}>{trail.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#888' }}>{trail.tag}</p>
                  <span
                    className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-semibold text-white"
                    style={{ background: diffColor[trail.difficulty] }}
                  >{trail.difficulty}</span>
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
              {[['120+', 'Rutas'], ['24', 'Guías'], ['8.400', 'Viajeros']].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display font-bold text-3xl text-white">{v}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1527301460062-0b9f5a0b96d5?w=700&h=500&fit=crop&auto=format"
            alt="Guías de Tierra Aventura"
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
            <img src={logoImg} alt="Tierra Aventura" className="h-9 w-9 object-cover rounded-full" style={{ border: '1.5px solid rgba(255,255,255,0.3)' }} />
            <p className="font-display font-bold text-white text-sm">Tierra Aventura</p>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>© 2026 Tierra Aventura · Todos los derechos reservados</p>
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
