export interface BeforeMiddleware {
  handle(data: any, next: Function): void | Promise<any>;
}

export interface AfterMiddleware {
  handle(data: any): Promise<any>;
}
