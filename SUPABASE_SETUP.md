# Supabase Integration Guide — Warmthplace Art Studio

Warmthplace Art Studio is engineered with native support for **Supabase** (PostgreSQL) for production data storage, auth, and asset storage.

---

## 1. Quick Setup (3 Steps)

### Step 1: Copy your Supabase Connection Strings
In your Supabase project dashboard ([supabase.com/dashboard](https://supabase.com/dashboard)):
1. Navigate to **Project Settings** (gear icon) -> **Database**.
2. Scroll to the **Connection String** section and select **URI** (or Prisma):
   - **Transaction Pooler (Port 6543)** — Used for runtime operations:
     ```
     postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
     ```
   - **Direct Connection (Port 5432)** — Used by Prisma for schema push and migrations:
     ```
     postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
     ```

### Step 2: Configure `.env`
Update your `.env` file with your credentials:

```bash
# ─── Supabase PostgreSQL ──────────────────────────────────────
DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

# ─── Supabase Client Keys ────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..."
```

### Step 3: Push Schema & Seed Initial Catalogue
Run the following commands in the terminal:

```bash
# Push tables to Supabase Postgres
npm run db:supabase:push

# Populate sample gallery artworks, artists, collections, and shipping zones
npm run db:supabase:seed
```

---

## 2. Switching `schema.prisma` Permanently to PostgreSQL

If you wish to make PostgreSQL the default datasource for `prisma db push` without specifying the schema flag, edit `prisma/schema.prisma`:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

Then run:
```bash
npx prisma generate
```

---

## 3. Using Supabase Storage for Artworks & Imagery

The project already provides `@supabase/supabase-js` and helper methods in `lib/supabase.ts`:

```typescript
import { supabase, getSupabaseServerClient } from "@/lib/supabase";

// Upload artwork photo directly to Supabase Storage bucket 'artworks'
const { data, error } = await supabase.storage
  .from("artworks")
  .upload(`originals/${filename}`, file);

const publicUrl = supabase.storage
  .from("artworks")
  .getPublicUrl(`originals/${filename}`).data.publicUrl;
```

---

## 4. Useful NPM Scripts

| Command | Action |
|---|---|
| `npm run db:supabase:push` | Pushes the full schema to your Supabase PostgreSQL instance |
| `npm run db:supabase:seed` | Populates the database with the 12 catalogue items, 4 artists, and shipping zones |
| `npm run db:supabase:studio` | Opens Prisma Studio GUI connected to Supabase |
| `npm run dev` | Runs the Next.js development server |
