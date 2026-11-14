// TypeScript interfaces for KharchaBook

export interface SalaryEntry {
  amount: number;
  set_on: string; // ISO 8601
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;        // "YYYY-MM-DD"
  time: string;        // "HH:MM"
  timestamp: string;   // ISO 8601
  month_key: string;   // "YYYY-MM"
}

export interface KharchaBookData {
  salary_history: SalaryEntry[];
  expenses: Expense[];
  first_opened: string; // ISO 8601
  spending_streak?: {
    count: number;
    last_logged_date: string; // "YYYY-MM-DD"
  };
}

export type SpendingZone = 'green' | 'orange' | 'red';

export interface MonthSummary {
  month_key: string;         // "YYYY-MM"
  month_label: string;       // "November 2026"
  salary: number;
  total_spent: number;
  saved: number;
  expenses: Expense[];
  status: 'saved' | 'tight' | 'overspent';
}

export interface SmartInsights {
  avgPerDay: number;
  daysRemaining: number | null; // days until balance hits 0, null if not applicable
  biggestExpense: Expense | null;
  totalEntries: number;
  showCelebration: boolean;
  spendingStreak: number;
  balance: number;
  zone: SpendingZone;
  zonePercent: number;
}

