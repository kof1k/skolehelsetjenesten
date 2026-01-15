import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, HeartPulse, ShieldCheck, Stethoscope, MessageCircle, Users } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Psykisk helse",
    description: "Vi er her for å snakke om stress, angst, depresjon eller andre utfordringer du måtte ha.",
  },
  {
    icon: HeartPulse,
    title: "Fysisk helse",
    description: "Hjelp med fysiske plager, hodepine, søvnproblemer eller andre helseutfordringer.",
  },
  {
    icon: ShieldCheck,
    title: "Seksualitet & Testing",
    description: "Trygg veiledning om seksualitet, prevensjon og testing for kjønnssykdommer.",
  },
  {
    icon: Stethoscope,
    title: "Helseundersøkelser",
    description: "Regelmessige helseundersøkelser og oppfølging av din generelle helse.",
  },
  {
    icon: MessageCircle,
    title: "Samtaler",
    description: "Fortrolige samtaler om det som opptar deg. Alt er konfidensielt.",
  },
  {
    icon: Users,
    title: "Rådgivning",
    description: "Veiledning og støtte i vanskelige situasjoner, både på skolen og hjemme.",
  },
];

export function ServiceCards() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Hva vi kan hjelpe deg med
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Skolehelsetjenesten tilbyr et bredt spekter av tjenester for å støtte din helse og trivsel.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover-elevate border" data-testid={`card-service-${index}`}>
              <CardHeader className="pb-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
