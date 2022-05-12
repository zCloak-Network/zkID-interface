import EventEmitter from 'eventemitter3';

export class Events<T> {
  #eventemitter = new EventEmitter();

  protected emit(type: keyof T, ...args: unknown[]): boolean {
    return this.#eventemitter.emit(type as string, ...args);
  }

  public on<K extends keyof T>(type: K, handler: (value: T[K]) => any): this {
    this.#eventemitter.on(type as string, handler);

    return this;
  }

  public off<K extends keyof T>(type: K, handler: (value: T[K]) => any): this {
    this.#eventemitter.removeListener(type as string, handler);

    return this;
  }

  public once<K extends keyof T>(type: K, handler: (value: T[K]) => any): this {
    this.#eventemitter.once(type as string, handler);

    return this;
  }
}
