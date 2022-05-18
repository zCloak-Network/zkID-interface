import { Events } from './Events';
import { ZKIDExtensionRequests, ZKIDExtensionResponses } from './types';
import { documentReadyPromise } from './utils';

export class ZkidExtension extends Events<ZKIDExtensionResponses> {
  constructor() {
    super();

    window.addEventListener('message', this.handleMessage.bind(this));
  }

  public get isReady(): Promise<this> {
    return documentReadyPromise(() => Promise.resolve(this));
  }

  public get isInstall(): Promise<boolean> {
    return this.isReady.then(() => {
      if (window.zCloak) {
        return true;
      } else {
        return false;
      }
    });
  }

  public get hasPassword(): Promise<boolean> {
    return window.zCloak?.zkID.getIfCreatePassword() || Promise.resolve(false);
  }

  public get name(): string | undefined {
    return window.zCloak?.zkID.name;
  }

  public get version(): string | undefined {
    return window.zCloak?.zkID.version;
  }

  public getCredentialByCHash(chash: string) {
    return window.zCloak?.zkID.getCredentialByCHash(chash);
  }

  public openzkIDPopup<Request extends keyof ZKIDExtensionRequests>(
    request: Request,
    values: ZKIDExtensionRequests[Request]
  ) {
    return window.zCloak?.zkID.openzkIDPopup(request, values);
  }

  private handleMessage<K extends keyof ZKIDExtensionResponses>(
    event: MessageEvent<{
      statusCode: K;
      data: ZKIDExtensionResponses[K];
    }>
  ) {
    const { data, statusCode } = event.data;

    this.emit(statusCode, data);
  }
}
