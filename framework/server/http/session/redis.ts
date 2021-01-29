import { SessionProviderContract } from './session';

export interface RedisClient {
  set: Function;
  setex: Function;
  get: Function;
  expire: Function;
}

class RedisSession implements SessionProviderContract {
  protected _client: RedisClient;

  public constructor(client: RedisClient) {
    this._client = client;
  }

  public set(key: string | number, value: string): Promise<Error | boolean> {
    return new Promise((resolve, reject) => {
      this._client.set(key, value, (error) => {
        this.checkError(error, reject);
        resolve(true);
      });
    });
  }

  public get(key: string | number): Promise<Error | any> {
    return new Promise((resolve, reject) => {
      this._client.get(key, (error: Error, response: any) => {
        this.checkError(error, reject);
        resolve(JSON.parse(response));
      });
    });
  }

  public init(key: string | number, value: string, expire: number): Promise<Error | boolean> {
    return new Promise((resolve, reject) => {
      this._client.setex(key, expire, value, (error) => {
        this.checkError(error, reject);
        resolve(true);
      });
    });
  }

  private checkError(error: any, reject: Function): void {
    if (error) {
      reject(error);
    }
  }
}

export default RedisSession;
