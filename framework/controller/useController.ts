import { BeforeMiddleware, AfterMiddleware } from '../interfaces';
import { Settings } from '../types/controller';
import { isPromise } from '../extensions/checker';

const types = {
  beforeMiddleware: 0,
  controller: 1,
  afterMiddleware: 2,
};

async function useController(settings: Settings) {
  const data: any = settings.data;
  const beforeMiddlewares: Array<BeforeMiddleware> | undefined = settings.beforeMiddlewares;
  const afterMiddlewares: Array<AfterMiddleware> | undefined = settings.afterMiddlewares;
  const controllerHandler = settings.handler;
  const stack: Array<any> = [];

  addBeforeMiddlewaresInStack(stack, beforeMiddlewares);
  addControllersInStack(stack, controllerHandler);
  addAfterMiddlewaresInStack(stack, afterMiddlewares);
  make(stack, data);
}

function addBeforeMiddlewaresInStack(stack: Array<any>, beforeMiddlewares: Array<BeforeMiddleware> | undefined) {
  if (beforeMiddlewares) {
    const beforeMiddlewareType: number = types.beforeMiddleware;

    for (const middleware of beforeMiddlewares) {
      stack.push([beforeMiddlewareType, middleware]);
    }
  }
}

function addControllersInStack(stack: Array<any>, controllerHandler: Function) {
  stack.push([types.controller, controllerHandler]);
}

function addAfterMiddlewaresInStack(stack: Array<any>, afterMiddlewares: Array<AfterMiddleware> | undefined) {
  if (afterMiddlewares) {
    const afterMiddlewareType: number = types.afterMiddleware;

    stack.push([afterMiddlewareType, afterMiddlewares]);
  }
}

function make(stack: BeforeMiddleware | Function | Array<AfterMiddleware> | any, data: any) {
  const next = async (): Promise<void> => {
    if (stack.length) {
      const middlewareSettings: Array<any> = stack.shift()!;
      const type: number = middlewareSettings[0];
      const handler: BeforeMiddleware | Function | Array<AfterMiddleware> | any = middlewareSettings[1];

      if (types.beforeMiddleware === type) {
        handler.handle(data, next);
      } else if (types.controller === type) {
        executeController(handler, data, next);
      } else if (types.afterMiddleware === type) {
        for (const middleware of handler) {
          middleware.handle(data);
        }
      }
    }
  };

  next();
}

async function executeController(handler: Function, data: any, next: Function) {
  if (isPromise(handler)) {
    await handler(data);
  } else {
    handler(data);
  }

  next();
}

export default useController;
