# Together Support Platform v1

Professional supported accommodation website and platform for Together Support Ltd.

## Included
- React + Vite + TypeScript public website
- Logo in `/public/logo.png`
- Available Properties section with 34 Milsom Street
- Referral form, landlord enquiry form and contact form UI
- Staff dashboard preview
- Supabase starter schema in `/supabase/schema.sql`

## Run locally
```bash
npm install
npm run dev
```

## Supabase setup
1. Create a Supabase project.
2. Open SQL Editor.
3. Paste and run `supabase/schema.sql`.
4. Copy `.env.example` to `.env` and add your Supabase URL and anon key.

## Deploy
Push this project to GitHub, then connect the repository to Vercel.

## Next build stage
- Connect forms to Supabase inserts
- Add Supabase Auth for staff dashboard
- Add property CRUD admin screens
- Add image upload to Supabase Storage
- Add email notifications
