import { parse } from 'cookie';

export interface CookieContract {
  get(): object | undefined | any;
  set(value: string | number | boolean): void;
}

class Cookie implements CookieContract {
  protected _req: any;
  protected _res: any;
  protected _cookies: string | object | undefined | any;

  public constructor(req: any, res: any) {
    this._req = req;
    this._res = res;
  }

  public get get(): object | undefined | any {
    if (!this._cookies && this._req.headers.cookie) {
      this._cookies = parse(this._req.headers.cookie);
    }
    return this._cookies;
  }

  public set(value: string): void {
    this._res.setHeader('Set-Cookie', value);
  }
}

export default Cookie;
