import { useState, useEffect } from "react";

// Small hook: behaves like useState but reads from and writes to
// localStorage, so data survives refreshes and closing the tab.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.error(`Failed to read "${key}" from localStorage:`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Failed to save "${key}" to localStorage:`, err);
    }
  }, [key, value]);

  return [value, setValue];
}