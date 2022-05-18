import type { CallOverrides } from '@ethersproject/contracts';
import type { TransactionResponse } from '@ethersproject/providers';
import type { RequestDetails } from './types';

import { getAddress, isAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers';
import { keccak256 } from '@ethersproject/solidity';

import { CallError, ContractError, OutOfGasError, UserRejectError } from './errors';

export function shortenHash(hash?: string | null, chars = 8): string {
  if (!hash) {
    return '';
  }

  return `${hash.slice(0, chars + 2)}...${hash.slice(-chars)}`;
}

export function assert(condition: unknown, message: string | (() => Error)): asserts condition {
  if (!condition) {
    throw typeof message === 'string' ? new Error(message) : message();
  }
}

export function documentReadyPromise<T>(creator: () => Promise<T>): Promise<T> {
  return new Promise((resolve): void => {
    if (document.readyState === 'complete') {
      resolve(creator());
    } else {
      window.addEventListener('load', () => resolve(creator()));
    }
  });
}

export function shortenAddress(address?: string | null, chars = 4): string {
  if (!address) {
    return '';
  }

  const parsed = getAddress(address);

  return `${parsed.slice(0, chars + 2)}...${parsed.slice(-chars)}`;
}

// account is not optional
export function getSigner(library: JsonRpcProvider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: JsonRpcProvider,
  account?: string | null
): JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getContract(
  address: string,
  ABI: any,
  library: JsonRpcProvider,
  account?: string | null
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export async function getGasEstimate(
  contract: Contract,
  methodName: string,
  args?: any[],
  overrides?: CallOverrides
): Promise<BigNumber | OutOfGasError | CallError> {
  const gasEstimate = await contract.estimateGas[methodName](...(args ?? []), { ...overrides })
    .then((gasEstimate) => {
      return gasEstimate;
    })
    .catch((gasError) => {
      console.debug('Gas estimate failed, trying eth_call to extract error');

      return contract.callStatic[methodName](...(args ?? []), { ...overrides })
        .then((result) => {
          console.debug('Unexpected successful call after failed estimate gas', gasError, result);

          return new OutOfGasError(methodName);
        })
        .catch((error: any) => {
          console.debug('Call threw error', error);

          return new CallError(
            methodName,
            'Call threw error',
            error?.error?.data?.message || 'Unknown error'
          );
        });
    });

  return gasEstimate;
}

export async function callMethod<T>(
  contract: Contract,
  methodName: string,
  args?: any[],
  overrides?: CallOverrides
): Promise<T> {
  const gasEstimate = await getGasEstimate(contract, methodName, args, overrides);

  if (gasEstimate instanceof Error) {
    throw gasEstimate;
  }

  return contract[methodName](...(args ?? []), {
    ...overrides,
    gasLimit: gasEstimate.mul(12).div(10)
  })
    .then((response: TransactionResponse) => {
      return response;
    })
    .catch((error: any) => {
      // if the user rejected the tx, pass this along
      if (error?.code === 4001) {
        throw new UserRejectError();
      } else {
        // otherwise, the error was unexpected and we need to convey that
        console.error(`${methodName} failed: ${error.message}`, error, methodName, args);
        throw new ContractError(methodName, `${methodName} failed: ${error.message}`);
      }
    });
}

export function getRequestHash(requestDetails: RequestDetails) {
  return keccak256(
    ['bytes32', 'uint128[]', 'bytes32', 'bytes32'],
    [
      requestDetails.cType,
      requestDetails.fieldNames,
      requestDetails.programHash,
      requestDetails.attester
    ]
  );
}
