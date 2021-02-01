import { HttpException } from '../';

class UndefinedRouteHttpException extends HttpException {
  public constructor() {
    super('Undefined route');
    this.status = 404;
    this.title = 'UndefinedRouteHttpException';
    this.detail = 'Cannot find router of undefined';
  }
}

export default UndefinedRouteHttpException;
