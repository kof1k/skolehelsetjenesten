import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Key, 
  Lock, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Smartphone, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react";

const passwordTips = [
  {
    icon: Key,
    title: "Bruk lange passord",
    description: "Et godt passord bør være minst 12 tegn langt. Jo lengre, jo bedre. Vurder å bruke en passfrase med flere ord.",
    good: "MinHundLikerÅLøpePåStranda2024!",
    bad: "hund123",
  },
  {
    icon: RefreshCw,
    title: "Varier tegnene",
    description: "Kombiner store og små bokstaver, tall og spesialtegn for å gjøre passordet sterkere.",
    good: "Sk0le!Helse#2024",
    bad: "skolehelse",
  },
  {
    icon: Lock,
    title: "Unikt passord for hver tjeneste",
    description: "Bruk aldri samme passord på flere tjenester. Hvis ett passord lekker, forblir de andre trygge.",
    good: "Forskjellig passord for jobb, skole og privat",
    bad: "Samme passord overalt",
  },
  {
    icon: Smartphone,
    title: "Bruk totrinnsverifisering",
    description: "Aktiver totrinnsverifisering (2FA) der det er mulig. Dette gir et ekstra lag med sikkerhet.",
    good: "Aktiver SMS eller app-basert 2FA",
    bad: "Stol kun på passord",
  },
];

const commonMistakes = [
  "Bruke personlig informasjon (navn, fødselsdato)",
  "Enkle mønstre som '123456' eller 'qwerty'",
  "Skrive ned passord på lapper ved skjermen",
  "Dele passord med andre",
  "Bruke samme passord i mange år",
  "Bruke ord fra ordboken uten endringer",
];

const windowsServerTips = [
  {
    title: "Active Directory-passordpolicy",
    description: "Windows Server krever passord som oppfyller kompleksitetskrav: store og små bokstaver, tall og spesialtegn.",
  },
  {
    title: "Passordutløp",
    description: "Passord må endres regelmessig i henhold til organisasjonens policy (typisk 90 dager).",
  },
  {
    title: "Kontolåsing",
    description: "Etter flere mislykkede påloggingsforsøk låses kontoen midlertidig for å forhindre innbruddsforsøk.",
  },
  {
    title: "Passordhistorikk",
    description: "Systemet husker gamle passord slik at du ikke kan gjenbruke de siste passordene du har brukt.",
  },
];

export default function PasswordStrategy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                God passordstrategi
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Lær hvordan du lager sterke passord og beskytter dine kontoer. 
                Denne veiledningen er viktig for alle som bruker skolens nettverk og systemer.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">
              Tips for sterke passord
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {passwordTips.map((tip, index) => (
                <Card key={index} className="border" data-testid={`card-tip-${index}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <tip.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{tip.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 p-2 rounded-lg bg-green-50 dark:bg-green-950/30">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-sm text-green-700 dark:text-green-300 font-medium">Bra: </span>
                          <span className="text-sm text-green-600 dark:text-green-400">{tip.good}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-2 rounded-lg bg-red-50 dark:bg-red-950/30">
                        <XCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-sm text-red-700 dark:text-red-300 font-medium">Dårlig: </span>
                          <span className="text-sm text-red-600 dark:text-red-400">{tip.bad}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                    Vanlige feil å unngå
                  </h2>
                  <p className="text-muted-foreground">Disse feilene gjør passordet ditt sårbart</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {commonMistakes.map((mistake, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-4 rounded-lg bg-card border"
                    data-testid={`mistake-${index}`}
                  >
                    <XCircle className="h-5 w-5 text-destructive shrink-0" />
                    <span className="text-foreground">{mistake}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                    Windows Server passordpolicy
                  </h2>
                  <p className="text-muted-foreground">Viktig informasjon for skolens nettverk</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {windowsServerTips.map((tip, index) => (
                  <Card key={index} className="border" data-testid={`ws-tip-${index}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">Windows Server</Badge>
                        {tip.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Husk: Et sterkt passord er ditt første forsvar
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-6">
              Ta deg tid til å lage gode passord og beskytt din digitale identitet. 
              Hvis du har spørsmål om IT-sikkerhet, kontakt IT-avdelingen.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <span>Aldri del passord</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <span>Bruk passordhåndterer</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                <span>Bytt passord regelmessig</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
