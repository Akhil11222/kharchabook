# 📒 KharchaBook

**Tera paisa, tera hisaab** — A personal, mobile-first expense tracker built with Next.js 14.

Track your monthly salary and daily expenses with a warm, casual interface that feels like opening your favorite notebook. No sign-up, no backend, no fuss — just your phone and your money.

---

## ✨ Features

- 🎨 **Warm, playful UI** in Bistre Gold, Butter & earthy tones
- 💰 **Salary tracking** with per-month history
- 📊 **Smart spending zones** — Green / Orange / Red based on remaining balance
- ⚡ **Quick expense entry** — just title + amount, that's it
- 📅 **Day-grouped expense records** with delete support
- 📖 **Monthly history** — see every past month at a glance
- 📈 **Smart insights** — daily average, projection, biggest expense, streak
- 🎉 **Confetti celebration** when you save well at month-end
- 🔥 **Spending streak** tracker
- 📤 **WhatsApp-ready share** text generation
- 🔒 **100% local** — all data stored in `localStorage`, never leaves your device

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Run Locally

```bash
# Clone the repo
git clone https://github.com/Akhil11222/kharchabook.git
cd kharchabook

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Deploy to Vercel

This app is fully Vercel-ready with zero configuration needed.

**One-click deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Akhil11222/kharchabook)

**Or via CLI:**

```bash
npm i -g vercel
vercel
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | Framework |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling with custom color palette |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |
| **Google Fonts (Nunito)** | Typography |
| **localStorage** | Data persistence |

---

## 🎨 Color Palette

| Name | Hex | Usage |
|---|---|---|
| Bistre Gold | `#967117` | Primary accent, borders, icons |
| Finch | `#5C7A29` | Green zone, success states |
| Butter | `#FFF1A8` | Backgrounds, card surfaces |
| Indian Red | `#CD5C5C` | Warning zone, delete actions |
| Garnet | `#6E1C1C` | Critical zone, dark accents |

---

## 📱 Data Storage

All data is stored in `localStorage` under the key `kharchabook_data`:

```json
{
  "salary_history": [{ "amount": 25000, "set_on": "2026-11-01T10:00:00" }],
  "expenses": [{
    "id": "uuid",
    "title": "Rent",
    "amount": 8000,
    "date": "2026-11-11",
    "time": "10:32",
    "timestamp": "2026-11-11T10:32:00",
    "month_key": "2026-11"
  }],
  "first_opened": "2026-11-01T09:00:00",
  "spending_streak": { "count": 5, "last_logged_date": "2026-11-11" }
}
```

---

## 📂 Project Structure

```
kharchabook/
├── app/
│   ├── layout.tsx          # Root layout (Nunito font + metadata)
│   ├── page.tsx            # Main app entry + screen routing
│   └── globals.css         # Global styles + Tailwind directives
├── components/
│   ├── LandingScreen.tsx   # Welcome splash screen
│   ├── SalarySetup.tsx     # Salary input screen
│   ├── Dashboard.tsx       # Main dashboard
│   ├── SalaryCard.tsx      # Balance display + zone indicator
│   ├── AddExpenseForm.tsx  # Quick add form
│   ├── ExpenseList.tsx     # Day-grouped expense records
│   ├── MonthHistory.tsx    # Past months accordion
│   ├── SmartInsights.tsx   # Daily avg, projection, biggest expense
│   └── Confetti.tsx        # Celebration animation
├── lib/
│   ├── storage.ts          # localStorage read/write functions
│   ├── calculations.ts     # Balance, zone, projections, averages
│   └── types.ts            # TypeScript interfaces
├── tailwind.config.ts      # Custom color palette
└── README.md
```

---

Made with ❤️ for people who want to track money without the corporate spreadsheet vibes.

*KharchaBook — Bas ek note, teri zindagi ka hisaab.* 📒

