import { useState } from "react";

export const useLocalStorage = <T>(key: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  });

  const setValue = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setStoredValue(newValue);
  };

  const removeValue = () => {
    localStorage.removeItem(key);
    setStoredValue(null);
  };

  return { storedValue, setValue, removeValue };
};
