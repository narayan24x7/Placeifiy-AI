# Placeifiy-AI

AI‑powered mock interview platform built with **Next.js 14 (App Router)**, **Clerk** authentication, **Drizzle ORM** on **Neon Postgres**, and **Google Gemini 1.5** for question generation and feedback.

> **Status**: Active development · Last updated August 19, 2025

---

## ✨ Features

- 🔐 **Authentication** with Clerk (Sign in/up flows, protected dashboard)
- 🧠 **AI question generation** using Google Gemini 1.5
- 🎥 **Webcam support** with `react-webcam` for recording answers
- 🗃️ **Persistent data** via Drizzle ORM + Neon serverless Postgres
- 🧾 **Interview history** with start/resume & delete
- ✅ **Automated feedback & ratings** per question, with a detailed feedback page
- 🎛️ **Responsive UI** built with Tailwind CSS and shadcn/ui components

---

## 🧱 Tech Stack

- **Frontend**: Next.js 14, React 18, App Router, Tailwind CSS, shadcn/ui
- **Auth**: Clerk (`@clerk/nextjs`)
- **AI**: Google Gemini via `@google/generative-ai`
- **DB/ORM**: Neon Postgres + Drizzle ORM (`drizzle-orm`, `drizzle-kit`)
- **Misc**: `react-webcam`, `lucide-react`, `moment`

---

## 📦 Scripts

```bash
# install deps
npm install

# run dev server
npm run dev

# build / start
npm run build
npm run start

# drizzle
npm run db:push     # push schema to database
npm run db:studio   # open Drizzle Studio
```

---

## 🔧 Configuration

Create a `.env.local` at the project root and set the following variables:

```bash
# === Google Gemini ===
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# === Neon / Drizzle ===
NEXT_PUBLIC_DRIZZLE_DB_URL=postgres://user:password@host/db

# === Clerk ===
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# If you deploy on Vercel, set these in Project → Settings → Environment Variables
```

> The database connection is read in `utils/db.js`. AI chat session is configured in `utils/GeminiAIModal.js`. Table schemas live in `utils/schema.js`.

---

## 🗂️ Project Structure

```
app/
  (auth)/sign-in/[[...sign-in]]/page.jsx   # Clerk auth routes
  dashboard/                               # main application area
    _components/                           # dashboard UI & logic
    interview/[interviewId]/               # interview flow
      page.jsx                             # interview overview & webcam enable
      start/page.jsx                       # Q&A flow
      feedback/page.jsx                    # feedback & ratings
components/ui/                             # shadcn/ui components
lib/                                       # helpers
public/                                    # assets
utils/
  db.js                                    # Drizzle + Neon client
  schema.js                                # Drizzle table schemas
  GeminiAIModal.js                         # Gemini 1.5 config & chat session
```

---

## 🚀 Getting Started (Local)

1. **Install dependencies**  
   ```bash
   npm install
   ```

2. **Configure environment**  
   Create `.env.local` with the variables in the **Configuration** section.

3. **Prepare the database**  
   - Ensure your Neon DB is created.
   - Push the schema:
     ```bash
     npm run db:push
     npm run db:studio  # optional: inspect tables
     ```

4. **Run the dev server**  
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

---

## 🧪 How It Works

- From the **Dashboard**, click **“Create New Interview”** and fill in:
  - Job position, description, and years of experience
- The app requests **Gemini** to generate a structured set of questions.
- Start the interview:
  - Toggle **webcam** access (optional if you only want text answers).
  - Navigate questions, record/submit your answers.
- After finishing, open **Feedback** to see:
  - Model’s suggested answer, your answer, rating, and comments.

---

## 🔐 Security Notes

- Do **not** commit secrets. Use `.env.local` for local development and platform secrets in production.
- See [`SECURITY.md`](./SECURITY.md) for responsible disclosure guidelines.

---

## 🛠 Troubleshooting

- **Auth callback errors**: double‑check Clerk URLs and keys.
- **DB connection issues**: verify `NEXT_PUBLIC_DRIZZLE_DB_URL` and IP allow‑lists in Neon.
- **AI errors**: ensure `NEXT_PUBLIC_GEMINI_API_KEY` is valid and has access to Gemini 1.5.
- **Webcam blocked**: clear browser permissions and use https (or localhost).

---

## 📦 Deployment

- **Vercel** is recommended for Next.js projects.
- Add all environment variables in the Vercel dashboard.
- Ensure Neon connection string is reachable from Vercel.

---

## 🗺️ Roadmap

- [ ] Export interview reports as PDF
- [ ] Custom question banks per role
- [ ] Multi‑language support
- [ ] Fine‑grained scoring rubric controls
- [ ] Team workspaces

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a PR.  
When contributing, follow conventional commits and run `npm run lint`.

---

## 📄 License

This project currently has **no license** file. If you plan to open‑source, consider adding an OSI‑approved license (e.g., MIT).

---
