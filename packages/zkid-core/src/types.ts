export interface ZKIDExtensionRequests {
  OPEN_GENERATE_PROOF: {
    cTypeHash: string;
    programHashName: string;
    programFieldName: string;
    programHash: string;
    programDetail: string;
  };
  OPEN_FIRST: undefined;
  OPEN_IMPORT_CREDENTIAL: undefined;
}

export interface ZKIDExtensionResponses {
  EXTENSION_CLOSED: undefined;
  SEND_PROOF_TO_WEB: {
    proofCid: string;
    rootHash: string;
    expectResult: string;
  };
  SEND_BACKNEXT_TO_WEB: undefined;
  SEND_NEXT_TO_WEB: undefined;
  SEND_CREATE_PASSWORD_SUCCESS_TO_WEB: undefined;
  SEND_IMPORT_CREDENTIAL_SUCCESS_TO_WEB: undefined;
}

export interface ZKIDInject {
  getIfCreatePassword: () => Promise<boolean>;
  getCredentialByCHash: (chash: string) => Promise<any>;
  name: string;
  openzkIDPopup: <Request extends keyof ZKIDExtensionRequests>(
    request: Request,
    values: ZKIDExtensionRequests[Request]
  ) => Promise<any>;
  version: string;
}
