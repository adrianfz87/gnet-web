"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BatteryFull,
  CloudRain,
  Moon,
  BellRing,
  MessageCircle,
  Plug,
} from "lucide-react";

const WHATSAPP_PHONE = "5492944824423";

const features = [
  {
    icon: Plug,
    title: "Sin un solo cable",
    text: "Ni corriente ni red: se atornilla o se apoya donde quieras y funciona con tu WiFi.",
  },
  {
    icon: BatteryFull,
    title: "Batería de hasta 2 años*",
    text: "Funciona con dos pilas AA de litio. Te olvidás del cargador.",
  },
  {
    icon: CloudRain,
    title: "Lista para la intemperie",
    text: "Aguanta lluvia, nieve y frío patagónico en el exterior de tu casa.",
  },
  {
    icon: Moon,
    title: "Ve de noche",
    text: "Visión nocturna en HD para que nada pase desapercibido.",
  },
  {
    icon: BellRing,
    title: "Te avisa al celular",
    text: "Detecta movimiento y te manda el aviso con el video al instante.",
  },
  {
    icon: MessageCircle,
    title: "Hablá desde la app",
    text: "Audio de ida y vuelta: atendé al repartidor o espantá a un intruso.",
  },
];

function openWhatsapp() {
  const message =
    "Hola, quiero consultar por las cámaras inalámbricas.";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const baseUrl = isMobile
    ? "https://api.whatsapp.com/send"
    : "https://web.whatsapp.com/send";
  window.open(
    `${baseUrl}?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`,
    "_blank",
  );
}

// Dibujo propio: una cámara compacta en la pared de una casa, sin cables,
// avisando al celular por WiFi.
function WirelessScene() {
  return (
    <svg
      viewBox="0 0 420 320"
      className="w-full h-auto"
      role="img"
      aria-label="Cámara inalámbrica en la pared de una casa avisando al celular"
    >
      <defs>
        <linearGradient id="wcSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8f1fb" />
          <stop offset="1" stopColor="#f8fafc" />
        </linearGradient>
        <linearGradient id="wcCam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b3442" />
          <stop offset="1" stopColor="#11161d" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="420" height="320" rx="24" fill="url(#wcSky)" />
      {/* cordillera */}
      <path
        d="M0 210 L70 150 L110 180 L170 120 L230 185 L280 150 L340 195 L420 160 L420 320 L0 320 Z"
        fill="#dbe6f2"
      />
      <path d="M170 120 L188 138 L176 136 L170 146 L162 135 L152 138 Z" fill="#ffffff" />
      <path d="M70 150 L84 162 L74 161 L68 168 L62 160 Z" fill="#ffffff" />
      {/* casa */}
      <path d="M60 300 V190 L150 130 L240 190 V300 Z" fill="#ffffff" stroke="#c9d6e3" strokeWidth="2" />
      <path d="M50 196 L150 126 L250 196" fill="none" stroke="#1565c0" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="128" y="236" width="44" height="64" rx="4" fill="#e8eef5" stroke="#c9d6e3" strokeWidth="2" />
      <rect x="82" y="214" width="30" height="30" rx="3" fill="#e8eef5" stroke="#c9d6e3" strokeWidth="2" />
      {/* cámara en la pared */}
      <g transform="translate(198 200)">
        <rect x="0" y="0" width="34" height="32" rx="8" fill="url(#wcCam)" />
        <circle cx="17" cy="15" r="7.5" fill="#0b0f14" stroke="#3b4656" strokeWidth="1.5" />
        <circle cx="15" cy="13" r="2.2" fill="#5a8fd6" />
        <circle cx="27" cy="6" r="1.6" fill="#22c55e">
          <animate attributeName="opacity" values="1;0.2;1" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* ondas WiFi hacia el celular */}
      <g fill="none" stroke="#1565c0" strokeLinecap="round" strokeWidth="3">
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${246 + i * 14} ${198 - i * 10} q ${12 + i * 4} ${18 + i * 10} 0 ${36 + i * 20}`}
            opacity={0.8 - i * 0.2}
          >
            <animate
              attributeName="opacity"
              values={`${0.15};${0.85 - i * 0.2};${0.15}`}
              dur="1.8s"
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}
      </g>
      {/* celular */}
      <g transform="translate(300 118)">
        <rect x="0" y="0" width="84" height="150" rx="14" fill="#0f172a" />
        <rect x="6" y="10" width="72" height="130" rx="9" fill="#ffffff" />
        <rect x="12" y="18" width="60" height="40" rx="6" fill="#dbe6f2" />
        <path d="M18 52 L32 38 L42 46 L52 34 L66 52 Z" fill="#9fb7d3" />
        <circle cx="60" cy="27" r="4" fill="#ef4444" />
        <rect x="12" y="66" width="60" height="22" rx="6" fill="#eaf2fd" />
        <circle cx="22" cy="77" r="5" fill="#1565c0" />
        <rect x="31" y="72" width="34" height="4" rx="2" fill="#1565c0" opacity="0.8" />
        <rect x="31" y="80" width="24" height="3" rx="1.5" fill="#94a3b8" />
        <rect x="12" y="96" width="60" height="4" rx="2" fill="#e2e8f0" />
        <rect x="12" y="106" width="44" height="4" rx="2" fill="#e2e8f0" />
      </g>
      <text x="342" y="296" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1565c0">
        Aviso al instante
      </text>
    </svg>
  );
}

export function WirelessCamerasSecurity() {
  return (
    <section
      id="camaras-inalambricas"
      className="w-full max-w-[960px] mx-auto px-4 py-14 md:px-10"
    >
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 dark:bg-slate-800 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--color-primary)]">
              Nuevo · Cámaras inalámbricas
            </span>
            <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
              Cámaras 100% inalámbricas.{" "}
              <span className="text-[var(--color-primary)]">
                Las pilas duran hasta 2 años.
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              Estas cámaras se ponen en minutos, sin obra ni
              cables, y funcionan con el WiFi de tu casa. Mirás todo en vivo
              desde el celular, estés donde estés.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={openWhatsapp}
                className="flex h-12 items-center justify-center rounded-lg bg-[var(--color-primary)] px-6 text-white text-base font-bold shadow-lg hover:bg-blue-600 transition-colors cursor-pointer"
              >
                Quiero mis cámaras
              </button>
              <Link
                href="/cotizar"
                className="flex h-12 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 px-6 text-slate-900 dark:text-white text-base font-bold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                Cotizá online en 2 minutos
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <WirelessScene />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-800">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex gap-4 bg-white dark:bg-slate-900 p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-slate-800 text-[var(--color-primary)]">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-slate-900 dark:text-white text-base font-bold leading-tight">
                  {title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="px-6 md:px-10 py-4 text-xs text-slate-400 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800">
          * Duración informada por el fabricante con uso típico. Varía según la
          cantidad de grabaciones, el frío y la señal WiFi.
        </p>
      </div>
    </section>
  );
}
