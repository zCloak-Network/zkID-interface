import { useCallback, useMemo, useState } from 'react';

export function useIsInitialState<T = any>(initialValue: T): [T, (value: T) => void, boolean];
export function useIsInitialState<T = undefined>(): [
  undefined | T,
  (value: T | undefined) => void,
  boolean
];

export function useIsInitialState<T = any | undefined>(
  initialValue?: T
): [T | undefined, (value: T | undefined) => void, boolean] {
  const [value, setValue] = useState<T | undefined>(initialValue);
  const [initial, setInitial] = useState(false);

  const _setValue = useCallback((value: T | undefined) => {
    setInitial(true);
    setValue(value);
  }, []);

  return useMemo(() => [value, _setValue, initial], [_setValue, initial, value]);
}
