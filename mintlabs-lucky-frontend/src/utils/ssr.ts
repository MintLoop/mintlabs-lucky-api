// SSR-Safe Storage Utilities (Phase 4.5)
// Prevents crashes when localStorage is accessed during SSR (Node.js environment)

/**
 * Check if we're in a browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

/**
 * Safe localStorage getter with fallback
 * Returns null if localStorage is unavailable or key doesn't exist
 */
export function safeGetItem(key: string): string | null {
  if (!isBrowser()) {
    return null;
  }
  
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn(`Failed to read localStorage key "${key}":`, error);
    return null;
  }
}

/**
 * Safe localStorage setter with fallback
 * Returns true if successful, false otherwise
 */
export function safeSetItem(key: string, value: string): boolean {
  if (!isBrowser()) {
    return false;
  }
  
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`Failed to write localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Safe localStorage remove with fallback
 * Returns true if successful, false otherwise
 */
export function safeRemoveItem(key: string): boolean {
  if (!isBrowser()) {
    return false;
  }
  
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed to remove localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Get parsed JSON from localStorage with fallback
 * Returns defaultValue if parsing fails or storage unavailable
 */
export function safeGetJSON<T>(key: string, defaultValue: T): T {
  const raw = safeGetItem(key);
  
  if (!raw) {
    return defaultValue;
  }
  
  try {
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`Failed to parse JSON from localStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Set JSON value in localStorage with fallback
 * Returns true if successful, false otherwise
 */
export function safeSetJSON<T>(key: string, value: T): boolean {
  try {
    const serialized = JSON.stringify(value);
    return safeSetItem(key, serialized);
  } catch (error) {
    console.warn(`Failed to stringify value for localStorage key "${key}":`, error);
    return false;
  }
}
