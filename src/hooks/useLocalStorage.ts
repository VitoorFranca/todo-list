//https://usehooks-ts.com/react-hook/use-local-storage

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import useEventListener from "./useEventListener";

declare global {
  interface WindowEventMap {
    "local-storage": CustomEvent;
  }
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  dispatchEvent: boolean
): [T, SetValue<T>] {
  const readValue = (): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: SetValue<T> = (value) => {
    if (typeof window == "undefined") {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      );
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value;

      window.localStorage.setItem(key, JSON.stringify(newValue));

      if (dispatchEvent) {
        window.dispatchEvent(new Event("local-storage"));
      }

      setStoredValue(newValue);
      handleStorageChange();
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  const handleStorageChange = () => {
    setStoredValue(readValue());
  };

  useEventListener("storage", handleStorageChange);

  useEventListener("local-storage", handleStorageChange);

  return [storedValue, setValue];
}

function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch (error) {
    console.log("parsing error on", { value });
    return undefined;
  }
}
