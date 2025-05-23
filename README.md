# Cloud Photo Drive

A simple cloud-based photo drive app built using React and Supabase. Users can upload images into custom categories, and view them later by category. Authentication and storage handled by Supabase.

## Features

- 📸 Upload photos to cloud storage
- 🗂️ Organize photos into categories
- 🔐 User authentication
- 🌐 Real-time updates with Supabase
- 🎨 Clean modern UI with CSS custom styling

## Tech Stack

- React
- Supabase (Auth + Storage + Postgres)
- Node.js
- Cloudinary (optional for image optimization)

## Getting Started

1. Clone the repo:
```bash
git clone https://github.com/your-username/cloud-photo-drive.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up `.env` file:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the app:
```bash
npm run dev
```

## Database Schema

### `categories` Table
- `id` (uuid)
- `name` (text)
- `user_id` (uuid)

### `photos` Table
- `id` (uuid)
- `url` (text)
- `category_id` (uuid)
- `user_id` (uuid)
- `created_at` (timestamp)

## License

MIT
