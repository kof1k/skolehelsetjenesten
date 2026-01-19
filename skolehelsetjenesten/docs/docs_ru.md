# Skolehelsetjenesten - Полная документация

## Обзор проекта

**Skolehelsetjenesten** (Школьная медицинская служба) - это веб-приложение для записи учеников на прием к школьной медсестре в Hamar katedralskole (Норвегия).

### Основные функции:
- Запись на прием к медсестре (для учеников)
- Панель администратора для управления записями
- Авторизация с ролями (ученик, медсестра, админ)
- Темная/светлая тема

---

## Архитектура приложения

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│                   (React + TypeScript)                       │
│  ┌─────────┐ ┌──────────┐ ┌─────────┐ ┌──────────────────┐  │
│  │  Home   │ │ Booking  │ │  FAQ    │ │  Admin Panel     │  │
│  └─────────┘ └──────────┘ └─────────┘ └──────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP/API
┌─────────────────────────┴───────────────────────────────────┐
│                        Backend                               │
│                   (Express + TypeScript)                     │
│  ┌─────────────┐ ┌──────────────┐ ┌───────────────────────┐ │
│  │ Auth Routes │ │ Appointments │ │ Session Management    │ │
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

## Структура файлов

```
skolehelsetjenesten/
├── client/                      # Frontend (React)
│   ├── src/
│   │   ├── App.tsx             # Главный компонент, роутинг
│   │   ├── main.tsx            # Точка входа React
│   │   ├── index.css           # Глобальные стили (TailwindCSS)
│   │   ├── components/         # Компоненты UI
│   │   │   ├── header.tsx      # Навигация
│   │   │   ├── footer.tsx      # Подвал
│   │   │   ├── hero-section.tsx
│   │   │   ├── appointment-form.tsx  # Форма записи
│   │   │   ├── nurse-cards.tsx       # Карточки медсестер
│   │   │   ├── theme-provider.tsx    # Провайдер темы
│   │   │   └── ui/             # Компоненты Shadcn/UI
│   │   ├── pages/              # Страницы
│   │   │   ├── home.tsx        # Главная страница
│   │   │   ├── booking.tsx     # Страница записи
│   │   │   ├── admin.tsx       # Админ панель
│   │   │   ├── login.tsx       # Авторизация
│   │   │   ├── faq.tsx         # Часто задаваемые вопросы
│   │   │   ├── services.tsx    # Услуги
│   │   │   └── password-strategy.tsx
│   │   ├── hooks/              # React хуки
│   │   └── lib/                # Утилиты
│   └── index.html
│
├── server/                      # Backend (Express)
│   ├── index.ts                # Точка входа сервера
│   ├── routes.ts               # API маршруты
│   ├── db.ts                   # Подключение к БД
│   ├── storage.ts              # Слой работы с данными
│   ├── vite.ts                 # Vite middleware для dev
│   └── static.ts               # Статические файлы для prod
│
├── shared/                      # Общий код
│   └── schema.ts               # Схема базы данных (Drizzle)
│
├── attached_assets/            # Статические ресурсы
├── vite.config.ts              # Конфигурация Vite
├── drizzle.config.ts           # Конфигурация Drizzle ORM
├── tailwind.config.ts          # Конфигурация TailwindCSS
├── tsconfig.json               # TypeScript конфигурация
└── package.json                # Зависимости и скрипты
```

---

## База данных

### Схема базы данных (PostgreSQL)

#### Таблица `users` (Пользователи)

| Колонка    | Тип      | Описание                           |
|------------|----------|-------------------------------------|
| id         | VARCHAR  | UUID, первичный ключ               |
| username   | TEXT     | Имя пользователя (уникальное)      |
| password   | TEXT     | Хешированный пароль (bcrypt)       |
| role       | TEXT     | Роль: student, nurse, admin        |

#### Таблица `appointments` (Записи на прием)

