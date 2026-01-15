# Component Reference Guide

Komplett referanseguide for alle komponenter og UI-elementer i Skolehelsetjenesten-appen.

## Innholdsfortegnelse

1. [Page Components](#page-components)
2. [Section Components](#section-components)
3. [Form Components](#form-components)
4. [UI Components (Shadcn)](#ui-components-shadcn)
5. [Utility Components](#utility-components)
6. [Hooks Reference](#hooks-reference)

---

## Page Components

Page-komponenter er full-page komponenter som renderes av router.

### `home.tsx`

Hjemmesiden som presenterer skolehelsetjenesten.

**Route**: `/`

**Layout**:
```
- Header
- Hero Section
- Service Cards (3 tjenester)
- Nurse Cards (2 sykepleiere)
- Contact Section
- Footer
```

**Props**: Ingen

**Features**:
- Responsivt design
- CTA-knapp til timebestilling
- Tema-toggle

**Kode-eksempel**:
```typescript
export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <ServiceCards />
      <NurseCards />
      <ContactSection />
      <Footer />
    </>
  );
}
```

### `services.tsx`

Detaljert side om alle tjenestene.

**Route**: `/tjenester`

**Content**:
- Konsultasjoner
- Helsehjelp
- Rådgivning
- Forebygging

**Props**: Ingen

### `faq.tsx`

FAQ og ressursseksjon.

**Route**: `/faq`

**Components**:
- FAQ Accordion (Svar på vanlige spørsmål)
- Resources Section (Nyttige lenker)

**Props**: Ingen

### `booking.tsx`

Timebestillingssiden.

**Route**: `/bestill-time`

**Content**:
- AppointmentForm
- Instruktekst
- Suksess/feil-feedback

**Props**: Ingen

**State Management**:
```typescript
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
```

### `password-strategy.tsx`

Informasjon om passordstrategi og Windows Server-integrasjon.

**Route**: `/passordstrategi`

**Content**:
- Passordkrav
- Oppdateringsprosess
- Windows Server Group Policy

**Props**: Ingen

### `login.tsx`

Innloggingsside for helsesykepleiere.

**Route**: `/logg-inn`

**Form Fields**:
- Username (text)
- Password (password)

**Props**: Ingen

**On Success**:
Omdirigerer til `/admin`

### `admin.tsx`

Admin-panel for helsesykepleiere.

**Route**: `/admin`

**Requirements**: 
- Innlogget som `nurse` eller `admin`
- Omdirigeres til login hvis ikke autentisert

**Features**:
- Tabell med alle timer
- Status-filter (Pending, Confirmed, Completed, Cancelled)
- Inline status-editing
- Slettingsfunksjonalitet
- Søkefunksjonalitet

**State**:
```typescript
const [appointments, setAppointments] = useState<Appointment[]>([]);
const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed'>('all');
const [searchTerm, setSearchTerm] = useState('');
```

### `not-found.tsx`

404-side for ukjente ruter.

**Route**: `/:rest*` (catch-all)

**Content**:
- "Side ikke funnet"-melding
- Link tilbake til hjemmesiden

---

## Section Components

Section-komponenter brukes på hjemmesiden og er modulære deler.

### `header.tsx`

**Ansvar**: Navigationsmeny øverst på siden

**Features**:
- Logo (klikkbar, går til hjem)
- Navigasjonslenker
- "Book Time" CTA-knapp
- Tema-toggle
- Mobil-meny (hamburger)

**Props**: Ingen

**Responsive Design**:
```typescript
const isMobile = useIsMobile();

return isMobile ? <MobileMenu /> : <DesktopMenu />;
```

**Navigasjonslenker**:
```javascript
[
  { label: 'Hjem', href: '/' },
  { label: 'Tjenester', href: '/tjenester' },
  { label: 'FAQ', href: '/faq' },
]
```

### `hero-section.tsx`

**Ansvar**: Stor banner med budskap på toppen av hjemmesiden

**Content**:
```
Tittel: "Skolehelsetjenesten er her for deg"
Undertekst: Informasjon om helsehjelp for elever
CTA-knapp: "Bestill time"
```

**Props**: Ingen

**Styling**: Gradient bakgrunn med primary-farge

### `service-cards.tsx`

**Ansvar**: 3 kort som presenterer hovedtjenestene

**Services**:
1. **Konsultasjoner**
   - Icon: Plus
   - Beskrivelse: Snakk med helsesykepleier

2. **Helsehjelp**
   - Icon: Heart
   - Beskrivelse: Medisinsk hjelp og behandling

3. **Rådgivning**
   - Icon: Brain
   - Beskrivelse: Psykisk helse og veiledning

**Props**: Ingen

**Layout**: 3 kolonner på desktop, stacked på mobil

### `nurse-cards.tsx`

**Ansvar**: Presenterer helsesykepleierne

**Data** (hardkodet):
```typescript
[
  {
    name: "Marianne Buvik",
    phone: "902 69 665",
    image: "marianne.jpg",
    bio: "..."
  },
  {
    name: "Hanne Krotoy",
    phone: "912 48 594",
    image: "hanne.jpg",
    bio: "..."
  }
]
```

**Props**: Ingen

**Card Content**:
- Bilde (Avatar)
- Navn
- Telefonnummer
- Kort biografisk info

### `contact-section.tsx`

**Ansvar**: Kontaktinformasjon og åpningstider

**Content**:
- **Adresse**: Ringgata 235, 2315 Hamar
- **Telefon**: 902 69 665 / 912 48 594
- **Åpningstider**: Tabell med tider
- **Email**: kontakt@skolehelse.no (hvis tilgjengelig)

**Props**: Ingen

### `faq-section.tsx`

**Ansvar**: FAQ med Accordion

**Structure**:
```
<Accordion>
  <AccordionItem>
    <Q>Hvordan bestiller jeg time?</Q>
    <A>Klikk på "Bestill time" og fyll ut skjemaet</A>
  </AccordionItem>
  ...
</Accordion>
```

**Props**: Ingen

### `resources-section.tsx`

**Ansvar**: Nyttige ressurser og eksterne lenker

**Resources**:
- Helsestasjon-lenker
- Mental helse-ressurser
- Informasjonsmateriale

**Props**: Ingen

### `footer.tsx`

**Ansvar**: Footer med links og copyright

**Content**:
- Copyright tekst
- Nedre navigasjon
- Kontaktinformasjon (kort)
- Sosiale medier (hvis aktuelt)

**Props**: Ingen

---

## Form Components

### `appointment-form.tsx`

**Ansvar**: Skjema for timebestilling

**Props**:
```typescript
interface AppointmentFormProps {
  onSubmit?: (data: AppointmentFormData) => void;
}
```

**Form Fields**:
| Felt | Type | Validering | Notat |
|------|------|-----------|-------|
| studentName | text | Min 2 tegn | Elev sitt navn |
| classLevel | select | Obligatorisk | Vg1, Vg2, Vg3, Påbygg |
| appointmentDate | date | Obligatorisk, fremtid | Dato for time |
| timeSlot | select | Obligatorisk | 09:00-14:00 (30min intervaller) |
| reason | select | Obligatorisk | Konsultasjon, Helsehjelp, etc |
| additionalNotes | textarea | Maks 500 tegn | Frivillig tilleggsinformasjon |

**Validering**:
```typescript
const appointmentFormSchema = z.object({
  studentName: z.string().min(2, "Navn må ha minst 2 tegn"),
  classLevel: z.string().min(1, "Velg klasse"),
  appointmentDate: z.string().min(1, "Velg dato"),
  timeSlot: z.string().min(1, "Velg tidspunkt"),
  reason: z.string().min(1, "Velg årsak"),
  additionalNotes: z.string().optional(),
});
```

**On Submit**:
```typescript
const onSubmit = async (data: AppointmentFormData) => {
  const response = await fetch('/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  if (response.ok) {
    toast({ title: "Suksess", description: "Timer ble booket" });
  }
};
```

**Error Handling**:
- Toast-meldinger for feil
- Inline field-errors fra React Hook Form

---

## UI Components (Shadcn)

Skolehelsetjenesten bruker 40+ ferdigbygde UI-komponenter fra Shadcn/UI.

### Vanligst brukte

#### `Button`

**Bruk**:
```jsx
<Button onClick={handleClick}>Bestill time</Button>

<Button variant="outline">Avbryt</Button>

<Button size="sm" className="w-full">Lagre</Button>
```

**Variants**: default, destructive, outline, secondary, ghost, link

#### `Card`

**Bruk**:
```jsx
<Card>
  <CardHeader>
    <CardTitle>Tittel</CardTitle>
    <CardDescription>Subtekst</CardDescription>
  </CardHeader>
  <CardContent>Innhold</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

#### `Form` (React Hook Form)

**Bruk**:
```jsx
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const form = useForm({ resolver: zodResolver(schema) });

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="test@example.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

#### `Dialog`

**Bruk**:
```jsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Åpne</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Tittel</DialogTitle>
      <DialogDescription>Beskrivelse</DialogDescription>
    </DialogHeader>
    Innhold
  </DialogContent>
</Dialog>
```

#### `Accordion`

**Bruk**:
```jsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Spørsmål 1</AccordionTrigger>
    <AccordionContent>Svar 1</AccordionContent>
  </AccordionItem>
</Accordion>
```

#### `Table`

**Bruk**:
```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Navn</TableHead>
      <TableHead>Dato</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(item => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.date}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

#### `Input`

**Bruk**:
```jsx
<Input 
  type="email" 
  placeholder="Enter email"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

#### `Select`

**Bruk**:
```jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Velg alternativ" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="opt1">Alternativ 1</SelectItem>
    <SelectItem value="opt2">Alternativ 2</SelectItem>
  </SelectContent>
</Select>
```

#### `Textarea`

**Bruk**:
```jsx
<Textarea 
  placeholder="Skriv her..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

#### `Alert`

**Bruk**:
```jsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

<Alert>
  <AlertTitle>Tittel</AlertTitle>
  <AlertDescription>Beskrivelse av alert</AlertDescription>
</Alert>
```

#### `Badge`

**Bruk**:
```jsx
<Badge>Pending</Badge>
<Badge variant="secondary">Confirmed</Badge>
<Badge variant="destructive">Cancelled</Badge>
```

#### `Skeleton`

**Bruk** (for loading states):
```jsx
<Skeleton className="h-12 w-full rounded-md" />
```

### Alle tilgjengelige komponenter

```
accordion.tsx               dropdown-menu.tsx          switch.tsx
alert-dialog.tsx           form.tsx                   table.tsx
alert.tsx                  hover-card.tsx             tabs.tsx
aspect-ratio.tsx           input-otp.tsx              textarea.tsx
avatar.tsx                 input.tsx                  toast.tsx
badge.tsx                  label.tsx                  toaster.tsx
breadcrumb.tsx             menubar.tsx                toggle-group.tsx
button.tsx                 navigation-menu.tsx        toggle.tsx
calendar.tsx               pagination.tsx             tooltip.tsx
card.tsx                   popover.tsx
carousel.tsx               progress.tsx
chart.tsx                  radio-group.tsx
checkbox.tsx               resizable.tsx
collapsible.tsx            scroll-area.tsx
command.tsx                select.tsx
context-menu.tsx           separator.tsx
dialog.tsx                 sheet.tsx
drawer.tsx                 sidebar.tsx
```

Se [shadcn/ui documentation](https://ui.shadcn.com) for fullstendig bruk av hver komponent.

---

## Utility Components

### `theme-provider.tsx`

**Ansvar**: Provider for tema-kontekst (light/dark mode)

**Bruk**:
```typescript
export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Hent fra localStorage eller system preference
    const stored = localStorage.getItem('theme');
    return stored as 'light' | 'dark' || 'light';
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}
```

### `theme-toggle.tsx`

**Ansvar**: Knapp for å toggle lys/mørk modus

**Props**: Ingen

**Bruk**: Plasseres i Header

```jsx
<ThemeToggle />
```

---

## Hooks Reference

### `use-mobile.tsx`

**Ansvar**: Detekterer om enhet er mobil

**Retur**: `boolean`

**Bruk**:
```typescript
import { useIsMobile } from '@/hooks/use-mobile';

export function MyComponent() {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return <MobileLayout />;
  }
  
  return <DesktopLayout />;
}
```

**Implementation** (bruker Media Query):
```typescript
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    setIsMobile(mediaQuery.matches);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
}
```

### `use-toast.ts`

**Ansvar**: Viser toast-meldinger (popup-notifikasjoner)

**Retur**:
```typescript
{
  toast: (options: ToastOptions) => void;
}
```

**Bruk**:
```typescript
import { useToast } from '@/hooks/use-toast';

export function MyComponent() {
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: "Suksess",
      description: "Operasjonen var vellykket",
      variant: "default", // 'default' | 'destructive'
    });
  };

  const handleError = () => {
    toast({
      title: "Feil",
      description: "Noe gikk galt",
      variant: "destructive",
    });
  };

  return (
    <>
      <button onClick={handleSuccess}>Vis suksess</button>
      <button onClick={handleError}>Vis feil</button>
    </>
  );
}
```

**ToastOptions**:
```typescript
interface ToastOptions {
  title?: string;           // Tittel
  description?: string;     // Beskrivelse
  variant?: 'default' | 'destructive';
  duration?: number;        // Millisekunder (standard: 3000)
}
```

---

## Custom Hooks

### `useAppointments()`

(Hvis implementert senere)

Henter og administrerer timer fra backend.

```typescript
const { appointments, isLoading, error, refetch } = useAppointments();
```

### `useAuth()`

(Hvis implementert senere)

Autentisering og bruker-session.

```typescript
const { user, login, logout, isAuthenticated } = useAuth();
```

---

## Styling Guidelines

### Tailwind CSS-klasser

**Tekstfarger**:
```
text-primary      - Lilla (hovedfarge)
text-secondary    - Lyse lilla
text-destructive  - Rød
text-muted-foreground  - Grå (deaktivert tekst)
```

**Bakgrunnsfarger**:
```
bg-primary
bg-secondary
bg-destructive
bg-accent
bg-muted
```

**Spacing**:
```
p-4    - Padding
m-4    - Margin
gap-4  - Grid/Flex gap
space-y-4  - Vertikal avstand mellom barn
```

**Responsive**:
```
md:hidden       - Skjul på desktop
lg:w-1/3        - Bredde på large screens
max-w-screen-xl - Max bredde
```

### CSS Modules

Hvis du vil bruke CSS Modules i stedet:

```css
/* components/example.module.css */
.container {
  display: flex;
  gap: 1rem;
}
```

```typescript
import styles from './example.module.css';

export function Example() {
  return <div className={styles.container}>...</div>;
}
```

---

## Best Practices

1. **Bruk komponenter fra Shadcn/UI** - Ikke reinventer hjulet
2. **Type-sikkerhet** - Alltid define PropTypes eller TypeScript interfaces
3. **ForwardRef for custom inputs** - Gjør komponenter kompatible med React Hook Form
4. **Unnvik prop drilling** - Bruk Context for global state
5. **Lazy load images** - Bruk `loading="lazy"` på img-tags
6. **Tilgjengelighet** - Alltid inkluder `alt`-tekst og `aria-*` attributter
7. **Responsive design** - Mobile-first approach

---

**Sist oppdatert**: Januar 2026

Se også:
- [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)
- [INSTALLATION.md](INSTALLATION.md)
- [README.md](README.md)
