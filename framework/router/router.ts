import Route, { RouteContract } from './route';
import { BeforeMiddleware, AfterMiddleware } from '../interfaces';
import useController, { Settings as ControllerSettings } from '../controller';

export interface RouterContract {
  handle(ctx: any): void;
}

export interface HttpRequests {
  get(route: string, handler: Function): RouteExtension;
  post(route: string, handler: Function): RouteExtension;
  put(route: string, handler: Function): RouteExtension;
  delete(route: string, handler: Function): RouteExtension;
  patch(route: string, handler: Function): RouteExtension;
}

export interface RouteExtension {
  useBefore(middlewares: Array<BeforeMiddleware>): RouteExtension;
  useAfter(middlewares: Array<AfterMiddleware>): RouteExtension;
}

class Router implements RouterContract, HttpRequests {
  protected _routes: object = {};

  public get(path: string, handler: Function): RouteExtension {
    return this.addRoute(path, handler);
  }

  public post(path: string, handler: Function): RouteExtension {
    return this.addRoute(path, handler);
  }

  public put(path: string, handler: Function): RouteExtension {
    return this.addRoute(path, handler);
  }

  public delete(path: string, handler: Function): RouteExtension {
    return this.addRoute(path, handler);
  }

  public patch(path: string, handler: Function): RouteExtension {
    return this.addRoute(path, handler);
  }

  protected addRoute(path: string, handler: Function): RouteExtension {
    const route: RouteContract = new Route();

    route.setHandler(handler);
    this._routes[path] = route;

    return route;
  }

  public handle(ctx: any): void {
    const route: RouteContract = this._routes[ctx.request.pathname];

    if (route) {
      const controllerSettings: ControllerSettings = {
        data: ctx,
        handler: route.getHandler(),
        beforeMiddlewares: route.getBeforeMiddleware(),
        afterMiddlewares: route.getAfterMiddleware(),
      };

      useController(controllerSettings);
    } else {
      ctx.response.status(404).send();
    }
  }
}

export default Router;
