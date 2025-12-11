Micro Workout App

A simple full-stack fitness app where users can spin to get a random 5–7 minute workout.
Built with Next.js, Prisma, PostgreSQL, TailwindCSS, and NextAuth.

Features

Random workout generator

User preferences (difficulty, target muscle, equipment)

Workout logging

Weekly summary

Authentication (NextAuth)

Tech Stack

Next.js (App Router)

Prisma ORM

PostgreSQL

TailwindCSS

NextAuth

PNPM

Setup
1. Clone the project
git clone https://github.com/<your-username>/micro_workout.git
cd micro-workout-app

2. Install dependencies
pnpm install

3. Create a .env file
   
DATABASE_URL="your-postgres-url"

NEXTAUTH_SECRET="your-secret"

NEXTAUTH_URL="http://localhost:3000"

5. Run Prisma migrations
   
pnpm exec prisma migrate dev

5. Seed the database
   
pnpm exec prisma db seed

6. Start the development server
   
pnpm dev
