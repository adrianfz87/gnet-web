import { Footer } from "@/components/layout/footer";
import { HeroSecurity } from "@/components/sections/security/hero-security";
import { BlinkSecurity } from "@/components/sections/security/blink-security";
import { SolutionsTabs } from "@/components/sections/security/solutions-tabs";
import { ServicesGridSecurity } from "@/components/sections/security/services-grid-security";
import { GallerySecurity } from "@/components/sections/security/gallery-security";
import { ComparisonTableSecurity } from "@/components/sections/security/comparison-table-security";
import { getSiteContent } from "@/lib/content";

import { Metadata } from "next";
import { mapSeoConfig } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return mapSeoConfig(content.security.seo);
}

export default async function SecurityPage() {
  const content = await getSiteContent();
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 flex flex-col font-display transition-colors duration-300">
      <HeroSecurity content={content.security.hero} />
      <BlinkSecurity />
      <SolutionsTabs content={content.security.solutions} />
      <ServicesGridSecurity content={content.security.services} />
      {/* <GallerySecurity content={content.security.gallery} /> */}
      <ComparisonTableSecurity content={content.security.comparison} />
      <Footer content={content.footer} />
    </main>
  );
}
