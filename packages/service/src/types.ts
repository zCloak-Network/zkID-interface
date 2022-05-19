export type MethodType = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

export interface Config {
  method?: MethodType;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  body?: any;
  timeout?: number;
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached';
  credentials?: 'omit' | 'same-origin' | 'include';
  mode?: 'navigate' | 'same-origin' | 'no-cors' | 'cors';
}

// Api response
export type ServerResponse<T> = {
  code: number;
  data: T;
};

export enum AttestationStatus {
  notAttested = 1,
  attesting = 2,
  attested = 3
}

export type MintPoap = {
  blockHash: string;
  blockNumber: number;
  blockTime: number;
  nftId: string;
  poapId: string;
  transactionHash: string;
  who: string;
  __v: number;
  _id: string;
};

export type ProofProcess = {
  _id: string;
  blockNumber: number;
  blockHash: string;
  transactionHash: string;
  dataOwner: string;
  attester: string;
  cType: string;
  programHash: string;
  fieldNames: string[];
  proofCid: string;
  requestHash: string;
  rootHash: string;
  expectResult: number[];
  __v: number;
  verifying: {
    _id: string;
    blockNumber: number;
    blockHash: string;
    transactionHash: string;
    cOwner: string;
    requestHash: string;
    worker: string;
    outputHash: string;
    rootHash: string;
    attester: string;
    isPassed: true;
    calcResult: number[];
    __v: number;
  }[];
  finished: boolean;
  verified: boolean;
};
