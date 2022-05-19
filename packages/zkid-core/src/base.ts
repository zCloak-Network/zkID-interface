import type { Fragment, JsonFragment } from '@ethersproject/abi';
import type { BigNumber } from '@ethersproject/bignumber';

import { Signer } from '@ethersproject/abstract-signer';
import { Contract, ContractFunction, ContractInterface } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';

import { Contract as MulticallContract, Web3Query } from '@zcloak/web3-query';

import { getContract, getSigner } from './utils';

export abstract class BaseContract {
  protected web3Query: Web3Query;
  protected multicallContract: MulticallContract;

  public contract: Contract;
  public abi: ContractInterface;
  public provider: JsonRpcProvider;
  public address: string;
  public account?: string | null;
  constructor(
    address: string,
    provider: JsonRpcProvider,
    abi: JsonFragment[] | Fragment[] | string[],
    account?: string | null
  ) {
    this.web3Query = new Web3Query(provider);
    this.multicallContract = new MulticallContract(address, abi);
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
