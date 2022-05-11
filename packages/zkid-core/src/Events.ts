import EventEmitter from 'eventemitter3';

export class Events<T extends Record<string, any>> {
  #eventemitter = new EventEmitter();

  protected emit(type: keyof T, ...args: unknown[]): boolean {
    return this.#eventemitter.emit(type as string, ...args);
  }

  public on(type: keyof T, handler: (...args: any[]) => any): this {
    this.#eventemitter.on(type as string, handler);

    return this;
  }

  public off(type: keyof T, handler: (...args: any[]) => any): this {
    this.#eventemitter.removeListener(type as string, handler);

    return this;
  }

  public once(type: keyof T, handler: (...args: any[]) => any): this {
    this.#eventemitter.once(type as string, handler);

    return this;
  }
}
