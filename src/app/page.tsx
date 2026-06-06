import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import TextMarquee from "@/components/ui/text-marque";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { PartnersSection } from "@/components/PartnersSection";
import { SelectedWork } from "@/components/SelectedWork";
import { FounderSection } from "@/components/FounderSection";
import { Process } from "@/components/Process";
import { TestimonialShowcase } from "@/components/TestimonialShowcase";
import { NetworkShowcase } from "@/components/NetworkShowcase";
import { Connect } from "@/components/Connect";
import { Footer } from "@/components/Footer";
import { LenisProvider } from "@/components/LenisProvider";

export default function Home() {
  return (
    <LenisProvider>
      <main className="bg-[#0C0C0C] min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground">
        <Navbar />
        <Hero />
        <div className='py-10 md:py-20 flex flex-col gap-4 overflow-hidden'>
          <TextMarquee
            delay={500}
            baseVelocity={-3}
            clasname='font-bold tracking-[-0.07em] leading-[90%] text-white/10 uppercase'
          >
            ClariSolve TECH
          </TextMarquee>
          <TextMarquee
            delay={500}
            baseVelocity={3}
            clasname='font-bold tracking-[-0.07em] leading-[90%] text-white/10 uppercase'
          >
            Technology Excellence 2026
          </TextMarquee>
        </div>
        <ServicesShowcase />
        <PartnersSection />
        <FounderSection />
        <SelectedWork />
        <Process />
        <TestimonialShowcase />
        <NetworkShowcase />
        <Connect />
        <Footer />
      </main>
    </LenisProvider>
  );
}
