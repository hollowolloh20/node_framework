import { CookieContract } from '../cookie';
import { Session as SessionSettings } from '../../../settings';

export interface SessionProviderContract {
  set(key: string | number, value: any): Promise<any>;

  get(key: string | number): Promise<any>;

  init(key: string | number, value: string, expire: number): Promise<any>;
}

export interface SessionContract {
  id: string | number;
  init(value: any): Promise<Boolean>;
  set(value: any): Promise<Boolean>;
  get(): Promise<any>;
}

class Session implements SessionContract {
  protected _cookie: CookieContract;
  protected _provider: SessionProviderContract;
  protected _settings: SessionSettings;
  protected _id: string | number;
  protected _expires: Date;

  public constructor(settings: SessionSettings, cookie: CookieContract) {
    this._cookie = cookie;
    this._settings = settings;
    this._provider = settings.provider;
    this.setIdByCookie();
  }

  protected setIdByCookie(): void {
    const cookie = this._cookie.get;

    if (cookie) {
      this._id = cookie[this._settings.idName];
    }
  }

  public get id(): string | number {
    return this._id;
  }

  public async init(value: any = {}): Promise<boolean> {
    let result: boolean = true;
    const id = this._settings.idGenerator();
    const expireTimeInSecconds: number = this._settings.expire || 86400;
    const expires = new Date(new Date().getTime() + expireTimeInSecconds * 1000);
    value.expires = expires;

    try {
      result = await this._provider.init(id, JSON.stringify(value), expireTimeInSecconds);
      this.setCookie(id, expires);
    } catch (error) {
      result = false;
      console.error(error.message);
    }

    return result;
  }

  protected setCookie(sessionId: string | number, expires: Date): void {
    this._id = sessionId;
    this._expires = expires;
    const idName: string = this._settings.idName;
    const expiresCookie: string = expires.toUTCString();
    const httpOnly: string = this._settings.httpOnly ? 'HttpOnly' : '';

    this._cookie.set(`${idName}=${sessionId}; expires=${expiresCookie}; ${httpOnly}`);
  }

  public async set(value: any): Promise<boolean> {
    if (!this._expires) {
      await this.get();
    }

    if (!this.expired()) {
      try {
        await this._provider.set(this._id, JSON.stringify(value));
        return true;
      } catch (e) {
        console.error(e.message);
        return false;
      }
    }
    return false;
  }

  public async get(): Promise<null | object | any> {
    let result: any = null;

    if (!this._id) {
      this._expires = new Date();
      return result;
    }

    if (this._expires) {
      if (this.expired()) {
        return result;
      }
    }

    try {
      result = await this._provider.get(this._id);
    } catch (e) {
      console.error(e.message);
    }

    if (!this._expires) {
      this._expires = result ? new Date(result.expires) : new Date();
    }

    return result;
  }

  protected expired(): boolean {
    if (this._expires >= new Date()) {
      return false;
    }

    return true;
  }
}

export default Session;
