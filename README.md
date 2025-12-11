---

# Micro Workout App

A small full-stack fitness app where users can “spin” to get a random 5–7 minute workout.
Built with **Next.js, Prisma, PostgreSQL, TailwindCSS**, and **NextAuth**.

## Features

* Random workout generator
* Exercises inside each workout
* User preferences (difficulty, target muscle, equipment)
* Workout logging
* Weekly summary
* Authentication (NextAuth)

## Tech Stack

* Next.js (App Router)
* Prisma ORM
* PostgreSQL
* TailwindCSS
* NextAuth
* PNPM

## Setup

1. Clone the project:

```bash
git clone https://github.com/<your-username>/micro_workout.git
cd micro-workout-app
```

2. Install dependencies:

```bash
pnpm install
```

3. Create `.env`:

```
DATABASE_URL="your postgres url"
NEXTAUTH_SECRET="your secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Run DB migrations:

```bash
pnpm exec prisma migrate dev
```

5. Seed data:

```bash
pnpm exec prisma db seed
```

6. Start dev server:

```bash
pnpm dev
```

---

If you want, I can also make **README with screenshots**, **badges**, or a **professional version**.
