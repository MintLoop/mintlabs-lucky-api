// CatnipCoin - Fictional Currency System
// Phase 4.3 - Casino-Lite Currency

export const CATNIP_INITIAL_BALANCE = 100;
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
  if (typeof window === 'undefined') return CATNIP_INITIAL_BALANCE;
  
  try {
    const stored = localStorage.getItem(CATNIP_STORAGE_KEY);
    if (stored) {
      const balance = parseInt(stored, 10);
      return isNaN(balance) ? CATNIP_INITIAL_BALANCE : balance;
    }
    return CATNIP_INITIAL_BALANCE;
  } catch (e) {
    console.warn('Failed to read CatnipCoin balance:', e);
    return CATNIP_INITIAL_BALANCE;
  }
}

/**
 * Set CatnipCoin balance
 */
export function setCatnipBalance(amount: number): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CATNIP_STORAGE_KEY, amount.toString());
    // Dispatch event for UI updates
    window.dispatchEvent(new CustomEvent('catnipBalanceChange', { detail: amount }));
  } catch (e) {
    console.warn('Failed to save CatnipCoin balance:', e);
  }
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
  if (typeof window === 'undefined') return;
  
  try {
    const historyKey = 'catnip-coin-history';
    const stored = localStorage.getItem(historyKey);
    const history: CatnipTransaction[] = stored ? JSON.parse(stored) : [];
    
    history.unshift(transaction);
    if (history.length > 10) history.pop();
    
    localStorage.setItem(historyKey, JSON.stringify(history));
  } catch (e) {
    console.warn('Failed to log CatnipCoin transaction:', e);
  }
}

/**
 * Get transaction history
 */
export function getCatnipHistory(): CatnipTransaction[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('catnip-coin-history');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.warn('Failed to read CatnipCoin history:', e);
    return [];
  }
}

/**
 * Clear transaction history
 */
function clearTransactionHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem('catnip-coin-history');
  } catch (e) {
    console.warn('Failed to clear CatnipCoin history:', e);
  }
}

/**
 * Format CatnipCoin amount with icon
 */
export function formatCatnip(amount: number): string {
  return `🪙 ${amount} CC`;
}
