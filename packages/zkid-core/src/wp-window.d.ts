import type { ZKIDInject } from './types';

interface Window {
  zCloak: {
    zkID: ZKIDInject;
  };
}
