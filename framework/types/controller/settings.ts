import { BeforeMiddleware, AfterMiddleware } from '../../interfaces/';

export type Settings = {
  handler: Function;
  data?: any;
  beforeMiddlewares?: Array<BeforeMiddleware>;
  afterMiddlewares?: Array<AfterMiddleware>;
};
