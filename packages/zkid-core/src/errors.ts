export class NoZkidExtension extends Error {
  constructor() {
    super('Zkid Extension not install');
  }
}

export class WalletError extends Error {}

export class ContractError extends WalletError {
  public methodName: string;

  constructor(methodName: string, message: string) {
    super(message);
    this.methodName = methodName;
  }
}

export class OutOfGasError extends ContractError {
  constructor(methodName: string) {
    super(methodName, 'Unexpected issue with estimating the gas. Please try again.');
  }
}

export class CallError extends ContractError {
  public reason: string;

  constructor(methodName: string, message: string, reason: string) {
    super(methodName, message);
    this.reason = reason;
  }
}

export class UserRejectError extends Error {
  constructor() {
    super('Transaction rejected.');
  }
}
