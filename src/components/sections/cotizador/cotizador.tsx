"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BatteryFull,
  Cable,
  Check,
  Home,
  Store,
  Building2,
  Trees,
  Wifi,
  Sun,
  Sofa,
  Layers,
} from "lucide-react";
import { PRECIOS, RANGO } from "@/data/cotizador-precios";
import { cn } from "@/lib/utils";

const WHATSAPP_PHONE = "5492944824423";

type Tipo = "bateria" | "wifi" | "cableada";

const LUGARES = [
  { key: "Casa", icon: Home },
  { key: "Comercio", icon: Store },
  { key: "Oficina", icon: Building2 },
  { key: "Campo o cabaña", icon: Trees },
];

const TIPOS: { key: Tipo; icon: typeof Wifi; title: string; text: string }[] = [
  {
    key: "bateria",
    icon: BatteryFull,
    title: "Inalámbricas a pilas",
    text: "Sin un solo cable. Las pilas duran hasta 2 años. Graban cuando detectan movimiento.",
  },
  {
    key: "wifi",
    icon: Wifi,
    title: "WiFi con enchufe",
    text: "Solo necesitan un enchufe cerca. Se ven desde el celular.",
  },
  {
    key: "cableada",
    icon: Cable,
    title: "Cableadas con grabador",
    text: "Las más robustas: graban todo el tiempo en un grabador, aunque se corte internet.",
  },
];

const UBICACIONES = [
  { key: "Adentro", icon: Sofa },
  { key: "Afuera", icon: Sun },
  { key: "Adentro y afuera", icon: Layers },
];

const CANTIDADES = [1, 2, 3, 4, 5, 6, 7, 8];
const DISTANCIAS = [10, 20, 30, 50];

const TIPO_TEXTO: Record<Tipo, string> = {
  bateria: "inalámbricas a pilas",
  wifi: "WiFi con enchufe",
  cableada: "cableadas con grabador",
};

// Los montos se redondean siempre para arriba, a los $5.000: "$ 155.000".
const REDONDEO = 5000;
const arriba = (n: number) => Math.ceil(n / REDONDEO) * REDONDEO;
const pesos = (n: number) => "$ " + arriba(n).toLocaleString("es-AR");

// "bonificado": se muestra tachado y no suma al total (regalo de Gnet).
type Linea = { concepto: string; monto: number; bonificado?: boolean };

function calcular(tipo: Tipo, cantidad: number, metros: number): Linea[] {
  const p = PRECIOS;
  if (tipo === "bateria") {
    return [
      { concepto: `${cantidad} cámara${cantidad > 1 ? "s" : ""} inalámbrica${cantidad > 1 ? "s" : ""} a pilas`, monto: cantidad * p.camaraBateria },
      { concepto: "Instalación", monto: cantidad * p.instalacionInalambrica },
      { concepto: "Configuración de las cámaras, la app y tu cuenta", monto: p.configuracionApp, bonificado: true },
    ];
  }
  if (tipo === "wifi") {
    return [
      { concepto: `${cantidad} cámara${cantidad > 1 ? "s" : ""} WiFi`, monto: cantidad * p.camaraWifi },
      { concepto: "Instalación", monto: cantidad * p.instalacionInalambrica },
      { concepto: "Configuración de las cámaras, la app y tu cuenta", monto: p.configuracionApp, bonificado: true },
    ];
  }
  const grabador = cantidad <= 4 ? p.dvr4 : p.dvr8;
  const disco = cantidad <= 4 ? p.disco1tb : p.disco2tb;
  return [
    { concepto: `${cantidad} cámara${cantidad > 1 ? "s" : ""} HD`, monto: cantidad * p.camaraCableada },
    { concepto: `Grabador de ${cantidad <= 4 ? 4 : 8} canales con disco de ${cantidad <= 4 ? "1" : "2"} TB`, monto: grabador + disco },
    { concepto: `Cable y materiales (~${metros} m por cámara)`, monto: cantidad * (metros * p.cableMetro + p.materialesPorCamara) },
    { concepto: "Instalación", monto: cantidad * p.instalacionCableada },
    { concepto: "Configuración del grabador, la app y tu cuenta", monto: p.configuracionGrabador, bonificado: true },
  ];
}

function Opcion({
  activo,
  onClick,
  children,
  className,
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex rounded-xl border p-4 text-left transition-all cursor-pointer",
        activo
          ? "border-[var(--color-primary)] bg-blue-50/70 dark:bg-slate-800 ring-1 ring-[var(--color-primary)]"
          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700",
        className,
      )}
    >
      {activo && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
          <Check className="h-3.5 w-3.5" />
        </span>
      )}
      {children}
    </button>
  );
}

