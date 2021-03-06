import { RouterContract, RouterHttpRequests, ControllerExtension } from '../interfaces';
import { useController, ControllerSettings } from '../controller';
import { UndefinedRouteHttpException } from '../exception/router';

class Router implements RouterContract, RouterHttpRequests {
  protected _routes: object = {};

  public get(path: string, handler: Function): ControllerExtension {
    return this.addRoute(path, handler);
  }

  public post(path: string, handler: Function): ControllerExtension {
    return this.addRoute(path, handler);
  }

  public put(path: string, handler: Function): ControllerExtension {
    return this.addRoute(path, handler);
  }

  public delete(path: string, handler: Function): ControllerExtension {
    return this.addRoute(path, handler);
  }

  public patch(path: string, handler: Function): ControllerExtension {
    return this.addRoute(path, handler);
  }

  protected addRoute(path: string, handler: Function): ControllerExtension {
    const route = new ControllerSettings();

    route.setHandler(handler);
    this._routes[path] = route;

    return route;
  }

  public handle(ctx: any): void | never {
    const controllerSettings: ControllerSettings = this._routes[ctx.request.pathname];

    if (controllerSettings) {
      useController(controllerSettings.setData(ctx).toObject());
    } else {
      throw new UndefinedRouteHttpException();
    }
  }
}

export default Router;
