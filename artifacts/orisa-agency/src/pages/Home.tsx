import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesBar } from "@/components/ServicesBar";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Statistics } from "@/components/Statistics";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#111111] min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <Hero />
      <ServicesBar />
      <Services />
      <About />
      <Portfolio />
      <Statistics />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
