# 💪 Micro Workout

A full-stack fitness app that delivers **random 5–7 minute workouts** based on user preferences, with streaks, badges, and weekly analytics.

Built to demonstrate:
- Authentication
- Relational database design
- Server Actions
- Analytics queries
- Gamified UX

---

## 🚀 Features

### 🔐 Authentication
- Email + Password login (NextAuth Credentials)
- JWT-based sessions
- Protected routes via middleware

### 🎰 Workout Roulette
- Random workout selection
- Filters by:
  - Difficulty
  - Target muscle
  - Equipment
- Smooth spin animation (Framer Motion)

### 📊 Weekly Summary
- Total workouts
- Total minutes
- Workouts per day (Bar Chart)
- Muscle group distribution (Pie Chart)

### 🏅 Gamification
- Current & best streaks
- Achievement badges:
  - 3-day streak
  - 7-day streak
  - 10 workouts
  - All muscles trained
- Confetti celebration on badge unlock 🎉

### ⚙️ Preferences
- Save workout preferences per user
- Roulette automatically respects preferences

---

## 🧱 Tech Stack

### Frontend
- **Next.js 16 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Recharts**

### Backend
- **Next.js Server Actions**
- **Prisma ORM**
- **PostgreSQL**

### Auth
- **NextAuth v4**
- Credentials provider
- JWT session strategy

---

## 🗄️ Database Schema

Key models:

- `User`
- `UserPreference`
- `Workout`
- `Exercise`
- `WorkoutExercise`
- `WorkoutLog`

Relationships:
- User ↔ Preferences (1:1)
- Workout ↔ Exercise (Many-to-Many)
- User ↔ WorkoutLog (1:N)

---

## 🧠 Architecture Overview

                                                   ┌──────────────┐
                                                   │ Browser      │
                                                   │ (React UI)   │
                                                   └──────┬───────┘
                                                          │
                                                          ▼
                                             ┌─────────────────────────┐
                                             │ Next.js App Router      │
                                             │ • Server Components     │
                                             │ • Client Components     │
                                             │ • Server Actions        │
                                             └──────-──────────────────┘
                                                          │
                                                          ▼
                                             ┌─────────────────────────┐
                                             │ Authentication          │
                                             │ NextAuth (JWT)          │
                                             │ • signIn / signOut      │
                                             │ • Middleware protection │
                                             └──────-──────────────────┘
                                                          │
                                                          ▼
                                             ┌─────────────────────────┐
                                             │ Prisma ORM              │
                                             │ • Typed DB queries      │
                                             │ • Relations             │
                                             └──────-──────────────────┘
                                                          │
                                                          ▼
                                             ┌─────────────────────────┐
                                             │ PostgreSQL Database     │
                                             │ • Users                 │
                                             │ • Workouts              │
                                             │ • Logs                  │
                                             │ • Preferences           │
                                             └─────────────────────────┘


## 🔄 Data Flow Example (Roulette)

1. User clicks **SPIN**
2. Server Action:
   - Reads user session
   - Fetches preferences
   - Filters workouts
   - Selects random workout
3. Workout returned to client
4. User completes workout
5. Workout logged in DB
6. Streaks & badges recomputed dynamically

---

## 🧪 Local Development

### 1️⃣ Install dependencies
```bash
pnpm install

2️⃣ Set environment variables
DATABASE_URL=postgresql://user:password@localhost:5432/microWorkout
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000

3️⃣ Migrate DB
npx prisma migrate dev

4️⃣ Seed workouts
npx prisma db seed

5️⃣ Run app
pnpm dev
