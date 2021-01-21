import { RouterContract } from '../router';
import { Session } from './';

export interface ConfigContract {
  setRouter(value: RouterContract): void;
  getRouter(): RouterContract;
  setSession(value: Session): void;
  getSession(): Session | null;
}

class Config implements ConfigContract {
  protected _router: RouterContract;
  protected _session: Session | null = null;
  protected _cookie: any; // TODO: settiongs cookie

  public setRouter(value: RouterContract): void {
    this._router = value;
  }

  public getRouter(): RouterContract {
    return this._router;
  }

  public setSession(value: Session): void {
    this._session = value;
  }

  public getSession(): Session | null {
    return this._session;
  }
}

export default Config;
