export enum ExplorerDataType {
  TRANSACTION = 'transaction',
  TOKEN = 'token',
  ADDRESS = 'address',
  BLOCK = 'block'
}

export function getExplorerLink(explorer: string, data: string, type: ExplorerDataType): string {
  switch (type) {
    case ExplorerDataType.TRANSACTION:
      return `${explorer}/tx/${data}`;

    case ExplorerDataType.TOKEN:
      return `${explorer}/token/${data}`;

    case ExplorerDataType.BLOCK:
      return `${explorer}/block/${data}`;

    case ExplorerDataType.ADDRESS:
      return `${explorer}/address/${data}`;
    default:
      return `${explorer}`;
  }
}
