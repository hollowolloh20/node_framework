import { BeforeMiddleware, AfterMiddleware } from '../interfaces';

export type Settings = {
  data: any;
  handler: Function;
  beforeMiddlewares: Array<BeforeMiddleware>;
  afterMiddlewares: Array<AfterMiddleware>;
};

async function useController(settings: Settings): Promise<void> {
  const data: any = settings.data;
  const enabledBeforeMiddlewares: boolean = !!settings.beforeMiddlewares.length;
  let successBeforeMiddlewares: boolean = true;

  if (enabledBeforeMiddlewares) {
    successBeforeMiddlewares = await executeBeforeMiddlewares(data, settings.beforeMiddlewares);
  }

  if (successBeforeMiddlewares) {
    const controllerHandler = settings.handler(data);

    if (controllerHandler instanceof Promise) {
      await controllerHandler;
    }

    executeAfterMiddlewares(data, settings.afterMiddlewares);
  }
}

async function executeBeforeMiddlewares(data: any, middlewares: Array<BeforeMiddleware>): Promise<boolean> {
  const length: number = middlewares.length;

  if (!length) {
    return true;
  }

  // TODO: next() 1. Generator
  for (let i = 0; i < length; i++) {
    const middleware = middlewares[i];
    let isNext: boolean = false;
    let executeMiddleware: void | Promise<any> = middleware.handle(data, () => {
      isNext = true;
    });

    if (executeMiddleware instanceof Promise) {
      executeMiddleware = await executeMiddleware;
    }

    if (!isNext) {
      return false;
    }
  }

  return true;
}

function executeAfterMiddlewares(data: any, middlewares: Array<AfterMiddleware>): void {
  const length: number = middlewares.length;

  if (length) {
    for (let i = 0; i < length; i++) {
      middlewares[i].handle(data);
    }
  }
}

export default useController;
