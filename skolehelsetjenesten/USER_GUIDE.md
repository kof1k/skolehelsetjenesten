# Brukerguide - Skolehelsetjenesten

Denne guiden er for elever og ansatte som bruker Skolehelsetjenesten-nettstedet.

## Innholdsfortegnelse

1. [For Elever](#for-elever)
2. [For Helsesykepleiere](#for-helsesykepleiere)
3. [Ofte Stilte Spørsmål](#ofte-stilte-spørsmål)
4. [Feilsøking](#feilsøking)

---

## For Elever

### Hva er Skolehelsetjenesten?

Skolehelsetjenesten er et tilbud til alle elever ved Hamar katedralskole. Vi tilbyr:

- **Konsultasjoner** - Snakk med helsesykepleier i private samtaler
- **Helsehjelp** - Medisinsk hjelp, sårvask, bandasjer, etc.
- **Rådgivning** - Hjelp med psykisk helse og personlige utfordringer

### Kontaktinformasjon

| Informasjon | Detaljer |
|-------------|----------|
| **Plassering** | 3. etasje, Floy 1, ved Elevtjenesten |
| **Adresse** | Ringgata 235, 2315 Hamar |
| **Telefon Marianne** | 902 69 665 |
| **Telefon Hanne** | 912 48 594 |

### Åpningstider

| Dag | Tid |
|-----|-----|
| Mandag | 09:00 - 14:00 |
| Tirsdag | 09:00 - 14:00 |
| Onsdag | 09:00 - 13:00 |
| Torsdag | 09:00 - 14:00 |
| Fredag | 09:00 - 11:00 |

### Hvordan bestille time online?

#### Trinn 1: Gå til nettstedet

1. Åpne nettleser
2. Gå til: `http://skolehelsetjenesten.local`
3. Klikk "Bestill time" eller gå til `/bestill-time`

#### Trinn 2: Fyll ut skjemaet

Skjemaet ber om følgende informasjon:

**Navn på elev** (obligatorisk)
- Skriv ditt fulle navn
- Må være minst 2 tegn

**Klasse** (obligatorisk)
- Velg din klasse: Vg1, Vg2, Vg3, eller Påbygg

**Dato** (obligatorisk)
- Velg ønsket dato
- Kan ikke velge dato bakover i tid

**Tidspunkt** (obligatorisk)
- Velg ønsket tid
- Timer er tilgjengelig hver 30 minutter
- Fra 09:00 til 14:00

**Årsak** (obligatorisk)
- **Konsultasjon** - Samtale med helsesykepleier
- **Helsehjelp** - Medisinsk hjelp
- **Rådgivning** - Psykisk helse og støtte

**Tilleggsinformasjon** (valgfritt)
- Skriv notat hvis du vil fortelle mer
- Maks 500 tegn
- Eksempel: "Har hodepine", "Trenger vaksine", etc.

#### Trinn 3: Send inn

1. Klikk "Bestill time"
2. Vent på bekreftelse
3. Du vil få en melding om at timen er booket

**Meldinger**:
- ✅ Grønt: "Time vellykket booket!"
- ❌ Rød: "Feil ved booking. Prøv igjen."

### Hva skjer etter booking?

1. **Helsesykepleier mottar din booking**
   - Du ser status "Under behandling" på nettstedet

2. **Bekrefting eller kontakt**
   - Helsesykepleier bekrefter timen (vanligvis innen samme dag)
   - De kan kontakte deg hvis de har spørsmål

3. **Møte til avtalt tid**
   - Dukk opp på avtalt tid
   - Møt på 3. etasje, Floy 1

### Endre eller avlyse time

**Hvis du booket online**:
- Kontakt helsesykepleier direkte på telefon
- Marianne: 902 69 665
- Hanne: 912 48 594

**Anbefaling**: Ring så snart som mulig hvis du må avlyse.

### Privatliv

All informasjon du deler er **konfidensielt** og underlagt legetaushet. Det betyr:
- Dine samtaler er private
- Foreldrene dine vet ikke hva du har snakket om (med noen unntak)
- Informasjonen lagres sikkert

**Unntak**: Hvis du er i fare eller andre er i fare, må vi informere foreldrene dine eller myndighetene.

---

## For Helsesykepleiere

### Innlogging

#### Trinn 1: Gå til innloggingssiden

1. Åpne nettleser
2. Gå til: `http://skolehelsetjenesten.local/logg-inn`

#### Trinn 2: Logg inn

```
Brukernavn: marianne eller hanne
Passord: [ditt passord - endres hvis det er delt]
```

Klikk "Logg inn"

#### Trinn 3: Admin-panel

Du skal nå se admin-panelet med oversikt over alle timer.

### Admin-panel oversikt

Admin-panelet viser:

**Timetabell**
- Liste med alle timebestillinger
- Sortert etter dato
- Status for hver time

**Kolonner**:
| Kolonne | Innhold |
|---------|---------|
| Navn | Elevens navn |
| Klasse | Vg1, Vg2, Vg3, eller Påbygg |
| Dato | Dato for timen |
| Tid | Tidspunkt |
| Årsak | Konsultasjon, helsehjelp, etc. |
| Status | Pending, Confirmed, Completed, Cancelled |
| Handlinger | Buttons for handling |

### Håndtere timer

#### Status-endring

1. **Finne timen**
   - Lete etter navn eller dato

2. **Velg ny status** (fra dropdown):
   - **Pending** - Booket, ikke bekreftet
   - **Confirmed** - Bekreftet av deg
   - **Completed** - Gjennomført
   - **Cancelled** - Avlyst

3. **Lagre**
   - Klikk "Oppdater" eller "Save"
   - Status lagres automatisk

#### Slette time

1. Finn timen i tabellen
2. Klikk slette-knappen (🗑️ eller "Delete")
3. Bekreft sletting
4. Timen fjernes fra listen

**Merk**: En elev kan ikke slette sin egen booking fra systemet - de må kontakte deg.

### Søk og filtrering

**Søke etter elev**:
1. Bruk søkefelt øverst
2. Skriv navn
3. Tabellen oppdateres med treff

**Filtrer etter status**:
1. Velg status fra dropdown
2. Velg "Pending", "Confirmed", "Completed", eller "Cancelled"
3. Tabellen viser bare timer med denne statusen

### Notater og tilleggsinformasjon

Hver time viser:
- **Årsak** - Hvorfor eleven ønsket time
- **Tilleggsnotat** - Ekstra informasjon fra eleven
- Bruk denne informasjonen til forberedelse

### Logg ut

1. Klikk "Logg ut" eller din brukerprofil
2. Du blir omdirigert til hjemmesiden
3. Sesjonen lukkes og innlogging er påkrevd igjen

### Sikkerhet

**Viktig**:
- Logg alltid av når du forlater datamaskinen
- Del ikke passord med andre
- Hvis passord blir delt, si fra IT-avdelingen

---

## Ofte Stilte Spørsmål

### Jeg finner ikke nettstedet?

**Problem**: Kan ikke nå `http://skolehelsetjenesten.local`

**Løsning**:
1. Sjekk at du er koblet til skolenettet
2. Prøv å åpne nettstedet igjen
3. Vekle mellom nettleser (Chrome, Edge)
4. Kontakt IT-avdelingen hvis problemet fortsetter

### Timen min vises ikke?

**Problem**: Jeg booket en time, men den vises ikke på hjemmesiden

**Forklaring**:
- Timen er lagret i databasen
- Det kan ta litt tid før den vises
- Helsesykepleier mottar meldingen selv om den ikke vises for deg

**Løsning**:
- Vent 5 minutter
- Oppdater siden (F5)
- Kontakt helsesykepleier for bekreftelse

### Hva hvis jeg glemmer passord?

**For elever**:
- Du trenger ikke passord
- Bare fyll ut skjemaet med navn og klasse

**For helsesykepleiere**:
- Kontakt IT-avdelingen
- Pass på at IT-ansvarlig setter ditt passord

### Kan jeg booke time for en klassekamerat?

**Nei**, hver elev må booke sin egen time. Grunnen:
- Sikkerhet - bare eleven vet hva hun/han trenger hjelp til
- Privatliv - timene skal være private

### Hva hvis jeg må avlyse?

**Kontakt helsesykepleier direkte**:
- Telefon: 902 69 665 eller 912 48 594
- Ring så snart som mulig

**Ikke bare ikke møte opp** - da mister andre elever mulig tid til bestilling.

### Kan jeg endre timen min?

**Online**: Nei, du kan ikke endre fra nettstedet.

**Offline**: Ja, kontakt helsesykepleier direkte:
- Ring og forklar at du vil endre tidspunkt
- De hjelper deg med å finne ny tid

### Jeg er ikke komfortabel med å booke online?

Alle bookinger kan gjøres ved å **ringe direkte**:
- Marianne: 902 69 665
- Hanne: 912 48 594

De hjelper deg gjerne med å finne en passende tid.

### Kan jeg se hva andre elever har booket?

**Nei**:
- Admin-panelet er kun for helsesykepleiere
- Elever kan bare se deres egen informasjon
- Helsepleiernes data er sikret

### Hvor lenge lagres dataene mine?

**Personlig informasjon**:
- Lagres så lenge du er elev
- Slettes 1 år etter at du forlater skolen (regulert av GDPR)

---

## Feilsøking

### Nettstedet åpnes ikke

**Årsak 1: Ikke koblet til skolenettet**
```
- Kontroller at du er på skolens WiFi
- Eller fysisk koblet til nettverket
```

**Årsak 2: Server er nede**
```
- Vent noen minutter
- Kontakt IT-avdelingen hvis det varer lenge
```

### Skjemaet sender ikke inn

**Årsak 1: Validering feilet**
```
Sjekk at:
- ✓ Navn er fylt inn (minst 2 tegn)
- ✓ Klasse er valgt
- ✓ Dato er valgt
- ✓ Tidspunkt er valgt
- ✓ Årsak er valgt
```

**Årsak 2: Server-feil**
```
Prøv:
1. Oppdater siden (F5)
2. Fyll inn skjemaet igjen
3. Klikk "Bestill time" igjen

Hvis det ikke fungerer: Kontakt helsesykepleier eller IT
```

### Innlogging fungerer ikke

**Årsak 1: Feil brukernavn/passord**
```
- Sjekk at brukernavn er riktig: "marianne" eller "hanne"
- Sjekk at passord er riktig (versaler og små bokstaver teller)
- Pass på at Caps Lock ikke er på
```

**Årsak 2: Bruker ikke funnet**
```
- Kontakt IT-avdelingen
- De kan sjekke om brukeren eksisterer
```

### Tiden min forsvant fra admin-panelet

**Dette skjer hvis**:
1. Timen ble slettet av en annen bruker
2. Systemet ble gjenstartet
3. Data ble slettet ved en ulykke

**Løsning**:
- Kontakt IT-avdelingen
- De kan gjenopprette fra sikkerhetskopi

### Feil-meldinger

**"Brukernavn og passord kreves"**
- Fyll inn begge felt

**"Ugyldig brukernavn eller passord"**
- Sjekk stavelse og versaler
- Kontakt IT hvis du ikke husker passordet

**"Forbidden" eller "Unauthorized"**
- Du har ikke tilgang til denne siden
- Bare helsesykepleiere kan se admin-panelet

**"Internal Server Error"**
- Server har en feil
- Vent noen minutter og prøv igjen
- Kontakt IT hvis det vedvarer

---

## Tips og beste praksis

### For elever

1. **Book i god tid** - Ikke vent til siste øyeblikk
2. **Legg til detaljer** - Jo mer info, jo bedre kan vi hjelpe
3. **Møt opp i tid** - Vær punktlig til avtalen
4. **Vær åpen** - Jo mer du forteller, jo bedre hjelp får du
5. **Avlys hvis det oppstår** - Gi helsesykepleier beskjed

### For helsesykepleiere

1. **Bekreft timer raskt** - Gjør det samme dag hvis mulig
2. **Legg til notater** - Notater hjelper deg med forberedelse
3. **Oppdater status** - Hold systemet oppdatert
4. **Logg av** - Aldri glem å logge av når du er ferdig
5. **Backup** - IT håndterer automatisk backup

---

## Kontakt og support

### IT-avdelingen

For tekniske problemer:
- Epost: [IT@hamarkat.no]
- Telefon: [IT telefon]
- Lokasjon: IT-kontoret

### Helsesykepleiere

For spørsmål om helsetjenester:
- Marianne: 902 69 665
- Hanne: 912 48 594
- Lokasjon: 3. etasje, Floy 1

---

**Sist oppdatert**: Januar 2026

Se også:
- [README.md](README.md)
- [FAQ sektion på nettstedet](http://skolehelsetjenesten.local/faq)
