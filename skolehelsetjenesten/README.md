# Skolehelsetjenesten - Hamar katedralskole

Nettside for skolehelsetjenesten ved Hamar katedralskole.

## Funksjoner

- **Hjemmeside** med informasjon om skolehelsetjenesten
- **Tjenester** - oversikt over helsetilbud
- **FAQ og ressurser** - ofte stilte sporsmal og nyttige lenker
- **Timebestilling** - elever kan bestille time hos helsesykepleier
- **Passordstrategi** - informasjonsside for Windows Server-integrasjon
- **Administrasjonspanel** - for helsesykepleiere til a administrere timer

## Teknologi

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL med Drizzle ORM
- **Autentisering**: Sesjonsbasert med bcrypt passord-hashing

## Helsesykepleiere

- **Marianne Buvik**: Telefon 902 69 665
- **Hanne Krotoy**: Telefon 912 48 594

## Kontortider

| Dag | Tid |
|-----|-----|
| Mandag | 09:00 - 14:00 |
| Tirsdag | 09:00 - 14:00 |
| Onsdag | 09:00 - 13:00 |
| Torsdag | 09:00 - 14:00 |
| Fredag | 09:00 - 11:00 |

## Plassering

3. etasje i floy 1 ved Elevtjenesten, Ringgata 235, 2315 Hamar

## Innlogging for ansatte

- **URL**: `/logg-inn`
- **Brukernavn**: `marianne` eller `hanne`
- **Passord**: `helse2024`

## API-endepunkter

| Metode | Endepunkt | Beskrivelse | Autentisering |
|--------|-----------|-------------|---------------|
| POST | /api/appointments | Opprett ny time | Nei |
| GET | /api/appointments | Hent alle timer | Kreves |
| PATCH | /api/appointments/:id/status | Oppdater status | Kreves |
| DELETE | /api/appointments/:id | Slett time | Kreves |
| POST | /api/auth/login | Logg inn | Nei |
| POST | /api/auth/logout | Logg ut | Nei |
| GET | /api/auth/me | Sjekk innlogging | Nei |

## Lisens

Intern bruk for Hamar katedralskole.
