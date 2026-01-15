import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Phone, Heart, Brain, Shield, BookOpen } from "lucide-react";

const resources = [
  {
    icon: Phone,
    title: "Mental Helses hjelpetelefon",
    description: "Døgnåpen hjelpetelefon for alle som trenger noen å snakke med.",
    phone: "116 123",
    link: "https://www.mentalhelse.no/fa-hjelp/hjelpetelefonen",
  },
  {
    icon: Heart,
    title: "Telefon for livet",
    description: "Støtte for mennesker i krise eller med selvmordstanker.",
    link: "https://www.telefonforliv.no/",
  },
  {
    icon: Brain,
    title: "Ung.no",
    description: "Offentlig informasjonskanal for ungdom med informasjon om alt fra kropp til rettigheter.",
    link: "https://www.ung.no/",
  },
  {
    icon: Shield,
    title: "Sex og samfunn",
    description: "Gratis og anonym veiledning om seksualitet, prevensjon og testing.",
    link: "https://www.sexogsamfunn.no/",
  },
  {
    icon: BookOpen,
    title: "Helsenorge",
    description: "Norges offisielle helseinformasjonsside med pålitelig informasjon om helse.",
    link: "https://www.helsenorge.no/",
  },
];

export function ResourcesSection() {
  return (
    <section className="py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Nyttige ressurser
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Her er noen nyttige nettsider og telefonnumre som kan hjelpe deg.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {resources.map((resource, index) => (
            <Card key={index} className="group hover-elevate border" data-testid={`card-resource-${index}`}>
              <CardHeader className="pb-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <resource.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">{resource.description}</p>
                {resource.phone && (
                  <a 
                    href={`tel:${resource.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    {resource.phone}
                  </a>
                )}
                <div>
                  <a href={resource.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="gap-2">
                      Besøk nettside
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
