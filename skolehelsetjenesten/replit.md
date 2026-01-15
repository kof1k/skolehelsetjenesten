# Skolehelsetjenesten - Hamar katedralskole

A school health service website for Hamar katedralskole (Norwegian high school).

## Project Overview

This is a fullstack web application for the school health service (Skolehelsetjenesten) that provides:

- **Homepage** with information about school health services
- **Services page** detailing available health services
- **FAQ & Resources** with frequently asked questions and helpful links
- **Appointment Booking** system for students to book appointments with nurses
- **Password Strategy** information page for IT security awareness (Windows Server integration)

## Technology Stack

- **Frontend**: React with TypeScript, Tailwind CSS, Shadcn/UI components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation
- **Data Fetching**: TanStack Query

## Database Schema

### Users Table
- `id` (varchar, UUID primary key)
- `username` (text, unique)
- `password` (text)
- `role` (text: "student", "nurse", "admin")

### Appointments Table
- `id` (varchar, UUID primary key)
- `studentName` (text)
- `classLevel` (text: Vg1, Vg2, Vg3, Påbygg)
- `appointmentDate` (date)
- `timeSlot` (text)
- `reason` (text)
- `additionalNotes` (text, optional)
- `status` (text: pending, confirmed, cancelled, completed)
- `nurseId` (text, optional)
- `createdAt` (timestamp)

## API Endpoints

- `GET /api/appointments` - List all appointments
- `GET /api/appointments/:id` - Get single appointment
- `POST /api/appointments` - Create new appointment
- `PATCH /api/appointments/:id/status` - Update appointment status
- `DELETE /api/appointments/:id` - Delete appointment

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, services, nurse info, contact |
| `/tjenester` | Services overview page |
| `/faq` | FAQ and resources page |
| `/bestill-time` | Appointment booking form |
| `/passordstrategi` | Password strategy information page |

## Design

- **Colors**: Green theme matching Hamar katedralskole branding (HSL 157)
- **Fonts**: Inter and Plus Jakarta Sans
- **Theme**: Light/Dark mode support
- **Responsive**: Mobile-first design with responsive breakpoints

## School Nurses

- **Marianne Buvik**: Phone 902 69 665
- **Hanne Krøtøy**: Phone 912 48 594

## Office Hours

- Monday: 09-14
- Tuesday: 09-14
- Wednesday: 09-13
- Thursday: 09-14
- Friday: 09-11

## Location

3. etasje i fløy 1 ved Elevtjenesten, Ringgata 235, 2315 Hamar

## Authentication

The site includes a nurse/admin authentication system:

**Nurse Accounts (seeded):**
- Username: `marianne`, Password: `helse2024`
- Username: `hanne`, Password: `helse2024`

**Admin Panel Features:**
- View all appointments with statistics
- Filter by status (pending, confirmed, cancelled, completed)
- Change appointment status
- Delete appointments

**Routes:**
- `/logg-inn` - Login page
- `/admin` - Admin panel (requires authentication)

## Running the Project

```bash
npm run dev        # Start development server
npm run db:push    # Push database schema changes
```

To seed nurse accounts after fresh database:
```bash
curl -X POST http://localhost:5000/api/seed-nurses
```

## Windows Server Integration

The `/passordstrategi` page provides password strategy information designed to be set as the browser start page for users logging into the Windows Server domain. This page covers:

- Password complexity requirements
- Common password mistakes
- Windows Server Active Directory password policies
- Two-factor authentication recommendations
