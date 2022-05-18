import { decodeAddress } from '@polkadot/keyring';
import { stringToHex as s2h, u8aToHex } from '@polkadot/util';

export function decodeSs58Address(address: string) {
  return u8aToHex(decodeAddress(address));
}

export function stringToHex(str: string) {
  return s2h(str);
}
