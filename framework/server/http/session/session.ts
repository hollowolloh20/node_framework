import { CookieContract } from '../cookie';
import { Session as SessionSettings } from '../../../settings';

export interface SessionProviderContract {
  set(key: string, value: any): Promise<any>;

  get(key: string): Promise<any>;
}

export interface SessionContract {
  id: string | number;
}

class Session implements SessionContract {
  protected _cookie: CookieContract;
  protected _provider: SessionProviderContract;
  protected _settings: SessionSettings;
  protected _id: string | number;

  public constructor(settings: SessionSettings, cookie: CookieContract) {
    this._cookie = cookie;
    this._settings = settings;
    this.id;
  }

  public get id(): string | number {
    if (!this._id) {
      const cookies: object | undefined | any = this._cookie.get;
      const id: string | number | undefined = cookies ? cookies[this._settings.idName] : undefined;
      this._id = id ? id : this.generateId();
    }
    return this._id;
  }

  protected generateId(): string | number {
    const id = this._settings.idGenerator();
    this._cookie.set(`${this._settings.idName}=${id}`);
    return id;
  }
}

export default Session;
