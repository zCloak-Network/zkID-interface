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
  attestedFailed = -1,
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

export enum ProofStatus {
  True = 'Verified True',
  False = 'Verified False',
  Verifing = 'Verifing',
  Null = ''
}

export type Proof = {
  rootHash: string;
  proofCid: string;
  expectResult: number[];
  cTypeHash: string;
  fieldNames: string;
  time: string;
  percent: string;
  status: ProofStatus;
  programDetails: {
    _id: string;
    programHash: string;
    programFieldName: string;
    programName: string;
  };
  claimAlias: string;
};

export enum ActivityType {
  AddProof = 'Add proof',
  ClaimPOAP = 'Claim POAP'
}
export type Activity = {
  operateType: ActivityType;
  time: string;
  transactionHash: string;
};

export enum FaucetStatus {
  NotFaucet = 1,
  Fauceting = 2,
  Fauceted = 3
}
