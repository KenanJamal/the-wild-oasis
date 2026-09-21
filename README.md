# 🏕️ The Wild Oasis

A hotel management dashboard for staff of a small boutique hotel. Employees can manage bookings, cabins, guests' check-ins and check-outs, and track sales and occupancy, all from one place.

## ✨ Features

- **Dashboard** with key stats (bookings, sales, check-ins, occupancy rate), a sales area chart, a stay-duration donut chart, and a "Today" list of guests arriving and departing
- **Date filters** (last 7 / 30 / 90 days) stored in the URL, so views can be bookmarked and shared
- **Bookings** table with filtering by status, sorting, and server-side pagination
- **Booking details** page with check-in (including optional breakfast add-on), check-out, and delete
- **Cabins** management: create, edit, duplicate, and delete cabins with image upload
- **Users**: create new staff accounts
- **Authentication**: login, logout, and protected routes
- **Account page**: update your name, avatar, and password
- **App settings**: configure minimum and maximum nights, max guests per booking, and breakfast price
- **Dark mode** that persists across sessions
- Fully **responsive** UI, with loading spinners, toast notifications, and an error boundary

---

## 🛠️ Tech Stack

| Area                          | Tools                        |
| ----------------------------- | ---------------------------- |
| Framework                     | React (Vite)                 |
| Routing                       | React Router                 |
| Server state                  | TanStack Query (React Query) |
| Styling                       | styled-components            |
| Backend / DB / Auth / Storage | Supabase (PostgreSQL)        |
| Forms                         | React Hook Form              |
| Charts                        | Recharts                     |
| Dates                         | date-fns                     |
| Notifications                 | react-hot-toast              |

---

## 🧠 What I Practiced

- Fetching, caching, and invalidating server data with React Query (`useQuery`, `useMutation`, `invalidateQueries`)
- Keeping UI state such as filters, sorting, and pagination in URL search params
- Building reusable UI with the compound component pattern (Modal, Table, Menus)
- Global state with the Context API (dark mode)
- Authentication flow with Supabase Auth and protected routes
- Writing queries against a PostgreSQL database through the Supabase client, including joins, filters, ranges, and Row Level Security
- Feature-based folder structure and custom hooks that separate data logic from UI

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A free [Supabase](https://supabase.com) project

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/the-wild-oasis.git
cd the-wild-oasis

# 2. Install dependencies
npm install

# 3. Add your environment variables (see below)
cp .env.example .env

# 4. Start the dev server
npm run dev
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_KEY=your-supabase-anon-key
```

You can find both values in your Supabase project under **Project Settings → API**.

### Database Setup

Create these tables in Supabase: `bookings`, `cabins`, `guests`, and `settings`. Create a public storage bucket named `cabin-images` and another named `avatars`. Enable Row Level Security and add policies so that only authenticated users can read and write.

---

## 📁 Project Structure

```
src/
├── features/        # Feature folders: authentication, bookings, cabins,
│                    # check-in-out, dashboard, settings
├── services/        # Supabase API functions
├── ui/              # Reusable UI components
├── hooks/           # Shared custom hooks
├── context/         # Dark mode context
├── pages/           # Route-level pages
├── styles/          # Global styles
└── utils/           # Helpers and constants
```

---

## 📜 Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Create a production build            |
| `npm run preview` | Preview the production build locally |

---

## 🗺️ Roadmap

- [ ] Add tests
- [ ] Build a custom Node.js/Express backend as an alternative to Supabase
- [ ] Add a public-facing booking website for guests

---

## 🙏 Acknowledgements

Built while following Jonas Schmedtmann's [React course](https://www.udemy.com/course/the-ultimate-react-course/). The UI design and project concept come from the course, and I implemented and debugged the app myself.

---
