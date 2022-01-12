import React from 'react';

export default function useLocalStorage<T>(keyName: string, defaultValue: T) {
    const [storedValue, setStoredValue] = React.useState(() => {
      try {
        const value = window.localStorage.getItem(keyName);
  
        if (value) {
          return JSON.parse(value);
        } else {
          window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
          return defaultValue;
        }
      } catch (err) {
        return defaultValue;
      }
    });
  
    const setValue = (newValue: T) => {
      try {
        window.localStorage.setItem(keyName, JSON.stringify(newValue));
      } catch (err) {}
      setStoredValue(newValue);
      console.log(storedValue);
    };
  
    return [storedValue, setValue];
  };