# Quick Start Guide - Skolehelsetjenesten

Rask referanseguide for de vanligste oppgavene.

---

## 🚀 Kjapp start (Utvikling)

### 1. Installasjon og setup

```bash
# Klon prosjektet
git clone <repository-url>
cd skolehelsetjenesten

# Installer dependencies
npm install

# Opprett .env fil
cp .env.example .env

# Fyll inn DATABASE_URL og SESSION_SECRET
nano .env

# Starta dev-server
npm run dev
```

**Resultat**: Server kjører på `http://localhost:5000`

### 2. Tilgjengelighet

- Frontend dev-server: `http://localhost:5173` (Vite)
- Backend API: `http://localhost:5000`
- Admin-panel: `http://localhost:5000/admin`

---

## 📅 Timebestilling - Elev

### Trinn-for-trinn

```
1. Gå til http://skolehelsetjenesten.local
2. Klikk "Bestill time" button
3. Fyll inn:
   - Navn (ditt fulle navn)
   - Klasse (Vg1, Vg2, Vg3, eller Påbygg)
   - Dato (velg fremtidig dato)
   - Tid (09:00-14:00, 30min intervals)
   - Årsak (Konsultasjon, Helsehjelp, eller Rådgivning)
   - Noter (valgfritt, maks 500 tegn)
4. Klikk "Bestill time"
5. Se bekreftelse
```

**Kontakt hvis det er problemer**: 902 69 665 eller 912 48 594

---

## 👨‍⚕️ Admin panel - Helsesykepleier

### Innlogging

```
1. Gå til http://skolehelsetjenesten.local/logg-inn
2. Brukernavn: marianne eller hanne
3. Passord: [oppgis separat]
4. Klikk "Logg inn"
```

### Se alle timer

```
1. Du er nå på admin-panelet
2. Se tabell med alle timebestillinger
3. Sortering: Etter dato (nyeste først)
```

### Håndter timer

```
Endre status:
1. Finn timen i tabellen
2. Klikk status-dropdown
3. Velg: Pending → Confirmed → Completed (eller Cancelled)
4. Lagres automatisk

Slette timer:
1. Klikk delete-knappen (🗑️)
2. Bekreft sletting
3. Timer fjernes

Søk:
1. Bruk søkefelt øverst
2. Skriv navn på elev
3. Tabellen oppdateres med treff
```

### Logg ut

```
Klikk "Logg ut" knappen for å avslutte sesjonen
```

---

## 💻 Utvikling - Vanlige oppgaver

### Legge til ny side

```typescript
// 1. Opprett komponent: client/src/pages/mynewpage.tsx

export default function MyNewPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Min nye side</h1>
      {/* Innhold */}
    </div>
  );
}

// 2. Legg til route i App.tsx
import MyNewPage from "./pages/mynewpage";

// I Router-komponenten:
<Route path="/mySide" component={MyNewPage} />

// 3. Legg til link i header
// client/src/components/header.tsx
{ label: 'Min side', href: '/mySide' }
```

### Legge til ny komponent

```typescript
// client/src/components/my-component.tsx

import { Button } from "@/components/ui/button";

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="font-bold">{title}</h2>
      <Button onClick={onAction}>Action</Button>
    </div>
  );
}
```

### Legge til API-endepunkt

```typescript
// server/routes.ts

app.post("/api/myEndpoint", async (req, res) => {
  try {
    const { data } = req.body;
    
    // Validering
    if (!data) {
      return res.status(400).json({ message: "Data er obligatorisk" });
    }
    
    // Logikk
    const result = await storage.doSomething(data);
    
    // Respons
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Feil på server" });
  }
});
```

### Kalle API fra frontend

```typescript
import { useToast } from "@/hooks/use-toast";

export function MyComponent() {
  const { toast } = useToast();

  const handleFetch = async () => {
    try {
      const response = await fetch("/api/myEndpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: "example" })
      });

      if (!response.ok) throw new Error("API-feil");

      const result = await response.json();
      toast({ title: "Suksess", description: "Operasjon fullført" });
      
    } catch (error) {
      toast({ 
        title: "Feil", 
        description: "Noe gikk galt",
        variant: "destructive"
      });
    }
  };

  return <button onClick={handleFetch}>Hent data</button>;
}
```

### Legge til formular med validering

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

// 1. Definer schema
const mySchema = z.object({
  email: z.string().email("Ugyldig email"),
  name: z.string().min(2, "Navn må ha minst 2 tegn"),
});

type MyFormData = z.infer<typeof mySchema>;

// 2. Lag komponent
export function MyForm() {
  const form = useForm<MyFormData>({
    resolver: zodResolver(mySchema),
  });

  const onSubmit = async (data: MyFormData) => {
    console.log(data);
    // Send til API
  };

  // 3. Render form
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Navn</FormLabel>
              <FormControl>
                <input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <button type="submit">Send</button>
      </form>
    </Form>
  );
}
```

---

## 🛠️ Build og Deploy

### Lokalt build

```bash
# Build frontend og backend
npm run build

# Test produksjon-build lokalt
npm run start
```

**Server kjører på**: `http://localhost:5000`

