import { parse } from 'cookie';

export interface CookieContract {
  get(): any;
  set(value: string | number | boolean): void;
}

class Cookie implements CookieContract {
  protected _req: any;
  protected _res: any;
  protected _cookies: string | object | undefined | any;
  protected _responseCookies: Array<string> = [];

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
    this._responseCookies.push(value);
    this._res.setHeader('Set-Cookie', this.toString());
  }

  public toString = (): string => {
    return this._responseCookies.join('; ');
  };
}

export default Cookie;
