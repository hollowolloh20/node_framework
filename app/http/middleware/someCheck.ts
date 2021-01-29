import { BeforeMiddleware } from '../../../framework/interfaces';

class SomeCheck implements BeforeMiddleware {
  public async handle(ctx: any, next: Function): Promise<void> {
    await ctx.session.init({ coool: 'loool' });
    next();
  }
}

export default SomeCheck;
