import { useState } from 'react'
import logoImg from '@/imports/WhatsApp_Image_2026-09-21_at_10.38.10_PM.jpeg'
import beachCircle from '@/imports/image.png'
import kakiwinCircle from '@/imports/image-1.png'
import mascotImg from '@/imports/image-2.png'

interface Trail {
  id: number
  name: string
  subtitle: string
  difficulty: string
  distance: string
  duration: string
  elevation: string
  description: string
  highlights: string[]
  img: string | null
  customCircle?: string
  color: string
  unsplash: string
}

const trails: Trail[] = [
  {
    id: 1,
    name: 'Sendero Costero',
    subtitle: 'Ruta del Mar',
    difficulty: 'Moderado',
    distance: '12 km',
    duration: '4 horas',
    elevation: '180 m',
    description:
      'Recorre la costa virgen entre palmeras y olas suaves. Esta ruta te lleva por playas de arena blanca con vistas espectaculares al atardecer, pasando por cuevas marinas y acantilados de roca volcánica.',
    highlights: ['Playa privada', 'Snorkel en arrecife', 'Mirador del faro', 'Puesta de sol'],
    img: null,
    customCircle: 'beach',
    color: '#2A5C1A',
    unsplash: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&auto=format',
  },
  {
    id: 2,
    name: 'Ruta Kakiwin',
    subtitle: 'Bosque Profundo',
    difficulty: 'Difícil',
    distance: '18 km',
    duration: '7 horas',
    elevation: '820 m',
    description:
      'Adéntrate en el corazón del bosque tropical donde la biodiversidad te sorprenderá en cada paso. La ruta sigue antiguos caminos de exploradores, cruzando ríos cristalinos y divisando aves exóticas.',
    highlights: ['Cascada escondida', 'Avistamiento de aves', 'Antiguo campamento', 'Flora endémica'],
    img: null,
    customCircle: 'kakiwin',
    color: '#3D7A28',
    unsplash: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=500&fit=crop&auto=format',
  },
  {
    id: 3,
    name: 'Cima del Volcán',
    subtitle: 'Alta Montaña',
    difficulty: 'Extremo',
    distance: '22 km',
    duration: '10 horas',
    elevation: '2.400 m',
    description:
      'La ruta más desafiante de nuestra agencia. Ascenderás al cráter del volcán activo con vistas de 360° que van desde el océano hasta los valles verdes. Solo para excursionistas experimentados.',
    highlights: ['Cráter volcánico', 'Vista 360°', 'Amanecer en cima', 'Guía especializado'],
    img: null,
    customCircle: 'volcano',
    color: '#B85C2A',
    unsplash: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=500&fit=crop&auto=format',
  },
  {
    id: 4,
    name: 'Valle Dorado',
    subtitle: 'Familia & Naturaleza',
    difficulty: 'Fácil',
    distance: '6 km',
    duration: '2 horas',
    elevation: '90 m',
    description:
      'Perfecta para familias y principiantes. El Valle Dorado ofrece praderas abiertas con flores silvestres, pequeños riachuelos y zonas de picnic bajo la sombra de los árboles centenarios.',
    highlights: ['Apta para niños', 'Zona de picnic', 'Flores silvestres', 'Puente colgante'],
    img: null,
    customCircle: 'valley',
    color: '#E8A427',
    unsplash: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=500&fit=crop&auto=format',
  },
]

