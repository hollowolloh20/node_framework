interface ResponseInterface {}

class Response {
  protected _body: any;
  protected _response: any;

  public constructor(nodeResponse: any) {
    this._response = nodeResponse;
  }

  public get node(): any {
    return this._response;
  }

  public status(value: number): Response {
    this._response.statusCode = value;
    return this;
  }

  public send(value: any): void {
    this._response.end(value);
  }
}

export default Response;
