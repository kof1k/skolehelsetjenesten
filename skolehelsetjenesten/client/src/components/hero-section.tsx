import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Skolehelsetjenesten
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground leading-tight">
              Skolehelsetjenesten
              <br />
              <span className="text-primary">Hamar katedralskole</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Du kan snakke med oss om alt som har med din helse å gjøre: psykisk helse, 
              fysisk helse, seksualitet og teste deg for kjønnssykdommer. Vi er her for deg.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/bestill-time">
                <Button size="lg" className="gap-2" data-testid="button-hero-book">
                  <Calendar className="h-5 w-5" />
                  Book time
                </Button>
              </Link>
              <Link href="/faq">
                <Button size="lg" variant="outline" className="gap-2" data-testid="button-hero-learn-more">
                  Lær mer
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Trygt og fortrolig</h3>
                <p className="text-muted-foreground">Alt du forteller oss er konfidensielt</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
