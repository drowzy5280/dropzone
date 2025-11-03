# Dropzone — Fortnite Stat Tracker + Coaching Dashboard
Land smart. Win more. Player stats, trends, and personalized coaching plans.

## Stack
Next.js 14, Tailwind + shadcn/ui, Prisma, NextAuth, Stripe, Zod, Recharts

## Local Setup (Quick)

### 1) Install dependencies
```bash
pnpm i
```

### 2) Create .env (already scaffolded)
The `.env` file is already created with placeholders. You need to fill in the required values.

### 3) Generate a secret
```bash
pnpm gen:secret
```
Copy the output into `NEXTAUTH_SECRET=` in `.env`.

### 4) Fill required API keys in .env

Edit `.env` and fill in:
- `FORTNITE_API_IO_KEY` (from [fortniteapi.io](https://fortniteapi.io))
- `FORTNITE_API_COM_KEY` (from [fortnite-api.com](https://fortnite-api.com))
- `STRIPE_SECRET_KEY` (Dashboard → Developers → API keys)
- `STRIPE_PRICE_ID` (Dashboard → Products → Price)

**Optional:** Switch to Postgres later by changing `DATABASE_PROVIDER` and `DATABASE_URL`.

### 5) Sanity check
```bash
pnpm env:doctor
```
This will verify all required environment variables are set.

### 6) Database
```bash
pnpm db:migrate
```
This creates the SQLite database and runs migrations.

### 7) Run the app
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000)

### 8) (Optional) Stripe webhooks for local dev
In a separate terminal:
```bash
pnpm stripe:webhook
```
Copy the printed `whsec_...` into `.env` as `STRIPE_WEBHOOK_SECRET=whsec_...`

---

## Endpoints

- `GET /api/player?username=NAME` — resolve Epic ID + fetch stats + store snapshot
- `POST /api/coach/plan` `{ epicId, username? }` — returns `{ planId }`
- `/plan/[id]` — coaching plan
- `/pro` — upgrade page

## Helper Scripts

- `pnpm gen:secret` — Generate a random secret for NextAuth
- `pnpm env:doctor` — Check if all required env vars are set
- `pnpm env:print` — Print the current .env file
- `pnpm db:push` — Push schema changes to database without migration
- `pnpm db:migrate` — Create and run migrations
- `pnpm db:seed` — Seed the database (optional)
- `pnpm stripe:webhook` — Start Stripe CLI webhook forwarding

## Notes

- Third-party APIs are rate-limited; snapshots provide basic caching.
- Trend charts use illustrative last-20 until real match logs are integrated.
- Epic OAuth can be added later; manual link stub lives at `/me/links`.
- The player page has a refresh button with a 60-second cooldown to prevent API abuse.

## Deployment

Ready for Vercel deployment:
1. Push to GitHub
2. Import to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

## New-match notifications
- We added `sonner` for toasts. A toast appears on the player page when new recent matches are detected (via background refresh every ~90s).

## Multi-match inference
- When multiple matches are detected between polls, Dropzone now writes one `MatchSnapshot` per match, distributing kills and wins across them.

## Value Pack Features
- Streaks (win/kill), daily stats, mini trend chips
- Highlights & mode badge heuristics
- Grades (placement, KD, aggression, consistency)
- Radar skill chart (Aggression/Survival/Rotation/Game Sense/Consistency)
- Time-of-day performance buckets
- Watchlist (follow players)
- Match notes per match
- Shareable match card (OG image at /og/match?matchId=...)
- Clip reminder + YouTube title helper on big games

### Per-Match Placement & Trend Chips
- `MatchSnapshot` now supports `placement` (exact), `placementBucket`, and `placementSource`.
- If `EXPERIMENTAL_INFER_PLACEMENT=true`, we assign a conservative bucket from kills+win when exact placement is unknown.
- Summary API now returns trend chips comparing last 10 vs previous 10 `PlayerSnapshot`s: `kdDelta10`, `winRateDelta10`, `killsAvgDelta10`.
- Player page renders these trend chips and shows placement (or bucket) in the Recent Matches table.

## Production Env (Ads-only)
Required:
- NEXTAUTH_URL=https://yourdomain.com
- NEXTAUTH_SECRET=generate_new_secure_secret
- FORTNITE_API_IO_KEY=...
- FORTNITE_API_COM_KEY=...
- NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
- NEXT_PUBLIC_ADSENSE_SLOT_HOME=##########
- NEXT_PUBLIC_ADSENSE_SLOT_GUIDES_TOP=##########
- NEXT_PUBLIC_ADSENSE_SLOT_GUIDES_MID=##########
