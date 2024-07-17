import { useEffect, useState } from 'react';

export const useLocalStorage = (initialValue, keyName) => {
  const [state, setState] = useState(() => {
    const data = localStorage.getItem(keyName);
    return data ? JSON.parse(data) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(state));
  }, [state, keyName]);

  return [state, setState];
};
