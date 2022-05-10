export interface AddEthereumChainParameter {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export async function switchNetwork(
  chainId: number,
  params?: AddEthereumChainParameter
): Promise<boolean> {
  if (!window.ethereum) {
    return false;
  }

  try {
    await window.ethereum.request?.({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }]
    });

    return true;
  } catch (error: any) {
    if (error.code === 4902 && params) {
      await addNetwork(params);
      switchNetwork(chainId);

      return true;
    } else {
      throw error;
    }
  }
}

export async function addNetwork(params: AddEthereumChainParameter): Promise<void> {
  await window.ethereum?.request?.({
    method: 'wallet_addEthereumChain',
    params: [
      {
        ...params,
        chainId: `0x${params.chainId.toString(16)}`
      }
    ]
  });
}
