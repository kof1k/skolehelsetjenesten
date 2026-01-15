import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Phone } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Hvor er vi?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Du finner oss i 3. etasje i fløy 1 ved Elevtjenesten.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center border" data-testid="card-location">
            <CardHeader className="pb-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Lokasjon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                3. etasje, fløy 1
                <br />
                Ved Elevtjenesten
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border" data-testid="card-hours">
            <CardHeader className="pb-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Åpningstider</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Man-Tor: 09-14
                <br />
                Ons: 09-13
                <br />
                Fre: 09-11
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border" data-testid="card-contact">
            <CardHeader className="pb-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Kontakt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Marianne: 902 69 665
                <br />
                Hanne: 912 48 594
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
