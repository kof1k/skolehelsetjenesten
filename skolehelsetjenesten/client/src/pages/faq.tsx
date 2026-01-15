import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FAQSection } from "@/components/faq-section";
import { ResourcesSection } from "@/components/resources-section";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { HelpCircle, Calendar } from "lucide-react";

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/30">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              FAQ & Ressurser
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Finn svar på vanlige spørsmål og utforsk nyttige ressurser for din helse og trivsel.
            </p>
            <Link href="/bestill-time">
              <Button size="lg" className="gap-2" data-testid="button-faq-book">
                <Calendar className="h-5 w-5" />
                Trenger du hjelp? Book time
              </Button>
            </Link>
          </div>
        </section>
        <FAQSection />
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
}
