import { BeforeMiddleware } from '../../../framework/interfaces';

class SomeCheck implements BeforeMiddleware {
  public handle(ctx: any, next: Function): void {
    const rand = Math.floor(Math.random() * Math.floor(10));
    console.log(`Before 1: ${rand}`);

    if (rand >= 5) {
      ctx.response.send(
        JSON.stringify({
          result: false,
        })
      );
    } else {
      next();
    }
  }
}

export default SomeCheck;
