import { Footer } from "@/components/layout/footer";
import { getSiteContent } from "@/lib/content";
import { Cotizador } from "@/components/sections/cotizador/cotizador";

import { Metadata } from "next";
import { mapSeoConfig } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return mapSeoConfig({
    title: "Cotizá tus cámaras de seguridad | Gnet Bariloche",
    description:
      "Armá el presupuesto de tus cámaras de seguridad en 2 minutos: inalámbricas, WiFi o cableadas, con instalación incluida en Bariloche.",
    keywords: ["cotizador", "cámaras de seguridad", "presupuesto", "instalación", "bariloche"],
  });
}

export default async function Page() {
  const content = await getSiteContent();
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Cotizador />
      <Footer content={content.footer} />
    </main>
  );
}
