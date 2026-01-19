# Skolehelsetjenesten - Full dokumentasjon

## Prosjektoversikt

**Skolehelsetjenesten** er en nettapplikasjon for timebestilling hos helsesykepleier ved Hamar katedralskole.

### Hovedfunksjoner:
- Timebestilling hos helsesykepleier (for elever)
- Administrasjonspanel for behandling av avtaler
- Pålogging med roller (elev, sykepleier, admin)
- Mørk/lys tema

---

## Applikasjonsarkitektur

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│                   (React + TypeScript)                       │
│  ┌─────────┐ ┌──────────┐ ┌─────────┐ ┌──────────────────┐  │
│  │  Hjem   │ │ Bestill  │ │  FAQ    │ │  Adminpanel      │  │
│  └─────────┘ └──────────┘ └─────────┘ └──────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP/API
┌─────────────────────────┴───────────────────────────────────┐
│                        Backend                               │
│                   (Express + TypeScript)                     │
│  ┌─────────────┐ ┌──────────────┐ ┌───────────────────────┐ │
│  │ Auth Ruter  │ │ Avtaler      │ │ Sesjonshåndtering     │ │
│  └─────────────┘ └──────────────┘ └───────────────────────┘ │
└─────────────────────────┬───────────────────────────────────┘
                          │ SQL
┌─────────────────────────┴───────────────────────────────────┐
│                       PostgreSQL                             │
│  ┌─────────────────────┐ ┌────────────────────────────────┐ │
│  │       users         │ │         appointments           │ │
│  └─────────────────────┘ └────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Filstruktur

```
skolehelsetjenesten/
├── client/                      # Frontend (React)
│   ├── src/
│   │   ├── App.tsx             # Hovedkomponent, ruting
│   │   ├── main.tsx            # React inngangspunkt
│   │   ├── index.css           # Globale stiler (TailwindCSS)
│   │   ├── components/         # UI-komponenter
│   │   │   ├── header.tsx      # Navigasjon
│   │   │   ├── footer.tsx      # Bunntekst
│   │   │   ├── hero-section.tsx
│   │   │   ├── appointment-form.tsx  # Bestillingsskjema
│   │   │   ├── nurse-cards.tsx       # Sykepleierkort
│   │   │   ├── theme-provider.tsx    # Temaleverandør
│   │   │   └── ui/             # Shadcn/UI-komponenter
│   │   ├── pages/              # Sider
│   │   │   ├── home.tsx        # Hjemmeside
│   │   │   ├── booking.tsx     # Bestillingsside
│   │   │   ├── admin.tsx       # Adminpanel
│   │   │   ├── login.tsx       # Pålogging
│   │   │   ├── faq.tsx         # Ofte stilte spørsmål
│   │   │   ├── services.tsx    # Tjenester
│   │   │   └── password-strategy.tsx
│   │   ├── hooks/              # React hooks
│   │   └── lib/                # Verktøy
│   └── index.html
│
├── server/                      # Backend (Express)
│   ├── index.ts                # Server inngangspunkt
│   ├── routes.ts               # API-ruter
│   ├── db.ts                   # Databasetilkobling
│   ├── storage.ts              # Datalag
│   ├── vite.ts                 # Vite mellomvare for utvikling
│   └── static.ts               # Statiske filer for produksjon
│
├── shared/                      # Delt kode
│   └── schema.ts               # Databaseskjema (Drizzle)
│
├── attached_assets/            # Statiske ressurser
├── vite.config.ts              # Vite-konfigurasjon
├── drizzle.config.ts           # Drizzle ORM-konfigurasjon
├── tailwind.config.ts          # TailwindCSS-konfigurasjon
├── tsconfig.json               # TypeScript-konfigurasjon
└── package.json                # Avhengigheter og skript
```

---

## Database

### Databaseskjema (PostgreSQL)

#### Tabell `users` (Brukere)

| Kolonne    | Type     | Beskrivelse                        |
|------------|----------|-------------------------------------|
| id         | VARCHAR  | UUID, primærnøkkel                 |
| username   | TEXT     | Brukernavn (unikt)                 |
| password   | TEXT     | Hashet passord (bcrypt)            |
| role       | TEXT     | Rolle: student, nurse, admin       |

#### Tabell `appointments` (Avtaler)

