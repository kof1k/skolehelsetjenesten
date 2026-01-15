import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ServiceCards } from "@/components/service-cards";
import { NurseCards } from "@/components/nurse-cards";
import { ContactSection } from "@/components/contact-section";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Våre tjenester
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Skolehelsetjenesten tilbyr et bredt spekter av tjenester for å støtte din helse og trivsel. Alt er gratis og konfidensielt.
            </p>
            <Link href="/bestill-time">
              <Button size="lg" className="gap-2" data-testid="button-services-book">
                <Calendar className="h-5 w-5" />
                Book time nå
              </Button>
            </Link>
          </div>
        </section>
        <ServiceCards />
        <NurseCards />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
