// Calculation helpers for KharchaBook

import { KharchaBookData, Expense, SpendingZone, MonthSummary, SmartInsights } from './types';
import {
  getExpensesForMonth,
  getSalaryForMonth,
  getCurrentSalary,
  getCurrentMonthKey,
  getAllMonthKeys,
} from './storage';

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function getMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
}

export function getSpendingZone(remainingPercent: number): SpendingZone {
  if (remainingPercent >= 60) return 'green';
  if (remainingPercent >= 30) return 'orange';
  return 'red';
}

export function getZoneConfig(zone: SpendingZone) {
  switch (zone) {
    case 'green':
      return {
        color: 'bg-finch',
        textColor: 'text-finch',
        borderColor: 'border-finch',
        message: 'Mast chal raha hai! 🟢',
        bgLight: 'bg-finch/10',
      };
    case 'orange':
      return {
        color: 'bg-indian-red',
        textColor: 'text-indian-red',
        borderColor: 'border-indian-red',
        message: 'Thoda sambhal yaar 🟡',
        bgLight: 'bg-indian-red/10',
      };
    case 'red':
      return {
        color: 'bg-garnet',
        textColor: 'text-garnet',
        borderColor: 'border-garnet',
        message: 'Bhai ruk ja! 🔴 Kharcha zyada ho gaya',
        bgLight: 'bg-garnet/10',
      };
  }
}

export function getDaysElapsedThisMonth(): number {
  const now = new Date();
  return now.getDate();
}

export function getDaysInMonth(monthKey: string): number {
  const [year, month] = monthKey.split('-');
  return new Date(parseInt(year), parseInt(month), 0).getDate();
}

export function getDaysRemainingInMonth(): number {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return daysInMonth - now.getDate();
}

export function calculateSmartInsights(data: KharchaBookData): SmartInsights {
  const monthKey = getCurrentMonthKey();
  const salary = getCurrentSalary(data);
  const expenses = getExpensesForMonth(data, monthKey);
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = salary - totalSpent;
  const remainingPercent = salary > 0 ? (balance / salary) * 100 : 0;
  const zone = getSpendingZone(remainingPercent);

  const daysElapsed = getDaysElapsedThisMonth();
  const avgPerDay = daysElapsed > 0 ? totalSpent / daysElapsed : 0;

  let daysRemaining: number | null = null;
  if (avgPerDay > 0 && balance > 0) {
    const projectedDays = Math.floor(balance / avgPerDay);
    // Only show if it's less than 30 days (high spending rate)
    if (projectedDays < 30) {
      daysRemaining = projectedDays;
    }
  }

  const biggestExpense = expenses.length > 0
    ? expenses.reduce((max, e) => e.amount > max.amount ? e : max, expenses[0])
    : null;

  const totalEntries = expenses.length;

  // Celebration: last 3 days of month AND 40%+ remaining
  const daysLeft = getDaysRemainingInMonth();
  const showCelebration = daysLeft <= 3 && remainingPercent >= 40 && salary > 0;

  const spendingStreak = data.spending_streak?.count ?? 0;

  return {
    avgPerDay,
    daysRemaining,
    biggestExpense,
    totalEntries,
    showCelebration,
    spendingStreak,
    balance,
    zone,
    zonePercent: Math.max(0, Math.min(100, remainingPercent)),
  };
}

export function groupExpensesByDate(expenses: Expense[]): { date: string; label: string; expenses: Expense[] }[] {
  const groups: Record<string, Expense[]> = {};
  expenses.forEach((e) => {
    if (!groups[e.date]) groups[e.date] = [];
    groups[e.date].push(e);
  });

  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a)) // newest first
    .map(([date, exps]) => ({
      date,
      label: formatDateLabel(date),
      expenses: exps.sort((a, b) => b.timestamp.localeCompare(a.timestamp)),
    }));
}

export function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    weekday: 'long',
  });
}

export function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${ampm}`;
}

export function getMonthSummaries(data: KharchaBookData): MonthSummary[] {
  const currentMonthKey = getCurrentMonthKey();
  const allKeys = getAllMonthKeys(data).filter((k) => k !== currentMonthKey);

  return allKeys.map((monthKey) => {
    const salary = getSalaryForMonth(data, monthKey);
    const expenses = getExpensesForMonth(data, monthKey);
    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const saved = salary - totalSpent;

    let status: MonthSummary['status'];
    if (saved > salary * 0.2) status = 'saved';
    else if (saved >= 0) status = 'tight';
    else status = 'overspent';

    return {
      month_key: monthKey,
      month_label: getMonthLabel(monthKey),
      salary,
      total_spent: totalSpent,
      saved,
      expenses,
      status,
    };
  });
}

export function generateShareText(data: KharchaBookData): string {
  const monthKey = getCurrentMonthKey();
  const salary = getCurrentSalary(data);
  const expenses = getExpensesForMonth(data, monthKey);
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const saved = salary - totalSpent;
  const monthLabel = getMonthLabel(monthKey);

  const savedText = saved >= 0 ? `Saved ₹${saved.toLocaleString('en-IN')} 💰` : `Overspent ₹${Math.abs(saved).toLocaleString('en-IN')} 😬`;

  return `${monthLabel} Summary:\nSalary ₹${salary.toLocaleString('en-IN')} | Spent ₹${totalSpent.toLocaleString('en-IN')} | ${savedText}\n(via KharchaBook)`;
}