export function Cotizador() {
  const [paso, setPaso] = useState(0);
  const [lugar, setLugar] = useState<string | null>(null);
  const [tipo, setTipo] = useState<Tipo | null>(null);
  const [ubicacion, setUbicacion] = useState<string | null>(null);
  const [cantidad, setCantidad] = useState<number | null>(null);
  const [metros, setMetros] = useState<number | null>(null);
  const [nombre, setNombre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [barrio, setBarrio] = useState("");

  const pasos = useMemo(() => {
    const lista = ["lugar", "tipo", "ubicacion", "cantidad"];
    if (tipo === "cableada") lista.push("distancia");
    lista.push("datos", "resultado");
    return lista;
  }, [tipo]);

  const actual = pasos[Math.min(paso, pasos.length - 1)];
  const totalPreguntas = pasos.length - 1;

  const listo =
    (actual === "lugar" && lugar) ||
    (actual === "tipo" && tipo) ||
    (actual === "ubicacion" && ubicacion) ||
    (actual === "cantidad" && cantidad) ||
    (actual === "distancia" && metros) ||
    (actual === "datos" && nombre.trim().length > 1 && whatsapp.replace(/\D/g, "").length >= 8);

  const lineas = tipo && cantidad ? calcular(tipo, cantidad, metros || 20) : [];
  const total = lineas.reduce((n, l) => n + (l.bonificado ? 0 : arriba(l.monto)), 0);

  function enviar() {
    const resumen = [
      "Hola, hice la cotización de cámaras en la web:",
      `• Lugar: ${lugar}`,
      `• Cámaras: ${cantidad} ${tipo ? TIPO_TEXTO[tipo] : ""} (${ubicacion?.toLowerCase()})`,
      tipo === "cableada" ? `• Cable: ~${metros} m por cámara` : null,
      `• Presupuesto estimado: ${pesos(total)} a ${pesos(total * RANGO)}`,
      `• Nombre: ${nombre.trim()}`,
      `• WhatsApp: ${whatsapp.trim()}`,
      barrio.trim() ? `• Barrio: ${barrio.trim()}` : null,
      "• Configuración de equipos, app y cuenta: bonificada",
      "Quiero coordinar la visita para confirmar el precio.",
    ]
      .filter(Boolean)
      .join("\n");
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const base = isMobile ? "https://api.whatsapp.com/send" : "https://web.whatsapp.com/send";
    window.open(`${base}?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(resumen)}`, "_blank");
  }

  const titulo: Record<string, string> = {
    lugar: "¿Dónde querés las cámaras?",
    tipo: "¿Qué tipo de cámaras?",
    ubicacion: "¿Van adentro o afuera?",
    cantidad: "¿Cuántas cámaras?",
    distancia: "¿Cuánto cable hay hasta cada cámara?",
    datos: "¿A quién le mandamos el presupuesto?",
    resultado: "Tu presupuesto estimado",
  };

  return (
    <section className="w-full max-w-[760px] mx-auto px-4 pt-32 pb-16 md:px-6">
      <div className="flex flex-col gap-2 text-center mb-8">
        <span className="text-[var(--color-primary)] text-sm font-bold uppercase tracking-wide">
          Cotizador de cámaras
        </span>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Armá tu presupuesto en 2 minutos
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Elegí las opciones y te mostramos cuánto sale, con instalación incluida.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {/* progreso */}
        <div className="h-1.5 bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-[var(--color-primary)] transition-all duration-500"
            style={{ width: `${(Math.min(paso, totalPreguntas) / totalPreguntas) * 100}%` }}
          />
        </div>

        <div className="p-5 md:p-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{titulo[actual]}</h2>
            {actual !== "resultado" && (
              <span className="text-sm text-slate-400 shrink-0 ml-4">
                {paso + 1} de {totalPreguntas}
              </span>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={actual}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
            >
              {actual === "lugar" && (
                <div className="grid grid-cols-2 gap-3">
                  {LUGARES.map(({ key, icon: Icon }) => (
                    <Opcion key={key} activo={lugar === key} onClick={() => setLugar(key)} className="flex-col items-center gap-3 py-6">
                      <Icon className="h-8 w-8 text-[var(--color-primary)]" />
                      <span className="font-semibold text-slate-900 dark:text-white">{key}</span>
                    </Opcion>
                  ))}
                </div>
              )}

              {actual === "tipo" && (
                <div className="grid gap-3">
                  {TIPOS.map(({ key, icon: Icon, title, text }) => (
                    <Opcion key={key} activo={tipo === key} onClick={() => setTipo(key)} className="items-start gap-4 pr-10">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-slate-800 text-[var(--color-primary)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex flex-col gap-1">
                        <span className="font-semibold text-slate-900 dark:text-white">{title}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{text}</span>
                      </span>
                    </Opcion>
                  ))}
                </div>
              )}

              {actual === "ubicacion" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {UBICACIONES.map(({ key, icon: Icon }) => (
                    <Opcion key={key} activo={ubicacion === key} onClick={() => setUbicacion(key)} className="flex-col items-center gap-3 py-6">
                      <Icon className="h-8 w-8 text-[var(--color-primary)]" />
                      <span className="font-semibold text-slate-900 dark:text-white">{key}</span>
                    </Opcion>
                  ))}
                </div>
              )}

              {actual === "cantidad" && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-4 gap-3">
                    {CANTIDADES.map((n) => (
                      <Opcion key={n} activo={cantidad === n} onClick={() => setCantidad(n)} className="justify-center py-5">
                        <span className="text-2xl font-black text-slate-900 dark:text-white">{n}</span>
                      </Opcion>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    ¿Necesitás más de 8? Elegí 8 y en el mensaje contanos cuántas: lo armamos a medida.
                  </p>
                </div>
              )}

              {actual === "distancia" && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {DISTANCIAS.map((m) => (
                      <Opcion key={m} activo={metros === m} onClick={() => setMetros(m)} className="flex-col items-center gap-1 py-5">
                        <span className="text-2xl font-black text-slate-900 dark:text-white">{m} m</span>
                        <span className="text-xs text-slate-500">por cámara</span>
                      </Opcion>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Es la distancia aproximada desde donde va el grabador (cerca del router) hasta cada cámara. Si no sabés, elegí 20 m.
                  </p>
                </div>
              )}

              {actual === "datos" && (
                <div className="grid gap-4">
                  {[
                    { label: "Nombre", value: nombre, set: setNombre, placeholder: "Tu nombre", type: "text" },
                    { label: "WhatsApp", value: whatsapp, set: setWhatsapp, placeholder: "Ej. 294 4123456", type: "tel" },
                    { label: "Barrio (opcional)", value: barrio, set: setBarrio, placeholder: "Ej. Melipal", type: "text" },
                  ].map((campo) => (
                    <label key={campo.label} className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{campo.label}</span>
                      <input
                        type={campo.type}
                        value={campo.value}
                        onChange={(event) => campo.set(event.target.value)}
                        placeholder={campo.placeholder}
                        className="h-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 text-slate-900 dark:text-white outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                      />
                    </label>
                  ))}
                </div>
              )}

              {actual === "resultado" && tipo && cantidad && (
                <div className="flex flex-col gap-6">
                  <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-5 text-center">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {cantidad} cámara{cantidad > 1 ? "s" : ""} {TIPO_TEXTO[tipo]}, con instalación
                    </span>
                    <div className="mt-1 text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                      <span className="whitespace-nowrap">{pesos(total)}</span>{" "}
                      <span className="text-slate-400 font-bold text-2xl">a</span>{" "}
                      <span className="whitespace-nowrap">{pesos(total * RANGO)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    {lineas.map((linea) => (
                      <div key={linea.concepto} className="flex items-baseline justify-between gap-4 py-2.5 border-b border-slate-100 dark:border-slate-800 text-sm">
                        <span className="text-slate-600 dark:text-slate-300">{linea.concepto}</span>
                        {linea.bonificado ? (
                          <span className="flex items-baseline gap-2 whitespace-nowrap">
                            <span className="text-slate-400 line-through">{pesos(linea.monto)}</span>
                            <span className="rounded-full bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">Bonificado</span>
                          </span>
                        ) : (
                          <span className="font-semibold text-slate-900 dark:text-white whitespace-nowrap">{pesos(linea.monto)}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Es un precio estimado. El precio final se confirma en una visita sin cargo: si en el lugar hay algo
                    distinto, te avisamos antes de hacer nada.
                  </p>

                  <button
                    type="button"
                    onClick={enviar}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 text-white text-base font-bold shadow-lg hover:brightness-95 transition cursor-pointer"
                  >
                    Coordinar la visita por WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* navegación */}
          <div className="mt-8 flex items-center justify-between gap-4">
            {paso > 0 ? (
              <button
                type="button"
                onClick={() => setPaso(paso - 1)}
                className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> Atrás
              </button>
            ) : (
              <span />
            )}
            {actual !== "resultado" && (
              <button
                type="button"
                disabled={!listo}
                onClick={() => setPaso(paso + 1)}
                className="flex h-12 items-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 text-white font-bold shadow-lg transition-colors hover:bg-blue-600 disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer"
              >
                {actual === "datos" ? "Ver mi presupuesto" : "Siguiente"} <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