| Kolonne          | Type      | Beskrivelse                       |
|------------------|-----------|-----------------------------------|
| id               | VARCHAR   | UUID, primærnøkkel                |
| student_name     | TEXT      | Elevens navn                      |
| class_level      | TEXT      | Elevens klasse                    |
| appointment_date | DATE      | Avtaledato                        |
| time_slot        | TEXT      | Tidspunkt                         |
| reason           | TEXT      | Årsak til besøk                   |
| additional_notes | TEXT      | Tilleggsnotater (valgfritt)       |
| status           | TEXT      | Status: pending, confirmed, cancelled, completed |
| nurse_id         | TEXT      | Sykepleier-ID (valgfritt)         |
| created_at       | TIMESTAMP | Opprettelsesdato                  |

### SQL-eksempler

```sql
-- Vis alle brukere
SELECT * FROM users;

-- Resultat:
-- id                                   | username  | password        | role
-- 550e8400-e29b-41d4-a716-446655440000 | marianne  | $2a$10$...hash  | nurse
-- 550e8400-e29b-41d4-a716-446655440001 | hanne     | $2a$10$...hash  | nurse
-- 550e8400-e29b-41d4-a716-446655440002 | admin     | $2a$10$...hash  | admin

-- Vis alle avtaler
SELECT * FROM appointments ORDER BY created_at DESC;

-- Resultat:
-- id         | student_name | class_level | appointment_date | time_slot | reason          | status
-- a1b2c3...  | Ola Nordmann | VG2         | 2024-01-20       | 10:00     | Hodepine        | pending
-- d4e5f6...  | Kari Hansen  | VG1         | 2024-01-21       | 11:30     | Samtale         | confirmed

-- Avtaler med status "venter"
SELECT student_name, appointment_date, time_slot, reason 
FROM appointments 
WHERE status = 'pending';

-- Statistikk per status
SELECT status, COUNT(*) as antall 
FROM appointments 
GROUP BY status;

-- Avtaler for en bestemt dag
SELECT * FROM appointments 
WHERE appointment_date = '2024-01-20';

-- Oppdater avtalestatus
UPDATE appointments 
SET status = 'confirmed' 
WHERE id = 'din-avtale-id';
```

---

## API-endepunkter

### Autentisering

| Metode | Endepunkt           | Beskrivelse             | Tilgang   |
|--------|---------------------|-------------------------|-----------|
| POST   | /api/auth/register  | Registrering            | Offentlig |
| POST   | /api/auth/login     | Innlogging              | Offentlig |
| POST   | /api/auth/logout    | Utlogging               | Autentisert |
| GET    | /api/auth/me        | Nåværende bruker        | Autentisert |

### Avtaler

| Metode | Endepunkt                    | Beskrivelse           | Tilgang      |
|--------|------------------------------|-----------------------|--------------|
| GET    | /api/appointments            | Alle avtaler          | nurse/admin  |
| GET    | /api/appointments/:id        | En avtale             | nurse/admin  |
| POST   | /api/appointments            | Opprett avtale        | Offentlig    |
| PATCH  | /api/appointments/:id/status | Endre status          | nurse/admin  |
| DELETE | /api/appointments/:id        | Slett avtale          | nurse/admin  |

### Forespørselseksempler

```bash
# Registrer bruker
curl -X POST http://din-server:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testbruker", "password": "passord123", "role": "student"}'

# Logg inn
curl -X POST http://din-server:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "marianne", "password": "helse2024"}' \
  -c cookies.txt

# Opprett avtale
curl -X POST http://din-server:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "Ola Nordmann",
    "classLevel": "VG2",
    "appointmentDate": "2024-01-25",
    "timeSlot": "10:00",
    "reason": "Hodepine",
    "additionalNotes": "Har hatt vondt i 3 dager"
  }'

# Hent alle avtaler (krever autentisering som nurse/admin)
curl http://din-server:5000/api/appointments -b cookies.txt

# Oppdater avtalestatus
curl -X PATCH http://din-server:5000/api/appointments/{id}/status \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmed"}' \
  -b cookies.txt
```

---

## Distribusjon på Proxmox VM

### Serverkrav:
- Node.js 20+
- PostgreSQL 14+
- Nginx (for reverse proxy)
- Minimum 1GB RAM
- 10GB disk

### Trinn 1: Installer avhengigheter

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y nodejs npm postgresql nginx

# Installer Node.js 20 (hvis nyere versjon trengs)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### Trinn 2: Konfigurer PostgreSQL

```bash
# Opprett database
sudo -u postgres psql

CREATE DATABASE skolehelsetjenesten;
CREATE USER appuser WITH ENCRYPTED PASSWORD 'ditt_sikre_passord';
GRANT ALL PRIVILEGES ON DATABASE skolehelsetjenesten TO appuser;
\q
```

