import type { ContractCall } from './types';

import { multicallAbi } from './abi/multicall';
import { Contract } from './contract';

export function getEthBalance(address: string, multicallAddress: string): ContractCall {
  const multicall = new Contract(multicallAddress, multicallAbi);

  return multicall.getEthBalance(address);
}

export function getBlockHash(blockNumber: number, multicallAddress: string): ContractCall {
  const multicall = new Contract(multicallAddress, multicallAbi);

  return multicall.getBlockHash(blockNumber);
}

export function getCurrentBlockCoinbase(multicallAddress: string): ContractCall {
  const multicall = new Contract(multicallAddress, multicallAbi);

  return multicall.getCurrentBlockCoinbase();
}

export function getCurrentBlockDifficulty(multicallAddress: string): ContractCall {
  const multicall = new Contract(multicallAddress, multicallAbi);

  return multicall.getCurrentBlockDifficulty();
}

export function getCurrentBlockGasLimit(multicallAddress: string): ContractCall {
  const multicall = new Contract(multicallAddress, multicallAbi);

  return multicall.getCurrentBlockGasLimit();
}

export function getCurrentBlockTimestamp(multicallAddress: string): ContractCall {
  const multicall = new Contract(multicallAddress, multicallAbi);

  return multicall.getCurrentBlockTimestamp();
}

export function getLastBlockHash(multicallAddress: string): ContractCall {
  const multicall = new Contract(multicallAddress, multicallAbi);

  return multicall.getLastBlockHash();
}
