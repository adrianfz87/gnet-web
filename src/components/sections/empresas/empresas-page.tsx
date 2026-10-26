"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Wrench,
  Activity,
  Cctv,
  Server,
  Wifi,
  Mountain,
  Store,
  Building2,
  MapPin,
  Check,
} from "lucide-react";

const WHATSAPP_PHONE = "5492944824423";

function openWhatsapp(message: string) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const baseUrl = isMobile
    ? "https://api.whatsapp.com/send"
    : "https://web.whatsapp.com/send";
  window.open(
    `${baseUrl}?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`,
    "_blank",
  );
}

const services = [
  {
    icon: ClipboardList,
    title: "Consultoría y diseño",
    text: "Relevamos tu red, te decimos qué cambiar y armamos el proyecto completo: enlaces, fibra, WiFi, seguridad.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento integral",
    text: "Un abono mensual y nos ocupamos de todo: redes, PCs, impresoras, cámaras y servidores. Un solo responsable.",
  },
  {
    icon: Activity,
    title: "Monitoreo 24/7",
    text: "Plataforma propia que vigila cada equipo y enlace. Nos enteramos de una falla antes que vos.",
  },
  {
    icon: Wifi,
    title: "Redes y WiFi empresarial",
    text: "MikroTik, UniFi y fibra óptica. Redes separadas por sector, invitados aparte y enlaces que no se caen.",
  },
  {
    icon: Cctv,
    title: "Cámaras y seguridad",
    text: "Videovigilancia, control de accesos y alarmas, integrados a la misma red y mantenidos por nosotros.",
  },
  {
    icon: Server,
    title: "Servidores y respaldos",
    text: "Servidores, copias de seguridad automáticas y acceso remoto seguro para tu equipo.",
  },
];

const sectors = [
  {
    icon: Mountain,
    title: "Minería y sitios remotos",
    text: "Campamentos en la cordillera con fibra óptica de varios kilómetros, varios enlaces satelitales balanceados para que internet no se corte, decenas de antenas WiFi y redes separadas por sector.",
    points: ["Enlaces de respaldo", "Fibra en el campamento", "WiFi por sectores"],
  },
  {
    icon: Store,
    title: "Comercios con sucursales",
    text: "Cada sucursal conectada y vigilada desde un solo lugar: cajas, PCs, impresoras, cámaras y WiFi. Si algo falla en una, lo vemos al instante.",
    points: ["Todas las sucursales en un panel", "Soporte remoto", "Cámaras por sucursal"],
  },
  {
    icon: Building2,
    title: "Oficinas, hoteles y clínicas",
    text: "Red ordenada, WiFi que llega a todos lados, servidores con respaldo y un técnico que conoce tu instalación.",
    points: ["WiFi para huéspedes y equipo", "Respaldos automáticos", "Atención prioritaria"],
  },
];

const steps = [
  { n: "1", title: "Relevamiento", text: "Vamos (o nos conectamos) y vemos cómo está tu red hoy." },
  { n: "2", title: "Propuesta", text: "Te pasamos un plan claro: qué hacer, en qué orden y cuánto cuesta." },
  { n: "3", title: "Instalación", text: "Lo dejamos andando y documentado, sin cortar tu operación." },
  { n: "4", title: "Mantenimiento", text: "Abono mensual: monitoreo, soporte y visitas cuando hacen falta." },
];

