# GOAT Notes

A modern, full-stack note-taking app built with Next.js, Prisma, Supabase, and Sonner for toast notifications.  
This project is inspired by the [freeCodeCamp GOAT Notes tutorial](https://www.youtube.com/watch?v=6ChzCaljcaI) and follows best practices for scalable, type-safe, and user-friendly web applications.

---

## Features

- **User Authentication** (Supabase)
- **Create, Edit, and Delete Notes**
- **Real-time UI updates**
- **Debounced note saving**
- **Responsive Sidebar**
- **Toast notifications** (Sonner)
- **Modern UI** (Shadcn UI, Tailwind CSS)
- **PostgreSQL database** (via Prisma ORM)
- **Cross-platform environment variable support** (`dotenv-cli`)
- **AI integration ready** (Gemini/OpenAI API keys supported, official Gemini SDK)

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/goat-notes.git
cd goat-notes
```

### 2. Install Dependencies

```sh
npm install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root with the following (replace with your own credentials):

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional: For AI features
GEMINI_API_KEY=your-gemini-api-key
```

- Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).
- For more on Gemini SDK setup, see [Gemini Node.js Quickstart](https://ai.google.dev/gemini-api/docs/quickstart?lang=node).

### 4. Set Up the Database

Generate and migrate your database schema:

```sh
npm run migrate
```

> **Note:** This project uses [`dotenv-cli`](https://www.npmjs.com/package/dotenv-cli) to load `.env.local` for Prisma commands, ensuring cross-platform compatibility.

### 5. Run the Development Server

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
  actions/         # Server actions (login, signup, notes, AI)
  app/             # Next.js app directory (App Router)
  components/      # React components (Sidebar, NoteTextInput, etc.)
  db/              # Prisma schema and client
  hooks/           # Custom React hooks
  lib/             # Utility functions
  styles/          # Global styles
```

---

## Scripts

| Script      | Description                        |
|-------------|------------------------------------|
| dev         | Start the development server       |
| build       | Build the app for production       |
| start       | Start the production server        |
| lint        | Run ESLint                         |
| migrate     | Generate and run Prisma migrations |

---

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.com/)
- [Sonner](https://sonner.emilkowal.ski/) (toast notifications)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [dotenv-cli](https://www.npmjs.com/package/dotenv-cli) (for cross-platform env support)
- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) (official Gemini SDK)

---

## AI Integration (Gemini)

- The app supports AI-powered note Q&A using the [Gemini API](https://ai.google.dev/gemini-api/docs/quickstart?lang=node).
- To enable, add your `GEMINI_API_KEY` to `.env.local` and ensure `@google/generative-ai` is installed:
  ```sh
  npm install @google/generative-ai
  ```
- See [Gemini API docs](https://ai.google.dev/gemini-api/docs/libraries?lang=node) for more info.

---

## Troubleshooting

- **Database connection issues:**  
  Ensure your `DATABASE_URL` is correct and your network allows outbound connections to your Supabase database (port 5432). Some corporate networks may block this port.
- **Environment variables not loading:**  
  Make sure `.env.local` is in your project root and you are using `dotenv-cli` for Prisma commands.
- **Sidebar not updating instantly:**  
  The sidebar updates on navigation to a new note. For real-time updates, consider using client-side state management or a data fetching library.

---
## Future Updates

### Rich Text Editing with Tiptap

We plan to enhance the note-taking experience by integrating [Tiptap](https://tiptap.dev/), a powerful and extensible rich text editor for React. This will allow users to create and edit notes with formatting, lists, headings, and more—moving beyond plain text to a modern, rich text experience.

**Migration Plan Highlights:**
- Update the database to store Tiptap's JSON document format.
- Replace the current note input and display components with Tiptap's editor and renderer.
- Seamlessly migrate existing plain text notes to the new format.
- Enable features like bold, italic, lists, and more, with potential for future collaborative editing.

Stay tuned for this upgrade to make your notes more expressive and interactive!

---

## Credits

- [freeCodeCamp.org](https://www.youtube.com/@freecodecamp)
- [ColeBlender/goat-notes](https://github.com/ColeBlender/goat-notes) (original repo)

---

## License

MIT
