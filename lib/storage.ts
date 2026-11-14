// localStorage read/write helpers for KharchaBook

import { KharchaBookData, Expense, SalaryEntry } from './types';

const STORAGE_KEY = 'kharchabook_data';

export function loadData(): KharchaBookData {
  if (typeof window === 'undefined') {
    return getDefaultData();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultData();
    const parsed = JSON.parse(raw) as KharchaBookData;
    // Migrate: ensure spending_streak exists
    if (!parsed.spending_streak) {
      parsed.spending_streak = { count: 0, last_logged_date: '' };
    }
    return parsed;
  } catch {
    return getDefaultData();
  }
}

export function saveData(data: KharchaBookData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    console.error('Failed to save to localStorage');
  }
}

function getDefaultData(): KharchaBookData {
  return {
    salary_history: [],
    expenses: [],
    first_opened: new Date().toISOString(),
    spending_streak: { count: 0, last_logged_date: '' },
  };
}

export function initData(): KharchaBookData {
  const existing = loadData();
  if (!existing.first_opened || existing.first_opened === getDefaultData().first_opened) {
    // first open
    const data: KharchaBookData = {
      ...existing,
      first_opened: new Date().toISOString(),
    };
    saveData(data);
    return data;
  }
  return existing;
}

export function setSalary(amount: number): KharchaBookData {
  const data = loadData();
  const entry: SalaryEntry = {
    amount,
    set_on: new Date().toISOString(),
  };
  data.salary_history = [...data.salary_history, entry];
  saveData(data);
  return data;
}

export function addExpense(expense: Expense): KharchaBookData {
  const data = loadData();
  data.expenses = [expense, ...data.expenses];

  // Update spending streak
  const today = expense.date;
  const streak = data.spending_streak ?? { count: 0, last_logged_date: '' };
  if (streak.last_logged_date === today) {
    // already logged today, streak unchanged
  } else {
    const yesterday = getYesterday(today);
    if (streak.last_logged_date === yesterday) {
      streak.count += 1;
    } else {
      streak.count = 1;
    }
    streak.last_logged_date = today;
  }
  data.spending_streak = streak;

  saveData(data);
  return data;
}

function getYesterday(dateStr: string): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function deleteExpense(id: string): KharchaBookData {
  const data = loadData();
  data.expenses = data.expenses.filter((e) => e.id !== id);
  saveData(data);
  return data;
}

export function getCurrentSalary(data: KharchaBookData): number {
  if (data.salary_history.length === 0) return 0;
  return data.salary_history[data.salary_history.length - 1].amount;
}

export function getSalaryForMonth(data: KharchaBookData, monthKey: string): number {
  // Find the salary that was active at the start of this month
  const monthStart = new Date(monthKey + '-01T00:00:00');
  const applicable = data.salary_history.filter(
    (s) => new Date(s.set_on) <= monthStart
  );
  if (applicable.length === 0) {
    // Use the first salary entry if month predates all salary entries
    if (data.salary_history.length === 0) return 0;
    return data.salary_history[0].amount;
  }
  return applicable[applicable.length - 1].amount;
}

export function getExpensesForMonth(data: KharchaBookData, monthKey: string): Expense[] {
  return data.expenses.filter((e) => e.month_key === monthKey);
}

export function getCurrentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export function getAllMonthKeys(data: KharchaBookData): string[] {
  const keys = new Set<string>();
  data.expenses.forEach((e) => keys.add(e.month_key));
  // Also add months from salary history
  data.salary_history.forEach((s) => {
    const d = new Date(s.set_on);
    keys.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  });
  // Sort descending
  return Array.from(keys).sort((a, b) => b.localeCompare(a));
}

