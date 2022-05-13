import type { BigNumber } from '@ethersproject/bignumber';

import { Signer } from '@ethersproject/abstract-signer';
import { Contract, ContractFunction, ContractInterface } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';

import { getContract, getSigner } from './utils';

export abstract class BaseContract {
  public contract: Contract;
  public abi: ContractInterface;
  public provider: JsonRpcProvider;
  public address: string;
  public account?: string | null;

  constructor(
    address: string,
    provider: JsonRpcProvider,
    abi: ContractInterface,
    account?: string | null
  ) {
    this.address = address;
    this.abi = abi;
    this.provider = provider;
    this.account = account;
    this.contract = getContract(address, abi, provider, account);
  }

  get estimateGas(): { [name: string]: ContractFunction<BigNumber> } {
    return this.contract.estimateGas;
  }

  get signer(): Signer | null {
    return this.account ? getSigner(this.provider, this.account) : null;
  }
}