| Колонка          | Тип       | Описание                          |
|------------------|-----------|-----------------------------------|
| id               | VARCHAR   | UUID, первичный ключ              |
| student_name     | TEXT      | Имя ученика                       |
| class_level      | TEXT      | Класс ученика                     |
| appointment_date | DATE      | Дата приема                       |
| time_slot        | TEXT      | Время приема                      |
| reason           | TEXT      | Причина обращения                 |
| additional_notes | TEXT      | Дополнительные заметки (опц.)     |
| status           | TEXT      | Статус: pending, confirmed, cancelled, completed |
| nurse_id         | TEXT      | ID медсестры (опц.)               |
| created_at       | TIMESTAMP | Дата создания записи              |

### Примеры SQL запросов

```sql
-- Просмотр всех пользователей
SELECT * FROM users;

-- Результат:
-- id                                   | username  | password        | role
-- 550e8400-e29b-41d4-a716-446655440000 | marianne  | $2a$10$...hash  | nurse
-- 550e8400-e29b-41d4-a716-446655440001 | hanne     | $2a$10$...hash  | nurse
-- 550e8400-e29b-41d4-a716-446655440002 | admin     | $2a$10$...hash  | admin

-- Просмотр всех записей
SELECT * FROM appointments ORDER BY created_at DESC;

-- Результат:
-- id         | student_name | class_level | appointment_date | time_slot | reason          | status
-- a1b2c3...  | Ola Nordmann | VG2         | 2024-01-20       | 10:00     | Hodepine        | pending
-- d4e5f6...  | Kari Hansen  | VG1         | 2024-01-21       | 11:30     | Samtale         | confirmed

-- Записи со статусом "ожидает"
SELECT student_name, appointment_date, time_slot, reason 
FROM appointments 
WHERE status = 'pending';

-- Статистика по статусам
SELECT status, COUNT(*) as count 
FROM appointments 
GROUP BY status;

-- Записи за определенный день
SELECT * FROM appointments 
WHERE appointment_date = '2024-01-20';

-- Обновить статус записи
UPDATE appointments 
SET status = 'confirmed' 
WHERE id = 'your-appointment-id';
```

---

## API Endpoints

### Аутентификация

| Метод | Endpoint            | Описание                | Доступ    |
|-------|---------------------|-------------------------|-----------|
| POST  | /api/auth/register  | Регистрация             | Публичный |
| POST  | /api/auth/login     | Вход в систему          | Публичный |
| POST  | /api/auth/logout    | Выход из системы        | Авториз.  |
| GET   | /api/auth/me        | Текущий пользователь    | Авториз.  |

### Записи на прием

| Метод  | Endpoint                     | Описание              | Доступ       |
|--------|------------------------------|-----------------------|--------------|
| GET    | /api/appointments            | Все записи            | nurse/admin  |
| GET    | /api/appointments/:id        | Одна запись           | nurse/admin  |
| POST   | /api/appointments            | Создать запись        | Публичный    |
| PATCH  | /api/appointments/:id/status | Изменить статус       | nurse/admin  |
| DELETE | /api/appointments/:id        | Удалить запись        | nurse/admin  |

### Примеры запросов

```bash
# Регистрация пользователя
curl -X POST http://your-server:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123", "role": "student"}'

# Вход в систему
curl -X POST http://your-server:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "marianne", "password": "helse2024"}' \
  -c cookies.txt

# Создание записи на прием
curl -X POST http://your-server:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "Ola Nordmann",
    "classLevel": "VG2",
    "appointmentDate": "2024-01-25",
    "timeSlot": "10:00",
    "reason": "Hodepine",
    "additionalNotes": "Har hatt vondt i 3 dager"
  }'

# Получить все записи (требуется авторизация как nurse/admin)
curl http://your-server:5000/api/appointments -b cookies.txt

# Обновить статус записи
curl -X PATCH http://your-server:5000/api/appointments/{id}/status \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmed"}' \
  -b cookies.txt
```

---

## Развертывание на Proxmox VM

### Требования к серверу:
- Node.js 20+
- PostgreSQL 14+
- Nginx (для reverse proxy)
- 1GB RAM минимум
- 10GB диска

### Шаг 1: Установка зависимостей

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y nodejs npm postgresql nginx

