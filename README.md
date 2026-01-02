# HerMindmate

A modern mental health and wellness platform built with Next.js, featuring appointment booking, specialist profiles, and an admin dashboard.

## Features

- 🎯 Specialist booking system
- 👥 User-friendly specialist profiles
- 📅 Appointment scheduling
- 📊 Admin dashboard for managing content
- 💬 Contact form with email notifications
- 🎨 Modern, responsive UI with animations

## Tech Stack

- **Framework**: Next.js 15
- **Database**: Prisma with SQLite (upgradeable to PostgreSQL)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Email**: Resend API
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd hermindmate
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` (or create `.env`)
   - Update the following variables:
     ```
     DATABASE_URL="file:./dev.db"
     RESEND_API_KEY="your_resend_api_key_here"
     NEXT_PUBLIC_SITE_URL="http://localhost:3000"
     ```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and sign in with GitHub
3. Import your repository
4. Configure environment variables:
   - `DATABASE_URL` - Your database connection string
   - `RESEND_API_KEY` - Your Resend API key
   - `NEXT_PUBLIC_SITE_URL` - Your production URL
5. Deploy!

### Database Options for Production

**Option 1: SQLite (Simple, but resets on deploy)**
- Keep `DATABASE_URL="file:./dev.db"`
- Note: Data will be lost on each deployment

**Option 2: PostgreSQL (Recommended for production)**
- Sign up for [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres), [Supabase](https://supabase.com), or [Neon](https://neon.tech)
- Update `DATABASE_URL` with your PostgreSQL connection string
- Run migrations: `npx prisma db push`

## Admin Panel

Access the admin dashboard at `/admin` to manage:
- Specialists and their profiles
- Services offered
- Bookings and appointments
- Site content

## Project Structure

```
hermindmate/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── components/        # React components
│   └── ...
├── prisma/                # Database schema and migrations
├── public/                # Static assets
└── lib/                   # Utility functions
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

Private project

## Support

For questions or support, please contact the development team.