function TrailCircle({ trail, onClick }: { trail: Trail; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  const difficultyColor: Record<string, string> = {
    Fácil: '#3D7A28',
    Moderado: '#E8A427',
    Difícil: '#B85C2A',
    Extremo: '#8B1A1A',
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-4 group cursor-pointer"
      aria-label={`Ver ruta ${trail.name}`}
    >
      <div
        className="relative rounded-full overflow-hidden transition-all duration-300"
        style={{
          width: 200,
          height: 200,
          boxShadow: hovered
            ? `0 0 0 5px ${trail.color}, 0 12px 40px rgba(0,0,0,0.25)`
            : `0 0 0 3px ${trail.color}, 0 4px 16px rgba(0,0,0,0.12)`,
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
        }}
      >
        {trail.customCircle === 'beach' && (
          <img src={beachCircle} alt="Sendero costero" className="w-full h-full object-cover" />
        )}
        {trail.customCircle === 'kakiwin' && (
          <img src={kakiwinCircle} alt="Ruta Kakiwin" className="w-full h-full object-cover" />
        )}
        {trail.customCircle === 'volcano' && (
          <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #1a0a00 0%, #3D1A00 40%, #B85C2A 70%, #E8A427 100%)' }}>
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="95" fill="none" stroke="#B85C2A" strokeWidth="5" />
              <polygon points="100,30 140,130 60,130" fill="#3D1A00" />
              <polygon points="100,30 115,70 85,70" fill="#8B1A1A" />
              <ellipse cx="100" cy="32" rx="18" ry="10" fill="#E8A427" opacity="0.85" />
              <path d="M60,130 Q80,110 100,130 Q120,110 140,130 L155,160 H45Z" fill="#2A1A00" />
              <text x="100" y="178" textAnchor="middle" fill="#E8D9C0" fontSize="11" fontFamily="Outfit,sans-serif" fontWeight="600" letterSpacing="2">VOLCÁN</text>
            </svg>
          </div>
        )}
        {trail.customCircle === 'valley' && (
          <div className="w-full h-full" style={{ background: 'linear-gradient(160deg, #87CEAB 0%, #3D7A28 50%, #E8A427 100%)' }}>
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="95" fill="none" stroke="#2A5C1A" strokeWidth="5" />
              <ellipse cx="100" cy="120" rx="80" ry="50" fill="#2A5C1A" />
              <circle cx="60" cy="95" r="22" fill="#3D7A28" />
              <circle cx="145" cy="90" r="18" fill="#3D7A28" />
              <ellipse cx="100" cy="95" r="28" fill="#3D7A28" />
              <circle cx="85" cy="78" r="12" fill="#4A8F30" />
              <circle cx="115" cy="76" r="14" fill="#4A8F30" />
              <circle cx="100" cy="72" r="16" fill="#5AA838" />
              <ellipse cx="100" cy="152" rx="55" ry="12" fill="#C4A24A" opacity="0.6" />
              <circle cx="100" cy="55" r="18" fill="#E8A427" opacity="0.9" />
              <text x="100" y="178" textAnchor="middle" fill="#F4EAD8" fontSize="10" fontFamily="Outfit,sans-serif" fontWeight="600" letterSpacing="2">VALLE DORADO</text>
            </svg>
          </div>
        )}
        <div
          className="absolute inset-0 flex items-end justify-center pb-3 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }}
        >
          <span className="text-white text-sm font-semibold tracking-wide">Ver ruta →</span>
        </div>
      </div>
      <div className="text-center">
        <p
          className="font-display font-semibold text-lg leading-tight"
          style={{ color: '#1A3D10' }}
        >
          {trail.name}
        </p>
        <p className="text-sm mt-0.5" style={{ color: '#6B4A2A' }}>
          {trail.subtitle}
        </p>
        <span
          className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: difficultyColor[trail.difficulty] ?? '#2A5C1A' }}
        >
          {trail.difficulty}
        </span>
      </div>
    </button>
  )
}