### Trinn 3: Klon og konfigurer prosjektet

```bash
# Klon repository
git clone <din-repo-url> /opt/skolehelsetjenesten
cd /opt/skolehelsetjenesten/skolehelsetjenesten

# Installer avhengigheter
npm install

# Opprett .env-fil
cat > .env << EOF
DATABASE_URL=postgresql://appuser:ditt_sikre_passord@localhost:5432/skolehelsetjenesten
SESSION_SECRET=din_veldig_lange_tilfeldige_hemmelige_nokkel_minst_32_tegn
SECURE_COOKIES=true
NODE_ENV=production
PORT=5000
EOF

# Kjør databasemigrering
npm run db:push

# Bygg prosjektet
npm run build
```

### Trinn 4: Opprett Systemd-tjeneste

```bash
sudo nano /etc/systemd/system/skolehelsetjenesten.service
```

```ini
[Unit]
Description=Skolehelsetjenesten Web App
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/skolehelsetjenesten/skolehelsetjenesten
ExecStart=/usr/bin/node dist/index.cjs
Restart=on-failure
RestartSec=10
Environment=NODE_ENV=production
EnvironmentFile=/opt/skolehelsetjenesten/skolehelsetjenesten/.env

[Install]
WantedBy=multi-user.target
```

```bash
# Aktiver og start tjenesten
sudo systemctl daemon-reload
sudo systemctl enable skolehelsetjenesten
sudo systemctl start skolehelsetjenesten

# Sjekk status
sudo systemctl status skolehelsetjenesten
```

### Trinn 5: Konfigurer Nginx

```bash
sudo nano /etc/nginx/sites-available/skolehelsetjenesten
```

```nginx
server {
    listen 80;
    server_name ditt-domene.no;  # eller IP-adresse

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Aktiver konfigurasjon
sudo ln -s /etc/nginx/sites-available/skolehelsetjenesten /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Trinn 6: SSL-sertifikat (valgfritt)

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx

# Hent sertifikat
sudo certbot --nginx -d ditt-domene.no
```

---

## Miljøvariabler

| Variabel         | Beskrivelse                               | Påkrevd      |
|------------------|-------------------------------------------|--------------|
| DATABASE_URL     | PostgreSQL-tilkoblingsstreng              | Ja           |
| SESSION_SECRET   | Hemmelig nøkkel for sesjoner (min. 32 tegn) | I produksjon |
| SECURE_COOKIES   | "true" for HTTPS                          | I produksjon |
| NODE_ENV         | development eller production              | Nei          |
| PORT             | Serverport (standard 5000)                | Nei          |

---

## Standardbrukere

For å opprette testsykepleiere, kjør POST-forespørsel:

```bash
curl -X POST http://din-server:5000/api/seed-nurses
```

Dette oppretter:
- **marianne** / helse2024 (rolle: nurse)
- **hanne** / helse2024 (rolle: nurse)

---

## Brukerroller

| Rolle   | Rettigheter                                        |
|---------|----------------------------------------------------|
| student | Kan opprette avtaler                               |
| nurse   | Vise, bekrefte, avlyse avtaler                     |
| admin   | Alle rettigheter + brukeradministrasjon            |

---

## Feilsøking

### Applikasjonen starter ikke:
```bash
# Sjekk logger
sudo journalctl -u skolehelsetjenesten -f

# Sjekk databasetilkobling
psql $DATABASE_URL -c "SELECT 1"
```

### Feil "DATABASE_URL must be set":
- Sørg for at .env-filen eksisterer og inneholder DATABASE_URL

### Feil "Session secret required":
- I produksjon må SESSION_SECRET være satt

### Nginx 502 Bad Gateway:
- Sjekk om Node.js-serveren kjører: `systemctl status skolehelsetjenesten`
- Sjekk port: `netstat -tlnp | grep 5000`

---

## Sikkerhetskopiering

```bash
# Sikkerhetskopier database
pg_dump skolehelsetjenesten > backup_$(date +%Y%m%d).sql

# Gjenopprett
psql skolehelsetjenesten < backup_20240120.sql
```

---

## Oppdatering av prosjektet

```bash
cd /opt/skolehelsetjenesten/skolehelsetjenesten
git pull
npm install
npm run build
npm run db:push
sudo systemctl restart skolehelsetjenesten
```

---

## Kontakt og support

Ved problemer, sjekk:
1. Applikasjonslogger: `journalctl -u skolehelsetjenesten`
2. Nginx-logger: `/var/log/nginx/error.log`
3. Databasetilkobling