### Deploy til produksjon

Se [INSTALLATION.md](INSTALLATION.md) for fullstendig guide.

**Kort oppsummering**:
```bash
# 1. SSH til server
ssh user@server-ip

# 2. Clone/pull prosjekt
cd /opt/skolehelsetjenesten
git pull

# 3. Installer og build
npm install
npm run build

# 4. Restart service
sudo systemctl restart skolehelsetjenesten

# 5. Sjekk status
sudo systemctl status skolehelsetjenesten
```

---

## 🔍 Debugging

### I browser Console

```javascript
// Sjekk sesjon
await fetch("/api/auth/me").then(r => r.json());

// Se alle timer
await fetch("/api/appointments").then(r => r.json());

// Lagre test-time
await fetch("/api/appointments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    studentName: "Test Student",
    classLevel: "Vg2",
    appointmentDate: "2024-02-20",
    timeSlot: "10:00",
    reason: "Konsultasjon"
  })
});
```

### I Terminal

```bash
# Type-check
npm run check

# Build
npm run build

# Dev server logs
npm run dev

# Produksjon logs
sudo journalctl -u skolehelsetjenesten -f
```

---

## 📦 Avhengigheter

### Installere ny pakke

```bash
# Frontend
npm install <package-name>

# Backend (samme package.json)
npm install <package-name>
```

### Sjekk versjon

```bash
npm list <package-name>
```

---

## 🗄️ Database

### Prisma Migration (hvis brukt)

```bash
# Se endringer
npx drizzle-kit studio

# Push til database
npm run db:push

# Generate types
npx drizzle-kit generate:pg
```

### Backup

```bash
# Backup database
pg_dump -U appuser skolehelsetjenesten > backup.sql

# Restore
psql -U appuser skolehelsetjenesten < backup.sql
```

---

## 🔐 Sikkerhet

### Passord-endring (Helsesykepleier)

```bash
# Logg inn på server
ssh user@server-ip

# Koble til database
psql -U appuser -d skolehelsetjenesten

# Oppdater passord (bcrypt hash)
UPDATE users SET password = '$2a$10$...' WHERE username = 'marianne';
```

### Environment-variabler

```env
# .env (lagre SIKKERT, ikke i Git!)
DATABASE_URL=postgresql://user:password@localhost:5432/db
SESSION_SECRET=generer_tilfeldig_streng_32_tegn
NODE_ENV=production
PORT=5000
```

---

## 📋 Sjekklister

### Før deploy til produksjon

- [ ] Alle tester passerer: `npm run check`
- [ ] Build er vellykket: `npm run build`
- [ ] DATABASE_URL er satt korrekt
- [ ] SESSION_SECRET er generert og satt
- [ ] NODE_ENV=production
- [ ] HTTPS/SSL er konfigurert
- [ ] Backup av database er gjort

### Etter deploy

- [ ] Nettstedet lastes inn: `curl http://skolehelsetjenesten.local`
- [ ] Innlogging fungerer
- [ ] Timebestilling fungerer
- [ ] Admin-panel fungerer
- [ ] Logger er normale (sjekk journalctl)
- [ ] Database er tilgjengelig
- [ ] Nginx proxyer riktig

---

## 🆘 Raskt Feilsøking

| Problem | Løsning |
|---------|---------|
| Port 5000 i bruk | `lsof -i :5000` og `kill -9 <PID>` |
| Database-tilkoblingsfeil | Sjekk `DATABASE_URL` i `.env` |
| "Cannot find module" | Kjør `npm install` |
| TypeScript-feil | Kjør `npm run check` |
| Nettsted lastes ikke | Sjekk at server kjører (`npm run dev`) |
| Innlogging fungerer ikke | Sjekk brukernavn/passord i database |
| Admin-panel er tom | Sjekk at timer er opprettet i database |

---

## 📞 Ressurser

| Ressurs | Link |
|---------|------|
| Dokumentasjon Index | [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) |
| Brukerguide | [USER_GUIDE.md](USER_GUIDE.md) |
| Utviklerguide | [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) |
| Komponent-referanse | [COMPONENT_REFERENCE.md](COMPONENT_REFERENCE.md) |
| Installasjonsguide | [INSTALLATION.md](INSTALLATION.md) |
| Design-system | [design_guidelines.md](design_guidelines.md) |
| README | [README.md](README.md) |

---

## 💡 Pro Tips

1. **Type-sikkerhet**: Alltid bruk TypeScript types
2. **Re-use komponenter**: Bruk Shadcn/UI komponenter istedenfor å skrive fra scratch
3. **Validation**: Validate både på frontend (UX) og backend (sikkerhet)
4. **Error handling**: Alltid håndter errors med try-catch og user feedback
5. **Responsive design**: Test på både desktop og mobil
6. **Performance**: Lazy-load komponenter og bilder hvor mulig
7. **Accessibility**: Legg til alt-tekst og aria-labels
8. **Git commits**: Gjør hyppige, små commits med klare meldinger

---

**Sist oppdatert**: Januar 2026

Har du spørsmål? Se de andre dokumentene eller kontakt IT-avdelingen.