// Dibujo propio: varios sitios (minera, comercio, oficina) unidos a un servidor de Gnet.
function NetworkArt() {
  const sites = [
    { x: 70, y: 70, label: "Minera" },
    { x: 70, y: 200, label: "Sucursales" },
    { x: 370, y: 70, label: "Oficina" },
    { x: 370, y: 200, label: "Hotel" },
  ];
  return (
    <svg viewBox="0 0 440 270" className="w-full h-auto" role="img" aria-label="Sitios de una empresa conectados y monitoreados por Gnet">
      <path d="M0 250 L60 205 L95 228 L150 180 L205 232 L250 200 L300 236 L360 196 L440 236 L440 270 L0 270 Z" fill="rgba(255,255,255,0.05)" />
      {sites.map((s, i) => (
        <g key={s.label}>
          <path
            d={`M${s.x} ${s.y} Q ${(s.x + 220) / 2} ${s.y < 135 ? s.y - 20 : s.y + 20} 220 135`}
            fill="none"
            stroke="#5eead4"
            strokeWidth="1.6"
            strokeDasharray="3 7"
            strokeLinecap="round"
            opacity="0.8"
          >
            <animate attributeName="stroke-dashoffset" values="20;0" dur="1.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </path>
          <circle cx={s.x} cy={s.y} r="26" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" />
          <circle cx={s.x + 18} cy={s.y - 18} r="4" fill="#22c55e">
            <animate attributeName="opacity" values="1;0.35;1" dur="2.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <text x={s.x} y={s.y + 46} textAnchor="middle" fontSize="12" fontWeight="600" fill="rgba(255,255,255,0.8)">
            {s.label}
          </text>
        </g>
      ))}
      {/* iconos simples dentro de cada sitio */}
      <path d="M56 80 L66 62 L72 72 L78 64 L86 80 Z" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M56 196 h28 v14 h-28 z M54 196 l4 -8 h24 l4 8" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M358 56 h24 v28 h-24 z M364 63 h4 M372 63 h4 M364 71 h4 M372 71 h4" fill="none" stroke="#fff" strokeWidth="1.6" />
      <path d="M356 210 h28 M358 210 v-14 h24 v14 M362 196 v-6 h16 v6" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Servidor al centro */}
      <circle cx="220" cy="135" r="44" fill="rgba(21,101,192,0.35)" />
      <circle cx="220" cy="135" r="34" fill="#1565c0" />
      <g>
        <rect x="201" y="116" width="38" height="11" rx="2.5" fill="#0b1f3a" stroke="#93c5fd" strokeWidth="1.2" />
        <path d="M206 121.5 h12" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        <circle cx="229" cy="121.5" r="1.6" fill="#22c55e">
          <animate attributeName="opacity" values="1;0.25;1" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="234" cy="121.5" r="1.6" fill="#5eead4">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="0.9s" repeatCount="indefinite" />
        </circle>
        <rect x="201" y="130" width="38" height="11" rx="2.5" fill="#0b1f3a" stroke="#93c5fd" strokeWidth="1.2" />
        <path d="M206 135.5 h12" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        <circle cx="229" cy="135.5" r="1.6" fill="#22c55e">
          <animate attributeName="opacity" values="1;0.25;1" dur="1.7s" repeatCount="indefinite" />
        </circle>
        <circle cx="234" cy="135.5" r="1.6" fill="#5eead4">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.3s" repeatCount="indefinite" />
        </circle>
        <rect x="201" y="144" width="38" height="11" rx="2.5" fill="#0b1f3a" stroke="#93c5fd" strokeWidth="1.2" />
        <path d="M206 149.5 h12" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        <circle cx="229" cy="149.5" r="1.6" fill="#22c55e">
          <animate attributeName="opacity" values="1;0.25;1" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="234" cy="149.5" r="1.6" fill="#5eead4">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.7000000000000002s" repeatCount="indefinite" />
        </circle>
      </g>
      <circle cx="220" cy="135" r="44" fill="none" stroke="#5eead4" strokeWidth="1.2" opacity="0.6">
        <animate attributeName="r" values="44;58;44" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export function EmpresasPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[28rem] h-[28rem] bg-[var(--color-primary)]/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[24rem] h-[24rem] bg-teal-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-36 pb-20 lg:pt-40 lg:pb-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div {...fade} className="flex flex-col gap-6 items-center text-center lg:items-start lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-teal-200 border border-white/10">
                <MapPin className="w-4 h-4" />
                Bariloche y todo el país
              </span>
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                No solo te damos internet.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-200">
                  Nos ocupamos de toda tu tecnología.
                </span>
              </h1>
              <p className="max-w-2xl text-lg text-slate-300 leading-relaxed">
                Consultoría, instalación y mantenimiento integral de redes,
                WiFi, cámaras y servidores para empresas. Un solo equipo que
                conoce tu instalación, la vigila todo el día y responde.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => openWhatsapp("Hola, quiero consultar por el servicio de mantenimiento para empresas.")}
                  className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 hover:-translate-y-1 cursor-pointer"
                >
                  Pedir un relevamiento
                </button>
                <a
                  href="#servicios"
                  className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10 hover:-translate-y-1"
                >
                  Ver qué hacemos
                </a>
              </div>
            </motion.div>
            <motion.div {...fade} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <NetworkArt />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="w-full max-w-[1100px] mx-auto px-4 md:px-10 py-20">
        <motion.div {...fade} className="flex flex-col gap-3 max-w-[720px] mb-10 text-center md:text-left mx-auto md:mx-0">
          <span className="text-[var(--color-primary)] text-sm font-bold uppercase tracking-wide">Servicios para empresas</span>
          <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
            Todo lo que tu empresa necesita, con un solo responsable
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            Dejá de llamar a uno para la red, a otro para las cámaras y a otro
            para el servidor. Lo hacemos todo y lo mantenemos en el tiempo.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              {...fade}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 dark:bg-slate-800 text-[var(--color-primary)]">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sectores */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="w-full max-w-[1100px] mx-auto px-4 md:px-10 py-20">
          <motion.div {...fade} className="flex flex-col gap-3 max-w-[720px] mb-10 text-center md:text-left mx-auto md:mx-0">
            <span className="text-[var(--color-primary)] text-sm font-bold uppercase tracking-wide">Dónde trabajamos</span>
            <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
              De un campamento minero a una cadena de comercios
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {sectors.map(({ icon: Icon, title, text, points }, i) => (
              <motion.div
                key={title}
                {...fade}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-7"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">{title}</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{text}</p>
                <ul className="mt-auto flex flex-col gap-2 pt-2">
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                      <Check className="w-4 h-4 text-teal-500 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="w-full max-w-[1100px] mx-auto px-4 md:px-10 py-20">
        <motion.div {...fade} className="flex flex-col gap-3 max-w-[720px] mb-10 text-center md:text-left mx-auto md:mx-0">
          <span className="text-[var(--color-primary)] text-sm font-bold uppercase tracking-wide">Cómo trabajamos</span>
          <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
            Simple y sin sorpresas
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div key={s.n} {...fade} transition={{ duration: 0.45, delay: i * 0.06 }} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-black">
                  {s.n}
                </span>
                <span className="hidden lg:block h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              </div>
              <h3 className="text-slate-900 dark:text-white text-lg font-bold">{s.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Todo el país + CTA */}
      <section className="py-20 bg-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-[var(--color-primary)]/10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--color-primary)]/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            En Bariloche y en todo el país
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
            Vigilamos tu red a distancia las 24 horas y viajamos cuando hace
            falta estar en el lugar. Contanos qué tenés y te decimos cómo lo
            mejoramos.
          </p>
          <button
            type="button"
            onClick={() => openWhatsapp("Hola, quiero hablar con un asesor de Gnet Empresas.")}
            className="px-8 py-4 bg-white text-[var(--color-primary)] font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:-translate-y-1 cursor-pointer"
          >
            Hablar con un asesor
          </button>
        </div>
      </section>
    </>
  );
}
