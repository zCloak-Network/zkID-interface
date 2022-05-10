import { useEffect } from 'react';

import useAuth from './useAuth';
import { useConnectors } from '.';

export function useEagerConnect() {
  const { injected } = useConnectors();
  const { login } = useAuth();

  useEffect(() => {
    if (window.ethereum) {
      login(injected);
    }
  }, [injected, login]);
}
