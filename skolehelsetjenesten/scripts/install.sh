#!/bin/bash

# Skolehelsetjenesten - Installasjonsskript for Ubuntu Server
# Kjor som root eller med sudo

set -e

echo "=========================================="
echo "  Skolehelsetjenesten - Installasjon"
echo "=========================================="

# Sjekk at skriptet kjores som root
if [ "$EUID" -ne 0 ]; then
    echo "Kjor dette skriptet med sudo:"
    echo "sudo bash install.sh"
    exit 1
fi

# Variabler
APP_DIR="/opt/skolehelsetjenesten"
DB_NAME="skolehelsetjenesten"
DB_USER="appuser"
DB_PASS=$(openssl rand -base64 16)
SESSION_SECRET=$(openssl rand -base64 32)

echo ""
echo "[1/8] Oppdaterer system..."
apt update && apt upgrade -y

echo ""
echo "[2/8] Installerer Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

echo ""
echo "[3/8] Installerer PostgreSQL..."
apt install -y postgresql postgresql-contrib
systemctl enable postgresql
systemctl start postgresql

echo ""
echo "[4/8] Konfigurerer database..."
sudo -u postgres psql <<EOF
CREATE DATABASE $DB_NAME;
CREATE USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASS';
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
\c $DB_NAME
GRANT ALL ON SCHEMA public TO $DB_USER;
EOF

echo ""
echo "[5/8] Kopierer applikasjonsfiler..."
mkdir -p $APP_DIR
cp -r . $APP_DIR/
cd $APP_DIR

echo ""
echo "[6/8] Installerer avhengigheter..."
npm install

echo ""
echo "[7/8] Konfigurerer miljovariabler..."
cat > $APP_DIR/.env <<EOF
DATABASE_URL=postgresql://$DB_USER:$DB_PASS@localhost:5432/$DB_NAME
SESSION_SECRET=$SESSION_SECRET
NODE_ENV=production
PORT=5000
EOF

echo ""
echo "[8/8] Kjorer databasemigrering..."
npm run db:push

echo ""
echo "Bygger applikasjon..."
npm run build

echo ""
echo "Oppretter systemtjeneste..."
cat > /etc/systemd/system/skolehelsetjenesten.service <<EOF
[Unit]
Description=Skolehelsetjenesten Web Application
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=$APP_DIR
EnvironmentFile=$APP_DIR/.env
ExecStart=/usr/bin/node dist/index.js
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

chown -R www-data:www-data $APP_DIR
systemctl daemon-reload
systemctl enable skolehelsetjenesten
systemctl start skolehelsetjenesten

echo ""
echo "Installerer Nginx..."
apt install -y nginx

cat > /etc/nginx/sites-available/skolehelsetjenesten <<EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

ln -sf /etc/nginx/sites-available/skolehelsetjenesten /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

echo ""
echo "Oppretter sykepleierkontoer..."
sleep 3
curl -X POST http://localhost:5000/api/seed-nurses -H "Content-Type: application/json"

echo ""
echo "=========================================="
echo "  INSTALLASJON FULLFORT!"
echo "=========================================="
echo ""
echo "Nettside:        http://$(hostname -I | awk '{print $1}')"
echo "Passordstrategi: http://$(hostname -I | awk '{print $1}')/passordstrategi"
echo "Administrasjon:  http://$(hostname -I | awk '{print $1}')/logg-inn"
echo ""
echo "Innlogging:"
echo "  Brukernavn: marianne eller hanne"
echo "  Passord:    helse2024"
echo ""
echo "Database-passord og SESSION_SECRET er lagret i:"
echo "  $APP_DIR/.env"
echo ""
echo "For a se logger:"
echo "  sudo journalctl -u skolehelsetjenesten -f"
echo ""
