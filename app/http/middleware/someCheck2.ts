import { BeforeMiddleware } from '../../../framework/interfaces';

class SomeCheck implements BeforeMiddleware {
  public async handle(ctx: any, next: Function): Promise<void> {
    const t = await ctx.session.get();
    if (t) {
      console.log(t);
      t.coool += t.coool;
      await ctx.session.set(t);
      ctx.response.send(JSON.stringify(await ctx.session.get()));
    } else {
      next();
    }
  }
}

export default SomeCheck;
