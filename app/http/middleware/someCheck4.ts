import { AfterMiddleware } from '../../../framework/interfaces';

class SomeCheck implements AfterMiddleware {
  public async handle(ctx: any): Promise<void> {
    const rand = Math.floor(Math.random() * Math.floor(10));
    console.log(`After 4: ${rand}`);
  }
}

export default SomeCheck;
