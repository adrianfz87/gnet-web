"use client";

import { useState, type ReactNode } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { FooterContent } from "@/types/content";
import { cn, isExternalHref } from "@/lib/utils";
import { LegalModal } from "@/components/legal/legal-modal";

function FooterNavLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Footer({ content }: { content: FooterContent }) {
  const [activeModal, setActiveModal] = useState<"terms" | "privacy" | null>(
    null,
  );

  return (
    <>
      <footer
        className="bg-[#0b1116] text-slate-300 py-12 border-t border-slate-800"
        id="contacto"
      >
        <div className="container mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8 text-center lg:text-left">
          <div className="col-span-1 lg:col-span-1 flex flex-col items-center lg:items-center text-center lg:text-center">
            <Link href="/" className="mb-4 w-80 flex justify-center">
              <BrandLogo
                color="white"
                className="w-30 h-32 justify-center"
                priority={false}
              />
            </Link>
            <p className="mt-4 text-base text-slate-300 max-w-sm">
              {content.brandDescription}
            </p>
          </div>

          <div className="col-span-1 lg:col-span-2 md:grid md:grid-cols-2 md:gap-8 min-[1281px]:pl-14">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">
                {content.servicesTitle}
              </h3>
              <ul className="mt-6 space-y-4">
                {content.servicesLinks.map((item) => {
                  const isWifi6 =
                    item.href === "/wifi-6" ||
                    item.label?.toLowerCase().includes("wifi 6");
                  return (
                    <li key={item.label}>
                      <FooterNavLink
                        href={item.href}
                        className={cn(
                          "text-sm leading-6 transition-colors hover:underline",
                          isWifi6
                            ? "text-[var(--color-wifi-primary)] font-bold hover:text-[var(--color-wifi-primary)] hover:brightness-110"
                            : "text-slate-300 hover:text-white",
                        )}
                      >
                        {item.label}
                      </FooterNavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">
                {content.companyTitle}
              </h3>
              <ul className="mt-6 space-y-4">
                {content.companyLinks.map((item) => {
                  const isWifi6 =
                    item.href === "/wifi-6" ||
                    item.label?.toLowerCase().includes("wifi 6");
                  return (
                    <li key={item.label}>
                      <FooterNavLink
                        href={item.href}
                        className={cn(
                          "text-sm leading-6 transition-colors hover:underline",
                          isWifi6
                            ? "text-[var(--color-wifi-primary)] font-bold hover:text-[var(--color-wifi-primary)] hover:brightness-110"
                            : "text-slate-300 hover:text-white",
                        )}
                      >
                        {item.label}
                      </FooterNavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="flex flex-col min-[1281px]:pl-14">
            <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">
              {content.contactTitle}
            </h3>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start justify-center md:justify-start gap-3 text-sm leading-6 text-slate-300">
                <MapPin className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                <span>{content.contactInfo.address}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 text-sm leading-6 text-slate-300">
                <Phone className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                <a
                  href={`tel:${content.contactInfo.phone.replace(
                    /[^0-9+]/g,
                    "",
                  )}`}
                  className="hover:text-white hover:underline transition-colors"
                >
                  {content.contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 text-sm leading-6 text-slate-300">
                <Mail className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                <a
                  href={`mailto:${content.contactInfo.email}`}
                  className="hover:text-white hover:underline transition-colors"
                >
                  {content.contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-10 border-t border-slate-800 pt-8 flex flex-col lg:flex-row justify-between items-center text-xs text-center lg:text-left">
          <p>
            {content.copyright}
            <span className="block lg:inline lg:ml-4 mt-2 lg:mt-0">
              Sitio hecho por{" "}
              <a href="https://gdev.ar" target="_blank" rel="noopener" className="hover:text-white hover:underline">
                GDev
              </a>
            </span>
          </p>
          <div className="flex gap-4 mt-4 lg:mt-0">
            {content.legalLinks.map((link) => {
              const labelLower = link.label.toLowerCase();
              if (
                labelLower.includes("política") ||
                labelLower.includes("privacidad")
              ) {
                return null;
              }
              if (
                labelLower.includes("términos") ||
                labelLower.includes("condiciones")
              ) {
                return (
                  <button
                    key={link.label}
                    onClick={() => setActiveModal("terms")}
                    className="hover:text-white hover:underline"
                  >
                    {link.label}
                  </button>
                );
              }
              return (
                <Link
                  key={link.label}
                  className="hover:text-white hover:underline"
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-10 mt-4 text-center text-xs text-slate-400">
          <p>
            Web diseñada y creada por{" "}
            <a
              href="https://portfolio-santiago-chinellato.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 hover:text-white hover:underline transition-colors"
            >
              Santiago Chinellato
            </a>
          </p>
        </div>
      </footer>

      {/* Legal Modals */}
      <LegalModal
        isOpen={activeModal === "terms"}
        onClose={() => setActiveModal(null)}
        title="Términos y Condiciones"
      >
        <div className="space-y-4">
          <p className="font-semibold text-slate-900 dark:text-white">
            Gnet S.A.S
          </p>

          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <span className="font-semibold"> Condiciones Generales:</span>
              <ol className=" pl-5 space-y-2 mt-2">
                <li>
                  1.1. La presente Solicitud de Servicio, la eventual provisión del
                  Servicio de Internet (en adelante el “Servicio”) en cualquiera de
                  sus formas queda supeditada a la aceptación por parte de GNET SAS
                  (en adelante la “Empresa”), lo cual solamente se configurará
                  indefectiblemente desde el momento en que Gnet provea el
                  Servicio solicitado.
                </li>
                <li>
                  1.2. La presente Solicitud de Servicio se complementa con el
                  “Reglamento de Clientes de los Servicios de Tecnologías de la
                  Información y las Comunicaciones” y con los “Términos y
                  Condiciones generales de Gnet”, cuyo contenido manifiesta ser
                  objeto de conocimiento y aceptación por parte del Cliente,
                  encontrándose ambos publicados en el sitio web de Gnet.
                </li>
                <li>
                  1.3. El presente documento, así como los documentos adicionales
                  que complementan y regulan la prestación del Servicio de Internet,
                  se encuentran en la página web de Gnet y además de ellos, serán
                  remitidos vía correo electrónico y whatsapp al Cliente a la casilla
                  y número telefónico que especifique para tal fin. En consecuencia,
                  se consideraran que los alcances del presente documento, y de los
                  restantes documentos adicionales, se encuentran aceptados por el
                  Cliente cuando el Servicio de Internet se le haya instalado en su
                  domicilio y no efectué ningún reclamo, objeción u observación dentro
                  de los treinta (30) días de efectuada la instalación.
                </li>
                <li>
                  1.4. Gnet brinda internet a través de las siguientes formas:
                  A) ADSL; B) Simétrico; C) Punto a Punto (“Lan to Lan”); D) Punto
                  a Multipunto.
                </li>
              </ol>
            </li>

            <li>
              <span className="font-semibold">
              Condiciones Particulares del Servicio Contratado:
              </span>
              <ol className=" pl-5 space-y-2 mt-2">
                <li>
                  2.1. El Cliente solicita la contratación del Servicio para el o los
                  domicilios especificados, conforme se detalla precedentemente. Así
                  mismo, todos los datos brindados por el Cliente son los validos para
                  cursar notificaciones, comunicarse con él, etc., estando obligado a
                  informar inmediatamente a Gnet cualquier cambio en sus datos
                  personales.
                </li>
                <li>
                  2.2. La Solicitud de Servicio está condicionada y/o subordinada a la
                  prefactibilidad y factibilidad técnica y o física del Servicio
                  requerido. A tal fin, la prefactibilidad técnica será analizada por
                  Gnet y, en caso de que la misma sea positiva, Gnet procederá a realizar
                  la instalación del Servicio en el domicilio del Cliente dentro del
                  plazo de quince (15) días hábiles de firmada la Solicitud, y una vez
                  efectivamente instalado el Servicio se considerara que Gnet ha
                  aceptado la Solicitud.
                </li>
                <li>
                  2.3. En el caso que no haya prefactibilidad o factibilidad, por
                  cualquier motivo, se considerara que la Solicitud de Servicio no ha
                  sido aceptada por Gnet y, en consecuencia no se le brindara el
                  Servicio al Cliente, y esto no implicara ningún cargo para él ni para
                  la empresa.
                </li>
                <li>
                  2.4. Se deja constancia que la prefactibilidad y la factibilidad no
                  depende de la voluntad de Gnet, sino que depende de una cuestión
                  técnica (por ejemplo, falta de capacidad) o física (por ejemplo, árboles
                  o cerros que interfieren en la señal).
                </li>
                <li>
                  2.5. A modo de información se hace saber al Cliente que, de conformidad
                  con la normativa vigente, la velocidad de bajada es variable y puede
                  llegar a ser del 50 por ciento (cincuenta por ciento) de la velocidad
                  contratada.
                </li>
                <li>
                  2.6. El Servicio podrá ser interrumpido sin que esto genere ningún tipo
                  de obligación a favor del Cliente, cuando:
                  a) cortes por mantenimiento programado, previa notificación al Cliente
                  con al menos 24 (veinticuatro) horas corridas antes; b) fallas en el
                  equipamiento o infraestructura del Cliente, excepto que las fallas sean
                  responsabilidad directa de la empresa; c) realización de cualquier
                  actividad o maniobra, ya sea sobre el equipamiento o sobre la red en sí,
                  que directa o indirectamente interrumpa el Servicio; d) fuerza mayor.
                </li>
                <li>
                  2.7. Sin perjuicio del Servicio solicitado por el Cliente, Gnet podrá
                  otorgar a este Servicios secundarios o adicionales que estarán
                  relacionados con el Servicio principal; estos Servicios secundarios o
                  adicionales podrán ser habilitados, modificados, reemplazados o
                  suprimidos sin que ello implique ningún tipo de cambio para el Servicio
                  principal; así mismo, cada uno de estos Servicios adicionales podrá
                  tener un costo adicional, el cual se cobrara en la misma factura que el
                  Abono mensual del Servicio principal.
                </li>
              </ol>
            </li>

            <li>
              <span className="font-semibold">Provisión de Equipos:</span>
              <ol className="pl-5 space-y-2 mt-2">
                <li>
                  3.1. Todos los equipos y trabajos necesarios para la provisión del
                  Servicio contratado serán provistos, instalados y configurados por el
                  Empresa, estando todos ellos entregados al Cliente en carácter de
                  Comodato. Así mismo, los equipos necesarios para que el Cliente pueda
                  distribuir la señal de Internet (router, repetidores, etc.) deberán ser
                  aportados y Configurados por el Cliente, exceptuando los planes donde
                  el Cliente abona el mantenimiento de su red interna.
                </li>
              </ol>
              <p>
                Se recomienda conectar la antena y router a UPS (estabilizador) para
                protegerlos de las subas y/o bajas de tensión.
              </p>
            </li>

            <li>
              <span className="font-semibold">Plazo de Revocación:</span>
              Una vez que Gnet aceptó la Solicitud e instalo el Servicio, el Cliente
              goza de un plazo perentorio de 10 (diez) días corridos para Revocar
              la presente contratación, sin el derecho de reclamar lo abonado una vez
              emitido el comprobante de pago por el Servicio solicitado. Vencido
              dicho plazo se considerara que el Servicio funciona normalmente y
              quedará éste aceptado plenamente por el Cliente.
            </li>

            <li>
              <span className="font-semibold">Vigencia:</span>
              <ol className="list-decimal pl-5 space-y-2 mt-2">
                <li>
                  5.1. El Servicio de Internet será prestado por Gnet por tiempo
                  indeterminado, a contarse desde que el Servicio de Internet se encuentra
                  instalado y funcionando en el domicilio del Cliente.
                </li>
              </ol>
            </li>

            <li>
              <span className="font-semibold">Modificaciones:</span>
              <ol className="pl-5 space-y-2 mt-2">
                <li>
                  6.1. Gnet podrá modificar el presente contrato, para lo cual deberá
                  notificar al Cliente con una antelación no menor a 30 (treinta) días
                  corridos, y publicara las modificaciones en su sitio web. Si el
                  Cliente no estuviere de acuerdo con las modificaciones podrá rescindir el
                  contrato sin costo alguno.
                </li>
                <li>
                  6.2. En caso de que el Cliente requiera alta, baja o modificación de
                  Servicio, deberá solicitarlo oportunamente Gnet de forma personal, vía
                  telefónica o correo electrónico, o por cualquiera de los canales habilitados
                  para tal fin. Estas gestiones también podrán ser realizadas por la persona
                  autorizada por el Cliente.
                </li>
              </ol>
            </li>

            <li>
              <span className="font-semibold">Facturación, Precio y Pago</span>
              <ol className="pl-5 space-y-2 mt-2">
                <li>
                  7.1. De conformidad con la Clausula 6.1 Gnet se reserva el derecho a
                  revisar, cuando lo considere necesario, los precios del Servicio dejando
                  constancia que dicha actualización se hará tomando como base el porcentaje
                  del incremento inflacionario que publique mensualmente el INDEC. En este
                  sentido, cualquier modificación del precio deberá ser notificada al Cliente
                  con al menos 30 (treinta) días corridos, y si éste no estuviere de acuerdo con
                  el nuevo abono podrá rescindir el contrato sin costo alguno.
                </li>
                <li>
                  7.2. La factura se emitirá los primeros días de cada mes y el pago por el
                  servicio prestado por la empresa y contratado por el cliente será del 1 al 10
                  días de cada mes El precio del Servicio puede estar fijado en dólares
                  estadounidenses o en pesos argentinos.
                </li>
                <li>
                  7.3. El precio solamente incluye I.V.A., salvo que fuera especificado que es más
                  I.V.A., motivo por el cual el Cliente está obligado a abonar cualquier otro tipo de
                  impuesto, tasa, contribución o gravamen, actual o futuro, que se le aplique por
                  disposiciones municipales, provinciales o nacionales al Servicio.
                </li>
                <li>
                  7.4. Si el precio del Servicio de internet se fija en dólares estadounidenses,
                  solamente a los fines de su facturación y posterior pago se realizara la conversión
                  a moneda nacional según el cambio del dólar financiero o también denominado CCL vigente
                  al cierre de la jornada anterior de facturación.
                </li>
                <li>
                  7.5. En virtud de la Clausula 7.4, el Cliente deberá abonar la suma correspondiente a la
                  diferencia de cambio entre la cotización del dólar a la fecha de pago (diferencia por tipo
                  de cambio); En caso de que la diferencia fuera a favor del Cliente, Gnet deberá emitir la nota
                  de crédito correspondiente; El no uso de este derecho por parte de Gnet (es decir, que Gnet no cobre
                  la suma que resultare de aplicar la diferencia de cotización entre la fecha de pago y la fecha de
                  facturación) no implica renuncia de este derecho, motivo por el cual Gnet puede utilizar este derecho
                  cuando lo estime correspondiente.
                </li>
                <li>
                  7.6. Cuando el pago consista en sumas de dinero, el Cliente se obliga al pago del abono por mes adelantado
                  según los precios del Servicio requerido, que declara conocer y aceptar. La falta de uso del Servicio no lo
                  eximirá del pago de Servicio. A tal fin en las clausulas subsiguiente se reglamenta el pago del abono en sumas
                  de dinero.
                </li>
                <li>
                  7.7. El pago podrá efectuarse en las oficinas comerciales de Gnet, si estas existiesen, y en general por cualquier
                  medio de pago habilitado para tal fin.
                </li>
                <li>
                  7.8. Cuando el abono mensual se fije en pesos argentinos, o cuando no se cobre diferencias por tipos de cambio,
                  el pago deberá realizarse dentro del plazo del Primer Vencimiento indicado en la factura mediante cualquiera de
                  los canales de pago habilitados para tal fin. Vencido dicho plazo se producirá la mora automática y, en consecuencia,
                  se le cobrara a un interés equivalente al 50% (cincuenta por ciento) de la tasa de Interés para “Descubiertos en Cuenta
                  Corriente no solicitado previamente”. Del Banco de la Nación Argentina. La suma que resultare en concepto de intereses se
                  cobrara en la siguiente factura, u en la que correspondiera. Por otro lado cuando el abono mensual se fije en dólares
                  estadounidense la tasa de interés que se aplicara será de 12% (doce por ciento) anual.
                </li>
                <li>
                  7.9. Transcurrido 5 (cinco) dias desde la falta de pago total o parcial desde el primer vencimiento de una o más facturas,
                  Gnet está habilitado para suspender el Servicio de Internet por falta de pago hasta la efectiva e integra cancelación de la deuda
                  vencida. Cuando el Servicio fuera suspendido por falta de pago la empresa estará facultada a facturar una penalidad en concepto de
                  “cargo de reconexión” la cual se establece en un 15% (quince por ciento) de la última factura abonada por el Cliente.
                </li>
                <li>
                  7.10. A partir de los 5 (cinco) días corridos posteriores a la fecha del segundo vencimiento de la primera factura impaga total o
                  parcialmente, Gnet quedara habilitado a dar de baja el Servicio.
                </li>
                <li>
                  7.11. Cuando el Servicio sea dado de baja ya sea por falta de pago o por cualquier motivo Gnet, previa intimación, estará habilitada para
                  informar la condición de moroso del Cliente, junto al importe adeudado, a los registros de base de datos financieros y centrales de
                  riesgo crediticio. Ello sin perjuicio de las acciones de cobro que le pudieran corresponder a Gnet.
                </li>
                <li>
                  7.12. A todo evento, se deja especificado que se emitirán comprobantes por todos los Servicios que el Cliente tenga contratados, en cuyos
                  documentos estarán individualizados los costos de cada Servicio. Así mismo, en caso de pago parcial de la factura, el monto efectuado
                  por el Cliente se imputara primero el Servicio que tenga un abono más caro, el remanente al que le siga en orden, y así sucesivamente;
                  si los abonos tuvieran el mismo valor, se imputara a cualquiera de ellos a criterio de Gnet. Esto implica que, si el Cliente abona
                  parcialmente una factura, el Servicio puede ser suspendido por falta de pago en un domicilio determinado.
                </li>
                <li>
                  7.13. Cuando Gnet debiera reintegrar sumas de dinero al Cliente, ya sea por que el Cliente pago en exceso y no desea conservar el saldo
                  para futuros abonos o porque abono el mes completo y solicito la baja de Servicio luego de emitirse el comprobante de pago del corriente
                  mes, el reintegro se realizaras mediante transferencia la cuenta bancaria del Servicio de internet, en estos casos, Gnet cobrara al Cliente
                  el 10% (diez por ciento) del importe a reintegrar del concepto “gastos administrativos”, descontando el mismo del monto a transferir.
                </li>
              </ol>

              <p>
                Usted tiene derecho a reclamar una indemnización si le facturamos sumas o conceptos indebidos o reclamamos el pago de facturas ya
                abonadas, LEY N° 24.240.
              </p>
            </li>

            <li>
              <span className="font-semibold">Bonificaciones:</span>
              <ol className="pl-5 space-y-2 mt-2">
                <li>
                  8.1. Gnet se reserva el derecho a bonificar, a su exclusivo criterio cualquier tipo de gasto de instalación e inclusive podrá bonificar el
                  abono mensual, sin que esto genere ningún otro derecho para el Cliente. En caso de que se bonifique el abono mensual, dicha bonificación
                  podrá ser por tiempo limitado u hasta la finalización del presente contrato, reservándose Gnet el derecho de retirar la bonificación cuando lo
                  desee, sin que sea necesaria el expresión de ningún tipo de causa o justificativo, en cuyo caso deberá notificar al Cliente la voluntad de retirar
                  la bonificación por medio fehaciente y con una anticipación no menor a 30 (treinta) días corridos.
                </li>
                <li>
                  8.2. Cuando se bonificare de forma total o parcial el costo de instalación, el Cliente se obliga a abonar el costo total de la instalación si
                  diera de baja el Servicio de Internet antes de cumplido el 1(un) año de la aceptación de la solitud de Servicio por parte de Gnet (es decir,
                  antes de cumplido el año desde que el Servicio de internet fue efectivamente instalado), o si el Servicio de internet fuera dado de baja por falta de pago.
                </li>
                <li>
                  8.3. Así mismo, si el Cliente diera de baja el Servicio de internet antes de cumplido 1(un) año desde la instalación, o si el mismo fuera dado de baja
                  por falta de paga antes de dicho tiempo, el Cliente deberá abonar en concepto de “cargo por baja anticipada” el importe equivalente al último Abono del
                  Servicio de Internet facturado.
                </li>
              </ol>
            </li>

            <li>
              <span className="font-semibold">Uso del Servicio de Internet:</span>
              <ol className="pl-5 space-y-2 mt-2">
                <li>
                  9.1. El Cliente se obliga a usar el Servicio de Internet para uso personal y propio en caso de requerir el Servicio para recreación o cualquier otro fin
                  distinto al comercial o profesional; en caso de que sea trate de un Servicio requerido para la realización de actividades comerciales o profesionales,
                  el Cliente se obliga a utilizarlo para tal fin. Así, queda expresamente prohibida su comercialización ni revender ni dar un uso distinto al previsto,
                  incluyendo esto la prohibición de instalar servidores y software que implique una transferencia de internet o un uso excesivo, inusual e inapropiado del
                  trafico de internet. En idéntico sentido, queda prohibido todo uso de internet de manera que incurra en algún accionar ilícito, ilegitimo, abusivo, contrario
                  a la moral y a las buenas costumbres, en especial cualquier uso que sea fraudulento, engañoso y/o que pudiera provocar un daño temporal o permanente, a la
                  red o al patrimonio de la empresa.
                </li>
                <li>
                  9.2. En caso de un uso distinto en la clausula 9.1 el Cliente será responsable por cualquier tipo de daño resarcible, sea directo o indirecto, actual o futuro,
                  que se produzca como consecuencia directa o indirecta de su accionar. Así mismo, la empresa estará facultada para rescindir el contrato por exclusiva culpa
                  del Cliente, siendo este deudor de todos los gastos administrativos que genere la recisión contractual, como así también todos los daños causados por él.
                </li>
                <li>
                  9.3. El Cliente declara conocer y aceptar que la empresa se encuentra habilitada para implementar filtros que impidan las prácticas de conductas contrarias a lo
                  estipulado en el presente Contrato.
                </li>
                <li>
                  9.4. El Cliente deberá informar inmediatamente a Gnet de cualquier tipo de problema que existiere con el Servicio, estando habilitado para tal fin los números de teléfonos
                  que Gnet indique en su sitio web o bien pudiendo hacer el reclamo en forma personal, vía telefonía, o por correo electrónico.
                </li>
                <li>
                  9.5. El Cliente declara que conoce todas las medidas de seguridad que deben tenerse en cuenta al momento de utilizar el Servicio y que, además, al conectar varios
                  aparatos (celulares, impresoras, computadoras, etc.) al Servicio de internet de gnet podría tener daños directo e indirecto derivados del uso del Servicio de internet (virus,
                  filtración de información, etc.) por tal motivo, el Cliente exime a Gnet de cualquier tipo de daño que pudiera sufrir con motivo y/o en ocasión del uso del Servicio de internet.
                </li>
                <li>
                  9.6. Para que el Cliente pudiera utilizar satisfactoriamente el Servicio se obliga a mantener en óptimas condiciones de funcionamiento y configuración el soporte
                  informático necesario para acceder al Servicio, tratase de equipos propios o de Gnet que fueron entregados en comodato.
                </li>
                <li>
                  9.7. Gnet se reserva el derecho de dar de baja el Servicio cuando el Cliente incurra en prácticas que afecten a los intereses de la empresa o del Estado, que provoquen un daño directo o indirecto e ilegítimo a terceros, o que sean contrarios a la ley, a las buenas costumbres y a la moral.
                </li>
                <li>
                  9.8. Cualquier tipo de violación por parte del Cliente a sus obligaciones con respecto al Uso del Servicio habilitara a Gnet a suspender y/o dar de baja el Servicio,
                  sin que ello genere ningún tipo de indemnización o derecho a favor del Cliente.
                </li>
              </ol>
            </li>

            <li>
              <span className="font-semibold">Servicio técnico:</span>
              <ol className="pl-5 space-y-2 mt-2">
                <li>
                  10.1. El Cliente expresamente autoriza a personal de Gnet a ingresar a su domicilio para que, en caso de ser necesario y factible, realice la instalación del Servicio,
                  o bien un relevamiento preliminar del mismo.
                </li>
                <li>
                  10.2. Así mismo, se obliga a permitir el ingreso a personal de Gnet al sitio donde se encuentre instalado el Servicio, a loa fines de que Gnet pueda brindar el Servicio
                  Técnico Básico, ya sea en el equipo previsto por la empresa o en los equipos del Cliente que estén conectados al Servicio (computadoras, impresoras, etc.).
                  A tal fin, el Cliente se compromete a estar presente en todo momento que intervenga el Servicio técnico de Gnet, y Comprende que Gnet no se hace responsable por ningún tipo
                  de daño interno, perdida de información o cualquier otro tipo de desperfecto que sufra el equipamiento suyo que debe ser intervenido por personal del Servicio técnico.
                </li>
                <li>
                  10.3. El Cliente podrá optar por contratar un Servicio adicional, brindando por Gnet o por un tercero, para recibir un Soporte Técnico Avanzado (mantenimiento en su red interna),
                  en caso que su plan solo incluya un Servicio técnico básico.
                </li>
                <li>
                  10.4. Ante caso de pedido de Servicio técnico a domicilio por inconvenientes en la prestación del Servicio cuyo origen no sea atribuible a Gnet, el Cliente se compromete
                  a abonar el cargo vigente en dicho momento, más el costo de los materiales, de corresponder.
                </li>
                <li>
                  10.5. El Cliente declara que previamente a solicitar la provisión del Servicio de internet, como de solicitar la asistencia del Servicio técnico, ha solicitado todas las autorizaciones,
                  permisos y /o habilitaciones que le puedan llegar a ser requeridas en razón de las características del inmueble (por ejemplo, el consorcio de un edificio). Por este motivo,
                  el Cliente exime de responsabilidad total a Gnet por cualquier tipo de multa o sanción que la autoridad de aplicación pudiera imponerle como consecuencia de la realización no autorizada de trabajos efectuados por personal de Gnet.
                </li>
              </ol>
            </li>

            <li>
              <span className="font-semibold">Rescisión:</span>
              <ol className="pl-5 space-y-2 mt-2">
                <li>
                  11.1. Gnet podrá rescindir el contrato en cualquier momento y, en consecuencia, se dejara sin efecto la prestación del Servicio de internet, no siendo la necesaria de causa alguna,
                  para lo cual solamente deberá preavisar con una anticipación no menor a 30 (treinta) días corridos.
                </li>
                <li>
                  11.2. El Cliente podrá rescindir en cualquier momento el contrato de provisión del Servicio de internet, pero si lo rescinde antes de cumplidos 12 (doce) meses desde la firma del contrato,
                  deberá abonar el costo de instalación del Servicio de internet, en caso de que el mismo haya sido bonificado en forma parcial o total oportunamente.
                </li>
                <li>
                  11.3. Cuando el Cliente solicite la baja del Servicio (rescinda el contrato), Gnet efectivizara la baja dentro de las 72 (setenta y dos) horas hábiles de recibida la solicitud,
                  la cual puede ser formulada en forma verbal, telefónica o vía email.
                </li>
              </ol>
            </li>

            <li>
              <span className="font-semibold">Comodato de los equipos:</span>
              <ol className="pl-5 space-y-2 mt-2">
                <li>
                  12.1. La empresa entrega gratuitamente al Cliente, y este acepta sin ningún tipo de reserva, en carácter de comodato en los términos del Artículo 1.533 y siguientes del Código Civil y Comercial de la Nación, el equipo detallado en el Anexo “Comodato de Equipos”, conforme al Servicio contratado, a efecto de que el Cliente pueda acceder al Servicio de internet.
                </li>
                <li>
                  12.2. El Cliente recibe por parte de la empresa los equipos detallados en la clausula precedente en perfecto estado de conservación y funcionamiento, pudiendo ser solamente destinado a permitir el acceso a la prestación del Servicio.
                </li>
                <li>
                  12.3. El Cliente se compromete a mantener en perfecto estado de conservación el equipo entregado, a no transferirlo a terceros, y a no conectarlo a prestadoras de acceso a internet distintas de Gnet, estando expresamente prohibido también darle al equipo un uso distinto al aquí previsto.
                </li>
                <li>
                  12.4. El Cliente es responsable por el mantenimiento del equipo y, en consecuencia, es responsable por cualquier daño, pérdida, deterioro o perjuicio que sufra el equipo. Así mismo, tiene prohibido realizar cualquier tipo de manipulación que pudiera alterar, suprimir o modificar la configuración de los equipos y, por tal motivo, en caso de que lo haga es responsable de los costos que pudiera llegar a ocasionar su accionar.
                </li>
                <li>
                  12.5. Cuando el contrato sea rescindido, el Cliente deberá restituir y/o poner a disposición de la empresa el equipo dentro de las 72 (setenta y dos) horas de efectuada la requisitoria, bajo apercibimiento de ser responsable por el costo total de los equipos, facturado al precio de lista vigente al día de la requisitoria. Así mismo, en caso de que los equipos sean restituidos en un estado de deterioro anormal, el Cliente es responsable por los daños causados.
                </li>
              </ol>
            </li>

            <li>
              <span className="font-semibold">Responsabilidad:</span>
              <ol className="pl-5 space-y-2 mt-2">
                <li>
                  13.1. Gnet no será responsable de ningún tipo de pérdida o daño directo o indirecto, mediato o inmediato, que se le produzca al Cliente con motivo y/o en ocasión del uso del Servicio de internet, abarcando esto la interrupción de actividades comerciales o profesionales, lucro cesante, perdida de chances, y/o cualquier otro tipo de daño que en general recaiga sobre datos, software o hardware.
                </li>
                <li>
                  13.2. Así mismo, el Cliente se compromete a realizar un respaldo (“backup”) de su información antes de permitir que el soporte técnico de Gnet efectué cualquier tarea en el equipamiento propio del Cliente; por tal motivo Gnet no es responsable de ningún tipo de pérdida de información que sufra el Cliente cuando el soporte técnico tome contacto con el equipamiento, como así tampoco es responsable por daños causados al equipo, excepto que medie dolo o culpa grave.
                </li>
                <li>
                  13.3. El Cliente es responsable de cualquier solicitud de gestión que sea remitida desde su casilla de correo, siendo el único responsable de la seguridad e integridad de ésta.
                </li>
              </ol>
            </li>

            <li>
              <span className="font-semibold">Comunicación entre Gnet y el Cliente:</span>
              <ol className="pl-5 space-y-2 mt-2">
                <li>
                  14.1. La emisión y pago de factura serán remitidas al Cliente al correo electrónico especificado, pidiendo también remitírsela al correo electrónico alternativo o vía telefónico a los fines de garantizar una eficaz recepción de la misma.
                </li>
                <li>
                  14.2. Así mismo, Gnet pondrá en conocimiento al Cliente cualquier tipo de información mediante la remisión de correo electrónico o vía telefónica a las casillas o números especificados por el Cliente. En idéntico sentido, el Cliente expresamente autoriza a Gnet a enviar promociones, notificaciones e información.
                </li>
                <li>
                  14.3. El Cliente podrá realizar cualquier tipo de gestión de forma personal, por teléfono (previa verificación de identidad) y por correo electrónico desde cualquiera de las casillas denunciadas por el Cliente. Así mismo, la persona autorizada también podrá efectuar cualquier tipo de gestión, incluyendo la baja del Servicio.
                </li>
              </ol>
            </li>
          </ol>
        </div>
      </LegalModal>

      {/* <LegalModal
        isOpen={activeModal === "privacy"}
        onClose={() => setActiveModal(null)}
        title="Política de Privacidad"
      >
        <p>
          [Texto de Política de Privacidad pendiente de redacción. Se
          actualizará próximamente.]
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </LegalModal> */}
    </>
  );
}
