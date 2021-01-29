import { BeforeMiddleware, AfterMiddleware } from '../interfaces';

export interface RouteContract {
  setHandler(controllerHandler: Function): void;
  getHandler(): Function;
  useBefore(middlewares: Array<BeforeMiddleware>): RouteContract;
  getBeforeMiddleware(): Array<BeforeMiddleware> | undefined;
  useAfter(middlewares: Array<AfterMiddleware>): RouteContract;
  getAfterMiddleware(): Array<AfterMiddleware> | undefined;
}

class Route implements RouteContract {
  protected _controllerHandler: Function;
  protected _beforeMiddleware: Array<BeforeMiddleware> | undefined;
  protected _afterMiddleware: Array<AfterMiddleware> | undefined;

  public setHandler(controllerHandler: Function): void {
    this._controllerHandler = controllerHandler;
  }

  public getHandler(): Function {
    return this._controllerHandler;
  }

  public useBefore(middlewares: Array<BeforeMiddleware>): Route {
    this._beforeMiddleware = middlewares;
    return this;
  }

  public getBeforeMiddleware(): Array<BeforeMiddleware> | undefined {
    return this._beforeMiddleware;
  }

  public useAfter(middlewares: Array<AfterMiddleware>): Route {
    this._afterMiddleware = middlewares;
    return this;
  }

  public getAfterMiddleware(): Array<AfterMiddleware> | undefined {
    return this._afterMiddleware;
  }
}

export default Route;
