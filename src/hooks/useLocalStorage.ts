import { useSignal, useVisibleTask$ } from "@builder.io/qwik";

export type UseLocalStorageProps<T> = {
  key: string;
  defaultValue: T | null;
};

export const useLocalStorage = <T>({
  key,
  defaultValue,
}: UseLocalStorageProps<T>) => {
  const current = useSignal(defaultValue);
  const isInitialized = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => current.value);

    const storedValue = window.localStorage.getItem(key);

    if (!isInitialized.value && current.value === defaultValue && storedValue) {
      const parsedValue = JSON.parse(storedValue) as T;
      if (current.value !== parsedValue) {
        current.value = parsedValue;
        isInitialized.value = true;
        return;
      }
    }

    if (!isInitialized.value) isInitialized.value = true;

    const newValue = current.value ? JSON.stringify(current.value) : null;
    if (newValue) {
      if (!storedValue || storedValue !== newValue)
        window.localStorage.setItem(key, newValue);
    } else if (storedValue) window.localStorage.removeItem(key);
  });

  return { current, isInitialized };
};
