import { ControllerExtension } from './controller';

export interface RouterContract {
  handle(ctx: any): void;
}

export interface RouterHttpRequests {
  get(route: string, handler: Function): ControllerExtension;
  post(route: string, handler: Function): ControllerExtension;
  put(route: string, handler: Function): ControllerExtension;
  delete(route: string, handler: Function): ControllerExtension;
  patch(route: string, handler: Function): ControllerExtension;
}
