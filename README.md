# TaskFlow 🚀

TaskFlow is a premium, modern project management application designed for high-performance teams. It features a beautiful, responsive interface with drag-and-drop Kanban boards, real-time updates, and secure authentication.

[**View Live Demo**](https://taskflow-gold.vercel.app/)

## ✨ Features

- **Authentication**: Secure email/password login and registration using [Better Auth](https://better-auth.com).
- **Kanban Board**: Intuitive drag-and-drop task management powered by `@hello-pangea/dnd`.
- **Modern UI**: Polished "Royal Indigo" theme with gradients, glassmorphism, and smooth animations using Tailwind CSS and Framer Motion.
- **Database**: Robust data persistence with PostgreSQL (via Neon) and Prisma ORM.
- **Responsive**: Fully optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Auth**: Better Auth
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL Database (e.g., local or [Neon](https://neon.tech))

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/sammed384/Dugsiiye_TaskFlow_Project_NextJS.git
    cd Dugsiiye_TaskFlow_Project_NextJS
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory:

    ```env
    DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
    BETTER_AUTH_SECRET="your-super-secret-key"
    BETTER_AUTH_URL="http://localhost:3000"
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ```

4.  **Run Database Migrations:**

    ```bash
    npx prisma db push
    ```

5.  **Start the Development Server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Add the required Environment Variables (`DATABASE_URL`, `BETTER_AUTH_SECRET`, `NEXT_PUBLIC_APP_URL`).
4.  Deploy!

> **Note:** Ensure you are using a PostgreSQL database (like Neon) for production, as SQLite is not suitable for serverless environments.
