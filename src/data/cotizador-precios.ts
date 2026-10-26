// Precios del cotizador de cámaras (gnet.com.ar/cotizar).
//
// Cómo se armaron (octubre 2026): precio de mercado en Argentina, con IVA,
// más un 20% de Gnet. Para actualizarlos, cambiá el número de "mercado" y el
// sitio recalcula solo el 20% (MARGEN).
//
// Fuentes del precio de mercado:
// - Cámara a batería: pack de 2 Blink Outdoor 4 + Sync Module, $350.000 (tepligroup.com.ar) → por cámara.
// - Cámara WiFi: Gadnic / Ezviz / Imou exterior en MercadoLibre, $62.000 a $81.000.
// - Cámara cableada HD: Hikvision turret 1080p a 5MP, $60.800 a $63.100 (argseguridad.com).
// - Grabador DVR 4 canales Hikvision: $126.200 (argseguridad.com).
// - Grabador DVR 8 canales: estimado (1,6 veces el de 4 canales).
// - Disco 1 TB para grabación: $65.000 a $104.000 (todoresuelto.com, oct 2026).
// - Disco 2 TB: estimado.
// - Cable UTP exterior 100% cobre: $1.133 el metro (argseguridad.com).
// - Fichas, balun y fuente por cámara: estimado.
// - Instalación por cámara: $85.500 en superficie (Electro Instalador, mayo-junio 2026).
// - Configuración del grabador y la app: $52.000 a $155.000 (todoresuelto.com).

export const MARGEN = 1.2; // +20% sobre el precio de mercado
export const RANGO = 1.15; // el "hasta" del presupuesto: +15% para imprevistos

const mercado = {
  camaraBateria: 175000,
  camaraWifi: 70000,
  camaraCableada: 62000,
  dvr4: 126000,
  dvr8: 200000,
  disco1tb: 85000,
  disco2tb: 135000,
  cableMetro: 1133,
  materialesPorCamara: 12000,
  instalacionCableada: 85500,
  instalacionInalambrica: 42000,
  configuracionGrabador: 90000,
  configuracionApp: 40000,
};

type Precios = typeof mercado;

export const PRECIOS: Precios = Object.fromEntries(
  Object.entries(mercado).map(([clave, valor]) => [clave, Math.round((valor * MARGEN) / 100) * 100]),
) as Precios;
