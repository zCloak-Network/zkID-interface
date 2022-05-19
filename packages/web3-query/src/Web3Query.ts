import { ethers } from 'ethers';

import { all } from './call';
import {
  getBlockHash,
  getCurrentBlockCoinbase,
  getCurrentBlockDifficulty,
  getCurrentBlockGasLimit,
  getCurrentBlockTimestamp,
  getEthBalance,
  getLastBlockHash
} from './calls';
import { ContractCall } from './types';

export class Web3Query {
  private _provider: ethers.providers.Provider;
  #blockNumber = 0;
  #callbacks: (() => void)[] = [];

  constructor(provider: ethers.providers.Provider) {
    this._provider = provider;

    this._provider.on('block', this.blockNumberCallback);
  }

  // TODO: this method maybe to use debounce.
  private blockNumberCallback = (blockNumber: number) => {
    if (blockNumber !== this.#blockNumber) {
      this.#callbacks.forEach((callback) => callback());
      this.#blockNumber = blockNumber;
    }
  };

  public destroy() {
    this._provider.off('block', this.blockNumberCallback);
  }

  public async getEthBalance(address: string) {
    return getEthBalance(address, await getAddress(this._provider));
  }

  public async getBlockHash(blockNumber: number) {
    return getBlockHash(blockNumber, await getAddress(this._provider));
  }

  public async getCurrentBlockCoinbase() {
    return getCurrentBlockCoinbase(await getAddress(this._provider));
  }

  public async getCurrentBlockDifficulty() {
    return getCurrentBlockDifficulty(await getAddress(this._provider));
  }

  public async getCurrentBlockGasLimit() {
    return getCurrentBlockGasLimit(await getAddress(this._provider));
  }

  public async getCurrentBlockTimestamp() {
    return getCurrentBlockTimestamp(await getAddress(this._provider));
  }

  public async getLastBlockHash() {
    return getLastBlockHash(await getAddress(this._provider));
  }

  public async all<T extends any[] = any[]>(calls: ContractCall[]): Promise<T>;
  public async all<T extends any[] = any[]>(
    calls: ContractCall[],
    callback: (results: T) => void
  ): Promise<() => void>;

  public async all<T extends any[] = any[]>(
    calls: ContractCall[],
    callback?: (results: T) => void
  ): Promise<T | (() => void)> {
    const results = await all<T>(calls, await getAddress(this._provider), this._provider);

    if (callback) {
      // eslint-disable-next-line node/no-callback-literal
      callback(await this.all<T>(calls));

      const func = async () => {
        const results = await this.all<T>(calls);

        callback(results);
      };

      this.#callbacks.push(func);

      return () => {
        this.#callbacks = this.#callbacks.filter((callback) => callback !== func);
      };
    }

    return results;
  }

  public async one<TOne = any>(call: ContractCall): Promise<TOne>;
  public async one<TOne = any>(
    call: ContractCall,
    callback: (results: TOne) => void
  ): Promise<() => void>;

  public async one<TOne = any>(
    call: ContractCall,
    callback?: (results: TOne) => void
  ): Promise<TOne | (() => void)> {
    const [result] = await all<[TOne]>([call], await getAddress(this._provider), this._provider);

    if (callback) {
      // eslint-disable-next-line node/no-callback-literal
      callback(await this.one<TOne>(call));

      const func = async () => {
        const result = await this.one<TOne>(call);

        callback(result);
      };

      this.#callbacks.push(func);

      return () => {
        this.#callbacks = this.#callbacks.filter((callback) => callback !== func);
      };
    }

    return result;
  }
}

const multicallAddresses: Record<number, string> = {
  1284: '0xcA11bde05977b3631167028862bE2a173976CA11',
  1287: '0xcA11bde05977b3631167028862bE2a173976CA11'
};

export function setMulticallAddress(chainId: number, address: string) {
  multicallAddresses[chainId] = address;
}

function getAddressForChainId(chainId: number) {
  return multicallAddresses[chainId];
}

async function getAddress(provider: ethers.providers.Provider) {
  const { chainId } = await provider.getNetwork();

  return getAddressForChainId(chainId);
}
