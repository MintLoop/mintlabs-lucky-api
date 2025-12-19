// CatnipCoin - Fictional Currency System
// Phase 4.3 - Casino-Lite Currency
// Phase 4.5 - SSR-safe storage

import { safeGetItem, safeSetItem, safeGetJSON, safeSetJSON, safeRemoveItem, isBrowser } from './ssr';

export const CATNIP_INITIAL_BALANCE = 1000;
export const CATNIP_STORAGE_KEY = 'catnip-coin-balance';

export interface CatnipTransaction {
  amount: number;
  reason: string;
  timestamp: number;
}

/**
 * Get current CatnipCoin balance
 */
export function getCatnipBalance(): number {
  if (!isBrowser()) return CATNIP_INITIAL_BALANCE;
  
  const stored = safeGetItem(CATNIP_STORAGE_KEY);
  if (stored) {
    const balance = parseInt(stored, 10);
    return isNaN(balance) ? CATNIP_INITIAL_BALANCE : balance;
  }
  return CATNIP_INITIAL_BALANCE;
}

/**
 * Set CatnipCoin balance
 */
export function setCatnipBalance(amount: number): void {
  if (!isBrowser()) return;
  
  safeSetItem(CATNIP_STORAGE_KEY, amount.toString());
  // Dispatch event for UI updates
  window.dispatchEvent(new CustomEvent('catnipBalanceChange', { detail: amount }));
}

/**
 * Add to CatnipCoin balance
 */
export function addCatnip(amount: number, reason: string = 'Earned'): number {
  const current = getCatnipBalance();
  const newBalance = current + amount;
  setCatnipBalance(newBalance);
  logTransaction({ amount, reason, timestamp: Date.now() });
  return newBalance;
}

/**
 * Subtract from CatnipCoin balance
 */
export function subtractCatnip(amount: number, reason: string = 'Spent'): number {
  const current = getCatnipBalance();
  const newBalance = Math.max(0, current - amount); // Never go negative
  setCatnipBalance(newBalance);
  logTransaction({ amount: -amount, reason, timestamp: Date.now() });
  return newBalance;
}

/**
 * Reset balance to initial amount
 */
export function resetCatnipBalance(): void {
  setCatnipBalance(CATNIP_INITIAL_BALANCE);
  clearTransactionHistory();
}

/**
 * Log transaction (last 10 only)
 */
function logTransaction(transaction: CatnipTransaction): void {
  if (!isBrowser()) return;
  
  const historyKey = 'catnip-coin-history';
  const history: CatnipTransaction[] = safeGetJSON(historyKey, []);
  
  history.unshift(transaction);
  if (history.length > 10) history.pop();
  
  safeSetJSON(historyKey, history);
}

/**
 * Get transaction history
 */
export function getCatnipHistory(): CatnipTransaction[] {
  if (!isBrowser()) return [];
  return safeGetJSON('catnip-coin-history', []);
}

/**
 * Clear transaction history
 */
function clearTransactionHistory(): void {
  if (!isBrowser()) return;
  safeRemoveItem('catnip-coin-history');
}

/**
 * Format CatnipCoin amount with icon
 */
export function formatCatnip(amount: number): string {
  return `🪙 ${amount} CC`;
}