# Установка Node.js 20 (если нужна новая версия)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### Шаг 2: Настройка PostgreSQL

```bash
# Создание базы данных
sudo -u postgres psql

CREATE DATABASE skolehelsetjenesten;
CREATE USER appuser WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE skolehelsetjenesten TO appuser;
\q
```

### Шаг 3: Клонирование и настройка проекта

```bash
# Клонировать репозиторий
git clone <your-repo-url> /opt/skolehelsetjenesten
cd /opt/skolehelsetjenesten/skolehelsetjenesten

# Установка зависимостей
npm install

# Создание .env файла
cat > .env << EOF
DATABASE_URL=postgresql://appuser:your_secure_password@localhost:5432/skolehelsetjenesten
SESSION_SECRET=your_very_long_random_secret_key_here_at_least_32_chars
SECURE_COOKIES=true
NODE_ENV=production
PORT=5000
EOF

# Применить схему БД
npm run db:push

# Сборка проекта
npm run build
```

### Шаг 4: Создание Systemd сервиса

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
# Активация и запуск сервиса
sudo systemctl daemon-reload
sudo systemctl enable skolehelsetjenesten
sudo systemctl start skolehelsetjenesten

# Проверка статуса
sudo systemctl status skolehelsetjenesten
```

### Шаг 5: Настройка Nginx

```bash
sudo nano /etc/nginx/sites-available/skolehelsetjenesten
```

```nginx
server {
    listen 80;
    server_name your-domain.com;  # или IP адрес

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
# Активация конфигурации
sudo ln -s /etc/nginx/sites-available/skolehelsetjenesten /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Шаг 6: SSL сертификат (опционально)

```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx

# Получение сертификата
sudo certbot --nginx -d your-domain.com
```

---

## Переменные окружения

| Переменная       | Описание                                  | Обязательна |
|------------------|-------------------------------------------|-------------|
| DATABASE_URL     | Строка подключения к PostgreSQL           | Да          |
| SESSION_SECRET   | Секретный ключ для сессий (мин. 32 симв.) | В продакшн  |
| SECURE_COOKIES   | "true" для HTTPS                          | В продакшн  |
| NODE_ENV         | development или production                | Нет         |
| PORT             | Порт сервера (по умолчанию 5000)          | Нет         |

---

## Начальные пользователи

Для создания тестовых медсестер, выполните POST запрос:

```bash
curl -X POST http://your-server:5000/api/seed-nurses
```

Это создаст:
- **marianne** / helse2024 (роль: nurse)
- **hanne** / helse2024 (роль: nurse)

---

## Роли пользователей

| Роль    | Права                                              |
|---------|----------------------------------------------------|
| student | Может создавать записи на прием                    |
| nurse   | Просмотр, подтверждение, отмена записей            |
| admin   | Все права + управление пользователями              |

---

## Устранение неполадок

### Приложение не запускается:
```bash
# Проверить логи
sudo journalctl -u skolehelsetjenesten -f

# Проверить подключение к БД
psql $DATABASE_URL -c "SELECT 1"
```

### Ошибка "DATABASE_URL must be set":
- Убедитесь, что .env файл существует и содержит DATABASE_URL

### Ошибка "Session secret required":
- В продакшене обязательно установите SESSION_SECRET

### Nginx 502 Bad Gateway:
- Проверьте, работает ли Node.js сервер: `systemctl status skolehelsetjenesten`
- Проверьте порт: `netstat -tlnp | grep 5000`

---

## Резервное копирование

```bash
# Бэкап базы данных
pg_dump skolehelsetjenesten > backup_$(date +%Y%m%d).sql

# Восстановление
psql skolehelsetjenesten < backup_20240120.sql
```

---

## Обновление проекта

```bash
cd /opt/skolehelsetjenesten/skolehelsetjenesten
git pull
npm install
npm run build
npm run db:push
sudo systemctl restart skolehelsetjenesten
```

---

## Контакты и поддержка

При возникновении проблем проверьте:
1. Логи приложения: `journalctl -u skolehelsetjenesten`
2. Логи Nginx: `/var/log/nginx/error.log`
3. Подключение к базе данных
