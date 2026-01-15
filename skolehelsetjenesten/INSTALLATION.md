# Installasjonsveiledning - Ubuntu Server

Denne veiledningen beskriver hvordan du installerer Skolehelsetjenesten-nettsiden pa en Ubuntu Server og kobler den til Windows Server via Group Policy.

## Systemkrav

- Ubuntu Server 22.04 LTS eller nyere
- Minimum 1 GB RAM
- 10 GB diskplass
- Nettverkstilgang fra Windows-klienter

## Del 1: Installasjon pa Ubuntu Server

### 1.1 Oppdater systemet

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Installer Node.js 20

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Bor vise v20.x.x
```

### 1.3 Installer PostgreSQL

```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

### 1.4 Konfigurer database

```bash
sudo -u postgres psql
```

Kjor folgende SQL-kommandoer:

```sql
CREATE DATABASE skolehelsetjenesten;
CREATE USER appuser WITH ENCRYPTED PASSWORD 'ditt_sikre_passord';
GRANT ALL PRIVILEGES ON DATABASE skolehelsetjenesten TO appuser;
\c skolehelsetjenesten
GRANT ALL ON SCHEMA public TO appuser;
\q
```

### 1.5 Last ned prosjektet

```bash
cd /opt
sudo git clone https://github.com/ditt-repo/skolehelsetjenesten.git
sudo chown -R $USER:$USER skolehelsetjenesten
cd skolehelsetjenesten
```

### 1.6 Installer avhengigheter

```bash
npm install
```

### 1.7 Konfigurer miljovariabeler

Opprett filen `.env`:

```bash
nano .env
```

Legg til folgende innhold:

```env
DATABASE_URL=postgresql://appuser:ditt_sikre_passord@localhost:5432/skolehelsetjenesten
SESSION_SECRET=generer_en_lang_tilfeldig_streng_minst_32_tegn
NODE_ENV=production
PORT=5000
```

For a generere en sikker SESSION_SECRET:

```bash
openssl rand -base64 32
```

### 1.8 Kjor databasemigrering

```bash
npm run db:push
```

### 1.9 Bygg applikasjonen

```bash
npm run build
```

### 1.10 Opprett systemtjeneste

Opprett filen `/etc/systemd/system/skolehelsetjenesten.service`:

```bash
sudo nano /etc/systemd/system/skolehelsetjenesten.service
```

Innhold:

```ini
[Unit]
Description=Skolehelsetjenesten Web Application
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/skolehelsetjenesten
EnvironmentFile=/opt/skolehelsetjenesten/.env
ExecStart=/usr/bin/node dist/index.js
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Aktiver og start tjenesten:

```bash
sudo chown -R www-data:www-data /opt/skolehelsetjenesten
sudo systemctl daemon-reload
sudo systemctl enable skolehelsetjenesten
sudo systemctl start skolehelsetjenesten
sudo systemctl status skolehelsetjenesten
```

### 1.11 Installer og konfigurer Nginx

```bash
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/skolehelsetjenesten
```

Innhold:

```nginx
server {
    listen 80;
    server_name skolehelsetjenesten.local;  # Eller din IP/domene

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

Aktiver konfigurasjon:

```bash
sudo ln -s /etc/nginx/sites-available/skolehelsetjenesten /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 1.12 Konfigurer brannmur

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 1.13 Opprett sykepleierkontoer

```bash
curl -X POST http://localhost:5000/api/seed-nurses -H "Content-Type: application/json"
```

## Del 2: SSL-sertifikat (valgfritt, anbefalt)

For intern bruk kan du opprette et selvsignert sertifikat:

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/skolehelsetjenesten.key \
  -out /etc/ssl/certs/skolehelsetjenesten.crt
```

Oppdater Nginx-konfigurasjon for HTTPS:

```nginx
server {
    listen 443 ssl;
    server_name skolehelsetjenesten.local;

    ssl_certificate /etc/ssl/certs/skolehelsetjenesten.crt;
    ssl_certificate_key /etc/ssl/private/skolehelsetjenesten.key;

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

server {
    listen 80;
    server_name skolehelsetjenesten.local;
    return 301 https://$server_name$request_uri;
}
```

## Del 3: Windows Server - Group Policy

### 3.1 Legg til DNS-oppforing

Pa Windows Server DNS:

1. Apne **DNS Manager**
2. Hoyre-klikk pa din forward lookup zone
3. Velg **New Host (A or AAAA)**
4. Navn: `skolehelsetjenesten`
5. IP-adresse: `<Ubuntu Server IP>`
6. Klikk **Add Host**

### 3.2 Konfigurer Group Policy for nettlesere

Pa domenecontrolleren:

1. Apne **Group Policy Management**
2. Hoyre-klikk pa din OU og velg **Create a GPO in this domain**
3. Gi den navn: `Skolehelsetjenesten Startside`

#### For Microsoft Edge:

```
User Configuration → Policies → Administrative Templates → Microsoft Edge → Startup, home page and new tab page
```

- **Configure the home page URL**: Aktivert
  - URL: `http://skolehelsetjenesten.local/passordstrategi`

- **Set the new tab page URL**: Aktivert
  - URL: `http://skolehelsetjenesten.local/passordstrategi`

#### For Google Chrome:

```
User Configuration → Policies → Administrative Templates → Google → Google Chrome → Startup, Home page and New Tab page
```

- **Configure the home page URL**: Aktivert
  - URL: `http://skolehelsetjenesten.local/passordstrategi`

### 3.3 Oppdater Group Policy pa klienter

```cmd
gpupdate /force
```

## Del 4: Vedlikehold

### Oppdatere applikasjonen

```bash
cd /opt/skolehelsetjenesten
git pull
npm install
npm run build
sudo systemctl restart skolehelsetjenesten
```

### Se logger

```bash
sudo journalctl -u skolehelsetjenesten -f
```

### Sikkerhetskopi av database

```bash
pg_dump -U appuser skolehelsetjenesten > backup_$(date +%Y%m%d).sql
```

### Gjenopprette database

```bash
psql -U appuser skolehelsetjenesten < backup_20240115.sql
```

## Feilsoking

### Applikasjonen starter ikke

```bash
sudo journalctl -u skolehelsetjenesten -n 50
```

### Database-tilkoblingsfeil

```bash
sudo -u postgres psql -c "SELECT 1;"
```

### Nginx-feil

```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

## Kontakt

Ved sporsmal, kontakt IT-avdelingen ved Hamar katedralskole.
