import { AfterMiddleware, BeforeMiddleware } from './middleware';

export interface ControllerExtension {
  useBefore(middlewares: Array<BeforeMiddleware>): ControllerExtension;
  useAfter(middlewares: Array<AfterMiddleware>): ControllerExtension;
}
