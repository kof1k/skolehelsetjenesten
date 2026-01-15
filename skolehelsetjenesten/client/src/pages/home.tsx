import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { ServiceCards } from "@/components/service-cards";
import { NurseCards } from "@/components/nurse-cards";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServiceCards />
        <NurseCards />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
