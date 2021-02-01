abstract class HttpException extends Error {
  private _status: number;
  private _detail: any;

  public constructor(message: string = '') {
    super(message);
  }

  public set status(value: number) {
    this._status = value;
  }

  public get status(): number {
    return this._status;
  }

  public set title(value: string) {
    this.name = value;
  }

  public get title(): string {
    return this.name;
  }

  public set detail(value: any) {
    this._detail = value;
  }

  public get detail(): any {
    return this._detail;
  }
}

export default HttpException;
