import { parse as urlParse } from 'url';

interface RequestInterface {}

class Request {
  protected _body: any;
  protected _request: any;
  protected _query: any;
  protected _pathname: string;

  public constructor(nodeRequest: any) {
    const parsedUrl = urlParse(nodeRequest.url, true);
    this._request = nodeRequest;
    this._query = parsedUrl.query;
    this._pathname = parsedUrl.pathname!; // TODO: can be null
  }

  public get node(): any {
    return this._request;
  }

  public set body(value: any) {
    this._body = value;
  }

  public get body(): any {
    return this._body;
  }

  public get host(): string {
    return this._request.headers.host;
  }

  public get query(): any {
    return this._query;
  }

  public get pathname(): string {
    return this._pathname;
  }
}

export default Request;
