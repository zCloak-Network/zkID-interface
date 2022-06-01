export const env: {
  CREDENTIAL_SERVICE: string;
  ZKID_SERVICE: string;
} = {
  CREDENTIAL_SERVICE:
    (window?.zkidEnv?.CREDENTIAL_SERVICE as string) || 'https://credential-service.starks.network',
  ZKID_SERVICE: (window?.zkidEnv?.ZKID_SERVICE as string) || 'https://zkid-service.starks.network'
};
