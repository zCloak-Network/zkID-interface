import { useCallback, useEffect, useState } from 'react';

import { deserializer, getCache, serializer } from './cache';

export function useLocalStorage<T>(
  key: string,
  initialvalue?: T
): [T | undefined, (value: T) => void] {
  const [value, setValue] = useState<T | undefined>(getCache<T>(key) || initialvalue);

  const saveValue = useCallback(
    (_value: T) => {
      const v = serializer(_value);

      localStorage.setItem(key, v);
      setValue(_value);
    },
    [key]
  );

  useEffect(() => {
    const _value = localStorage.getItem(key);

    if (_value) {
      setValue(deserializer(_value));
    }
  }, [key]);

  return [value, saveValue];
}
