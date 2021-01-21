import { SessionProviderContract } from './';

export interface RedisClient {
  get: Function;
  set: Function;
}

class RedisSession implements SessionProviderContract {
  protected _client: RedisClient;

  public constructor(client: RedisClient) {
    this._client = client;
  }

  public get(key: string): Promise<Error | any> {
    return new Promise((resolve, reject) => {
      this._client.get(key, (error: Error, response: any) => {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(response));
      });
    });
  }

  public set(key: string, value: object): Promise<Error | any> {
    return new Promise((_resolve, reject) => {
      this._client.set(key, JSON.stringify(value), (error) => {
        if (error) {
          reject(error);
        }
      });
    });
  }
}

export default RedisSession;
