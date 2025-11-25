# Vinyl Signs E-commerce App

A full-featured e-commerce application for custom vinyl signs built with Next.js, TypeScript, Tailwind CSS, Supabase, and Stripe.

## Features

- 🛍️ Product catalog with customization options
- 🛒 User-specific shopping cart (persistent across devices)
- 🔐 Supabase authentication with user roles
- 💳 Stripe payment integration
- 📊 Admin dashboard for order management
- 👤 User dashboard with order history
- 🎨 Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL database + Auth)
- **Payments**: Stripe
- **State Management**: React Context

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd sign-designs
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project's SQL Editor
3. Run the SQL from `supabase-setup.sql` to create tables and policies
4. Go to Settings > API to get your project URL and anon key

### 3. Environment Variables

Update `.env.local` with your actual credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 4. Create Admin User

After setting up authentication, you'll need to manually set a user as admin in the database:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'your-admin-email@example.com';
```

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

## Database Schema

The app uses the following tables:

- `profiles` - User profiles (extends Supabase auth.users)
- `products` - Product catalog
- `orders` - Order records
- `carts` - Persistent user carts

## API Routes

- `GET/POST /api/orders` - Order management
- `PATCH /api/orders/[id]` - Update order status
- `/api/create-checkout-session` - Stripe checkout

## Authentication

The app uses Supabase Auth with Row Level Security (RLS) policies to ensure users can only access their own data.

## Deployment

1. Deploy to Vercel/Netlify
2. Set environment variables in your hosting platform
3. Update Stripe webhook URLs if needed
4. Ensure Supabase allows connections from your domain
