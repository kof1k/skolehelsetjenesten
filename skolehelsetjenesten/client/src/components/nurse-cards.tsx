import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Clock, MessageCircle } from "lucide-react";

const nurses = [
  {
    name: "Marianne Buvik",
    role: "Helsesykepleier",
    phone: "902 69 665",
    initials: "MB",
    hours: [
      { day: "Mandag", time: "09-14" },
      { day: "Tirsdag", time: "09-14" },
      { day: "Onsdag", time: "09-13" },
      { day: "Torsdag", time: "09-14" },
      { day: "Fredag", time: "09-11" },
    ],
  },
  {
    name: "Hanne Krøtøy",
    role: "Helsesykepleier",
    phone: "912 48 594",
    initials: "HK",
    hours: [
      { day: "Mandag", time: "09-14" },
      { day: "Tirsdag", time: "09-14" },
      { day: "Onsdag", time: "09-13" },
      { day: "Torsdag", time: "09-14" },
      { day: "Fredag", time: "09-11" },
    ],
  },
];

export function NurseCards() {
  return (
    <section className="py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Vi er her for deg
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ønsker du å bestille time? Send en SMS med navn og fødselsdato til mobil.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {nurses.map((nurse, index) => (
            <Card key={index} className="border" data-testid={`card-nurse-${index}`}>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-medium">
                      {nurse.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{nurse.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">{nurse.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Ønsker du å bestille time, sender du en SMS med navn og fødselsdato til mobil:
                    </p>
                    <a 
                      href={`tel:${nurse.phone.replace(/\s/g, '')}`} 
                      className="text-primary font-medium hover:underline flex items-center gap-1 mt-1"
                      data-testid={`link-phone-${index}`}
                    >
                      <Phone className="h-4 w-4" />
                      {nurse.phone}
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    Kontortid
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {nurse.hours.map((schedule, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{schedule.day}</span>
                        <span>kl. {schedule.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