function TrailModal({ trail, onClose }: { trail: Trail; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(26,16,8,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: '#F4EAD8', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 overflow-hidden">
          <img
            src={trail.unsplash}
            alt={trail.name}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(26,61,16,0.8) 0%, transparent 60%)' }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-lg transition-colors hover:bg-white/20"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          >
            ×
          </button>
          <div className="absolute bottom-4 left-6 text-white">
            <p className="text-sm opacity-80 font-medium uppercase tracking-widest">{trail.subtitle}</p>
            <h3 className="font-display text-3xl font-bold leading-tight">{trail.name}</h3>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Distancia', value: trail.distance, icon: '📍' },
              { label: 'Duración', value: trail.duration, icon: '⏱' },
              { label: 'Elevación', value: trail.elevation, icon: '⛰' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-3 text-center"
                style={{ backgroundColor: '#E8D9C0' }}
              >
                <div className="text-xl mb-1">{stat.icon}</div>
                <div className="font-bold text-sm" style={{ color: '#1A3D10' }}>{stat.value}</div>
                <div className="text-xs mt-0.5" style={{ color: '#6B4A2A' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="text-sm leading-relaxed mb-5" style={{ color: '#3A2008' }}>
            {trail.description}
          </p>

          <div className="mb-6">
            <h4 className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: '#2A5C1A' }}>
              Puntos destacados
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {trail.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2">
                  <span style={{ color: '#E8A427' }}>✦</span>
                  <span className="text-sm" style={{ color: '#3A2008' }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full py-3 rounded-xl font-semibold text-white tracking-wide transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#2A5C1A' }}
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
    { from: 'bot', text: '¡Hola! Soy Taki, tu guía explorador 🦎 ¿En qué aventura puedo ayudarte hoy?' },
  ])
  const [input, setInput] = useState('')

  const autoReplies = [
    '¡Claro! Tenemos rutas para todos los niveles de experiencia.',
    'Para reservar una ruta, puedes hacer clic en el círculo que te interese.',
    'Ofrecemos guías certificados en todas nuestras expediciones.',
    '¿Te gustaría conocer más sobre nuestros paquetes grupales?',
    'Nuestras rutas están disponibles todo el año, ¡cada estación tiene su magia!',
  ]

  function send() {
    if (!input.trim()) return
    const userMsg = { from: 'user', text: input }
    const botMsg = { from: 'bot', text: autoReplies[Math.floor(Math.random() * autoReplies.length)] }
    setMessages((m) => [...m, userMsg, botMsg])
    setInput('')
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div
          className="rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ width: 320, height: 420, backgroundColor: '#F4EAD8', border: '2px solid #2A5C1A' }}
        >
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ backgroundColor: '#2A5C1A' }}
          >
            <img src={mascotImg} alt="Taki el explorador" className="w-10 h-10 object-contain" />
            <div>
              <p className="text-white font-semibold text-sm leading-none">Taki</p>
              <p className="text-green-200 text-xs">Guía explorador</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-white opacity-70 hover:opacity-100 text-xl leading-none"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                  m.from === 'bot' ? 'self-start' : 'self-end text-white'
                }`}
                style={{
                  backgroundColor: m.from === 'bot' ? '#E8D9C0' : '#2A5C1A',
                  color: m.from === 'bot' ? '#3A2008' : 'white',
                }}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="p-3 flex gap-2" style={{ borderTop: '1px solid #E8D9C0' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Escribe tu pregunta..."
              className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
              style={{ backgroundColor: '#E8D9C0', color: '#3A2008' }}
            />
            <button
              onClick={send}
              className="px-3 py-2 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#B85C2A' }}
            >
              →
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="relative rounded-full overflow-hidden shadow-xl transition-transform hover:scale-105 active:scale-95"
        style={{
          width: 70,
          height: 70,
          border: '3px solid #2A5C1A',
          backgroundColor: '#F4EAD8',
        }}
        aria-label="Abrir chat con Taki"
      >
        <img src={mascotImg} alt="Taki" className="w-full h-full object-contain" />
        {!open && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
            style={{ backgroundColor: '#E8A427' }}
          />
        )}
      </button>
    </div>
  )
}

export default function App() {
  const [activeTrail, setActiveTrail] = useState<Trail | null>(null)
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4EAD8', fontFamily: "'Outfit', sans-serif" }}>
      {/* NAV */}
      <nav
        className="sticky top-0 z-30 flex items-center justify-between px-6 py-3"
        style={{ backgroundColor: 'rgba(244,234,216,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #E8D9C0' }}
      >
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="TA - Tierra Aventura" className="h-12 object-contain" />
          <div>
            <p className="font-display font-bold text-lg leading-none" style={{ color: '#1A3D10' }}>
              Tierra Aventura
            </p>
            <p className="text-xs tracking-widest uppercase" style={{ color: '#B85C2A' }}>
              Agencia de Viajes
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Inicio', 'Rutas', 'Servicios', 'Nosotros', 'Contacto'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium transition-colors hover:text-green-800"
              style={{ color: '#3A2008' }}
            >
              {link}
            </a>
          ))}
          <a
            href="#contacto"
            className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#2A5C1A' }}
          >
            Reservar
          </a>
        </div>
        <button className="md:hidden text-2xl" style={{ color: '#2A5C1A' }} onClick={() => setNavOpen(!navOpen)}>
          ☰
        </button>
      </nav>

      {navOpen && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ backgroundColor: '#F4EAD8', borderBottom: '1px solid #E8D9C0' }}>
          {['Inicio', 'Rutas', 'Servicios', 'Nosotros', 'Contacto'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="font-medium" style={{ color: '#3A2008' }} onClick={() => setNavOpen(false)}>
              {link}
            </a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section
        id="inicio"
        className="relative overflow-hidden"
        style={{ minHeight: '88vh' }}
      >
        <img
          src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&h=900&fit=crop&auto=format"
          alt="Caminata en montaña al atardecer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(26,61,16,0.82) 0%, rgba(58,32,8,0.6) 60%, rgba(232,164,39,0.25) 100%)' }}
        />
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-8 md:px-20" style={{ minHeight: '88vh' }}>
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ backgroundColor: 'rgba(232,164,39,0.25)', color: '#E8A427', border: '1px solid rgba(232,164,39,0.4)' }}
          >
            ✦ Explora · Descubre · Conecta
          </span>
          <h1
            className="font-display leading-none mb-6 text-white max-w-2xl"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 700 }}
          >
            Tu próxima <br />
            <em style={{ color: '#E8A427', fontStyle: 'italic' }}>gran aventura</em>
            <br /> comienza aquí
          </h1>
          <p className="text-white/80 text-lg max-w-lg mb-10 leading-relaxed">
            Rutas de sendero auténticas, guías expertos y paisajes que te quitarán el aliento.
            Tierra Aventura diseña experiencias que transforman.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#rutas"
              className="px-8 py-3.5 rounded-full font-semibold text-white tracking-wide transition-all hover:scale-105"
              style={{ backgroundColor: '#2A5C1A' }}
            >
              Explorar Rutas
            </a>
            <a
              href="#nosotros"
              className="px-8 py-3.5 rounded-full font-semibold tracking-wide transition-all hover:scale-105"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}
            >
              Conoce más
            </a>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: 'linear-gradient(to top, #F4EAD8, transparent)' }}
        />
      </section>

      {/* STATS */}
      <section className="py-10 px-6 md:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: '120+', label: 'Rutas Activas' },
            { value: '8.400', label: 'Aventureros' },
            { value: '15', label: 'Años de experiencia' },
            { value: '98%', label: 'Satisfacción' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="font-display font-bold"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#2A5C1A' }}
              >
                {stat.value}
              </p>
              <p className="text-sm mt-1" style={{ color: '#6B4A2A' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="flex items-center gap-4 px-8 md:px-20 mb-2">
        <div className="flex-1 h-px" style={{ backgroundColor: '#D4C4A8' }} />
        <span style={{ color: '#E8A427', fontSize: 18 }}>✦</span>
        <div className="flex-1 h-px" style={{ backgroundColor: '#D4C4A8' }} />
      </div>

      {/* RUTAS */}
      <section id="rutas" className="py-16 px-6 md:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: '#B85C2A' }}>
              Nuestras Expediciones
            </p>
            <h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#1A3D10' }}
            >
              Rutas de Sendero
            </h2>
            <p className="mt-4 text-base max-w-xl mx-auto leading-relaxed" style={{ color: '#6B4A2A' }}>
              Haz clic en cada medallón para descubrir los detalles de la ruta, puntos de interés y cómo reservar tu lugar.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {trails.map((trail) => (
              <TrailCircle key={trail.id} trail={trail} onClick={() => setActiveTrail(trail)} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section
        id="servicios"
        className="py-16 px-6 md:px-20"
        style={{ backgroundColor: '#1A3D10' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: '#E8A427' }}>
              Lo que ofrecemos
            </p>
            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              Servicios completos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🧭',
                title: 'Guías Certificados',
                desc: 'Expertos locales con certificación internacional. Cada ruta tiene un guía dedicado que conoce el terreno al detalle.',
              },
              {
                icon: '⛺',
                title: 'Equipo Completo',
                desc: 'Proporcionamos todo el equipo necesario: tiendas, mochilas, bastones, kit de primeros auxilios y más.',
              },
              {
                icon: '📡',
                title: 'Seguridad Total',
                desc: 'Rastreo GPS en tiempo real, comunicación satelital y seguros de viaje incluidos en todos los paquetes.',
              },
              {
                icon: '🍃',
                title: 'Turismo Sostenible',
                desc: 'Operamos bajo principios de Leave No Trace. Parte de cada reserva financia conservación local.',
              },
              {
                icon: '👨‍👩‍👧',
                title: 'Grupos & Privados',
                desc: 'Desde caminatas familiares hasta expediciones corporativas. Personalizamos cada experiencia.',
              },
              {
                icon: '🎓',
                title: 'Talleres Naturales',
                desc: 'Fotografía de naturaleza, orientación, botánica y astronomía. Aprende mientras exploras.',
              },
            ].map((s) => (
              <div
                key={s.title}
                className="rounded-2xl p-6 transition-transform hover:-translate-y-1"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="py-16 px-6 md:px-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: '#B85C2A' }}>
              Quiénes somos
            </p>
            <h2
              className="font-display font-bold leading-tight mb-5"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#1A3D10' }}
            >
              Nacimos de la pasión por el sendero
            </h2>
            <p className="text-sm leading-loose mb-4" style={{ color: '#3A2008' }}>
              Tierra Aventura nació en 2009 cuando un grupo de excursionistas apasionados decidió compartir los tesoros naturales de nuestra región con el mundo. Hoy, somos la agencia de senderismo con mayor trayectoria y reconocimiento del país.
            </p>
            <p className="text-sm leading-loose mb-6" style={{ color: '#3A2008' }}>
              Cada ruta que diseñamos lleva décadas de exploración, relaciones con comunidades locales y compromiso genuino con el medio ambiente. No vendemos tours — creamos memorias que duran toda la vida.
            </p>
            <div className="flex gap-6">
              <div>
                <p className="font-display font-bold text-3xl" style={{ color: '#2A5C1A' }}>24</p>
                <p className="text-xs mt-0.5" style={{ color: '#6B4A2A' }}>Guías expertos</p>
              </div>
              <div style={{ borderLeft: '1px solid #D4C4A8' }} className="pl-6">
                <p className="font-display font-bold text-3xl" style={{ color: '#B85C2A' }}>5</p>
                <p className="text-xs mt-0.5" style={{ color: '#6B4A2A' }}>Regiones cubiertas</p>
              </div>
              <div style={{ borderLeft: '1px solid #D4C4A8' }} className="pl-6">
                <p className="font-display font-bold text-3xl" style={{ color: '#E8A427' }}>★4.9</p>
                <p className="text-xs mt-0.5" style={{ color: '#6B4A2A' }}>Calificación media</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1527301460062-0b9f5a0b96d5?w=700&h=800&fit=crop&auto=format"
              alt="Equipo de guías de Tierra Aventura"
              className="w-full rounded-2xl object-cover"
              style={{ height: 420 }}
            />
            <div
              className="absolute -bottom-4 -left-4 rounded-2xl p-5 shadow-xl"
              style={{ backgroundColor: '#2A5C1A', maxWidth: 200 }}
            >
              <img src={mascotImg} alt="Taki, la mascota" className="w-16 h-16 object-contain mx-auto mb-2" />
              <p className="text-white text-xs text-center font-semibold">Taki, nuestro guía explorador te acompaña en cada paso</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section
        id="contacto"
        className="py-16 px-6 md:px-20"
        style={{ backgroundColor: '#E8D9C0' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: '#B85C2A' }}>
            Contáctanos
          </p>
          <h2
            className="font-display font-bold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#1A3D10' }}
          >
            ¿Listo para tu aventura?
          </h2>
          <p className="text-sm leading-relaxed mb-10" style={{ color: '#6B4A2A' }}>
            Cuéntanos qué tipo de experiencia buscas y uno de nuestros guías te contactará en menos de 24 horas.
          </p>
          <form className="grid gap-4 text-left" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Tu nombre"
                className="rounded-xl px-4 py-3 text-sm outline-none focus:ring-2"
                style={{ backgroundColor: '#F4EAD8', color: '#3A2008', border: '1px solid #C8B89A', outlineColor: '#2A5C1A' }}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="rounded-xl px-4 py-3 text-sm outline-none focus:ring-2"
                style={{ backgroundColor: '#F4EAD8', color: '#3A2008', border: '1px solid #C8B89A' }}
              />
            </div>
            <select
              className="rounded-xl px-4 py-3 text-sm outline-none appearance-none"
              style={{ backgroundColor: '#F4EAD8', color: '#3A2008', border: '1px solid #C8B89A' }}
            >
              <option value="">Selecciona una ruta</option>
              {trails.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name} — {t.difficulty}
                </option>
              ))}
              <option value="personalizada">Ruta personalizada</option>
            </select>
            <textarea
              rows={4}
              placeholder="Cuéntanos sobre tu grupo, fechas y cualquier requerimiento especial..."
              className="rounded-xl px-4 py-3 text-sm outline-none resize-none"
              style={{ backgroundColor: '#F4EAD8', color: '#3A2008', border: '1px solid #C8B89A' }}
            />
            <button
              type="submit"
              className="py-3.5 rounded-xl font-semibold text-white tracking-wide transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#2A5C1A' }}
            >
              Enviar consulta
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 md:px-20" style={{ backgroundColor: '#1A3D10' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Tierra Aventura" className="h-10 object-contain brightness-200" />
            <div>
              <p className="font-display font-bold text-white text-base leading-none">Tierra Aventura</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Agencia de Viajes · Sendero</p>
            </div>
          </div>
          <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
            © 2026 Tierra Aventura. Todos los derechos reservados.
          </p>
          <div className="flex gap-5">
            {['Instagram', 'Facebook', 'WhatsApp'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* TRAIL MODAL */}
      {activeTrail && <TrailModal trail={activeTrail} onClose={() => setActiveTrail(null)} />}

      {/* CHAT MASCOT */}
      <ChatWidget />
    </div>
  )
}
