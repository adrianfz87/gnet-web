import { Footer } from "@/components/layout/footer";
import { getSiteContent } from "@/lib/content";
import { EmpresasPage } from "@/components/sections/empresas/empresas-page";

import { Metadata } from "next";
import { mapSeoConfig } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return mapSeoConfig({
    title: "Gnet Empresas | Redes, cámaras y servidores para tu empresa",
    description:
      "Consultoría, instalación y mantenimiento integral de redes, WiFi, cámaras y servidores para empresas en Bariloche y todo el país.",
    keywords: [
      "mantenimiento de redes",
      "consultoría IT",
      "empresas",
      "cámaras",
      "servidores",
      "bariloche",
      "minería",
    ],
  });
}

export default async function Page() {
  const content = await getSiteContent();
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden">
      <EmpresasPage />
      <Footer content={content.footer} />
    </main>
  );
}
