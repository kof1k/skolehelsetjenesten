import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppointmentForm } from "@/components/appointment-form";
import { Calendar, Clock, Shield } from "lucide-react";

export default function Booking() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Bestill time
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Velg dato og tidspunkt som passer deg. Vi bekrefter timen så snart som mulig.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              <div className="text-center p-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-1">Velg dato</h3>
                <p className="text-sm text-muted-foreground">Man-Fre, i skoletiden</p>
              </div>
              <div className="text-center p-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-1">Velg tid</h3>
                <p className="text-sm text-muted-foreground">09:00 - 14:00</p>
              </div>
              <div className="text-center p-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-1">Konfidensielt</h3>
                <p className="text-sm text-muted-foreground">Alt er trygt og privat</p>
              </div>
            </div>

            <AppointmentForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
