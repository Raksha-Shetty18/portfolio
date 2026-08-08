# 🌌 Raksha  | Full Stack Developer Portfolio

Welcome to my personal portfolio repository! This is a modern, responsive, and highly interactive portfolio website built using the Next.js App Router, custom Vanilla CSS, Prisma, and SQLite. It features a complete administrative console for dynamic updates, smooth scroll-driven transitions, and interactive physics-based background animations.

## 🔗 Live Demo & Links

*   **GitHub Repository**: [https://github.com/Raksha-Shetty18/portfolio](https://github.com/Raksha-Shetty18/portfolio)
*   **Live Demo Website**: [https://raksha-portfolio.vercel.app](https://raksha-portfolio.vercel.app) *(Deploy on Vercel to activate)*
*   **Admin Dashboard**: `/admin/login`

---

## 🎨 Visual Mockup & Screenshots

Here is a visual representation of the website layout, styling, and visual theme:

![Homepage Layout Preview](https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80)

---

## 🚀 Key Features

### 💻 Dynamic Admin Console
Equipped with an authorized admin interface (JWT HttpOnly cookie gated) to perform real-time CRUD:
*   **Projects CRUD**: Add, edit, and delete projects with description, tech tags, GitHub links, and live URLs.
*   **Skills Management**: Define skill category grouping, proficiency slider values, and icons.
*   **Licenses & Certifications CRUD**: Keep your certifications up-to-date dynamically with issuer data and validation links.
*   **Dynamic Site Copy**: Overwrite name, tagline, about introduction bio, education, objective, and technical interests instantly.
*   **Resume PDF Upload**: Upload new PDF resume directly, overwriting the public asset instantly.
*   **Contact Inbox**: View client submissions with email links, timestamps, and spam-clearing delete actions.

### 🌌 Interactive Background & Scroll Animations
*   **Cosmic Shifting Gradient**: A slowly moving animated linear gradient on the page body simulating deep-space gas clouds.
*   **Responsive Particle Network**: HTML5 Canvas particle swarm drawing connections between moving nodes.
*   **Mouse Gravity & Lines**: Canvas particles react to cursor movement, drifting toward it with connecting lines dynamically generated.
*   **Scroll progress bar**: High-end neon loading progress bar integrated at the bottom of the sticky glass navbar.
*   **Card Shimmer Highlights**: Hover light sweep sweep across projects and certificates cards.

---

## 🛠️ Tech Stack

*   **Frontend**: React 19, Next.js 16 (App Router), TypeScript, Vanilla CSS.
*   **Backend API**: Next.js Serverless Routes, JWT Authentication, bcryptjs.
*   **Database & ORM**: Prisma ORM, SQLite (local development), easily scalable to PostgreSQL/MySQL.
*   **Icons**: Lucide React.

---

## ⚙️ Local Development Setup

To run this project locally, execute the following commands in the root directory:

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```text
DATABASE_URL="file:./dev.db"
JWT_SECRET="generate-any-long-secure-random-string-here"
```

### 3. Run Database Migrations
Create tables in the local SQLite file:
```bash
npx prisma migrate dev --name init
```

### 4. Seed Default Database Content
Populate initial projects, skills, certificates, and default copy:
```bash
npx prisma db seed
```

### 5. Start Local Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view.

---

## 📈 Switch to PostgreSQL/MySQL for Production (e.g. Vercel Hosting)

To deploy to Vercel with a persistent cloud database (e.g., Supabase, Neon, AWS RDS):
1. In `prisma/schema.prisma`, change `provider = "sqlite"` to `"postgresql"` (or `"mysql"`).
2. Configure `DATABASE_URL` in Vercel to point to your cloud database connection string.
3. Deploy the repository to Vercel.
4. Run migrations and seed the database once:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

---

## 📄 License

Licensed under the MIT License. Feel free to use it for personal portfolio styling!
