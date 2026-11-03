// Precios del cotizador de cámaras (gnet.com.ar/cotizar).
//
// Precios de venta de Gnet (noviembre 2026), los mismos que Satell.
// Para actualizarlos, cambiá el número y el sitio recalcula solo.
// La configuración de equipos, app y cuenta vale el 70% de la instalación y se
// muestra bonificada (tachada, no suma al total).

export const RANGO = 1.15; // el "hasta" del presupuesto: +15% para imprevistos
export const CONFIGURACION = 0.7; // la configuración (bonificada) vale el 70% de la instalación
export const RECARGO_NEGOCIO = 1.21; // comercio u oficina: +21% sobre todo

export const PRECIOS = {
  camaraBateria: 300000, // tipo Blink, a pilas
  camaraWifi: 150000, // Ezviz / Imou, con tarjeta SD de 64 GB
  camaraCableada: 75000, // Hikvision HD
  dvr4: 200000, // grabador 4 canales
  dvr8: 250000, // grabador 8 canales
  ssd512: 180000, // disco SSD 512 GB (va con el de 4 canales)
  ssd1tb: 250000, // disco SSD 1 TB (va con el de 8 canales)
  cableMetro: 4000, // cable de datos, cableadas
  materialesPorCamara: 15000, // fichas, balun y fuente, cableadas
  cableEnergiaMetro: 2000, // cable bipolar para alimentar las WiFi
  instalacionBateria: 75000, // por cámara a pilas
  instalacionWifi: 125000, // por cámara WiFi, cableando la energía
  instalacionCableada: 125000, // por cámara cableada
};
