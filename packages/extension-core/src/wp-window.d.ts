interface Window {
  zCloak?: {
    zkID: {
      getIfCreatePassword: () => Promise<boolean>;
      getCredentialByCHash: (chash: string) => Promise<boolean>;
      name: string;
      openzkIDPopup: <Request extends keyof ZKIDExtensionRequests>(
        request: Request,
        values: ZKIDExtensionRequests[Request]
      ) => void;
      version: string;
    };
  };
}
