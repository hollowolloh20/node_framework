import { Objectable, BeforeMiddleware, AfterMiddleware } from '../interfaces';
import { Settings } from '../types/controller';

class ControllerSettings implements Objectable {
  protected _data?: any;
  protected _handler: Function;
  protected _beforeMiddlewares?: Array<BeforeMiddleware> | undefined;
  protected _afterMiddlewares?: Array<AfterMiddleware> | undefined;

  public setData(data: any): ControllerSettings {
    this._data = data;
    return this;
  }

  public setHandler(handler: Function): ControllerSettings {
    this._handler = handler;
    return this;
  }

  public useBefore(middlewares: Array<BeforeMiddleware>): ControllerSettings {
    this._beforeMiddlewares = middlewares;
    return this;
  }

  public useAfter(middlewares: Array<AfterMiddleware>): ControllerSettings {
    this._afterMiddlewares = middlewares;
    return this;
  }

  public toObject(): Settings {
    const obj: Settings = {
      handler: this._handler,
    };

    if (this._data) obj.data = this._data;
    if (this._beforeMiddlewares) obj.beforeMiddlewares = this._beforeMiddlewares;
    if (this._afterMiddlewares) obj.afterMiddlewares = this._afterMiddlewares;

    return obj;
  }
}

export default ControllerSettings;
