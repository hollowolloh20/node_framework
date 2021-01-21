import { AfterMiddleware } from '../../../framework/interfaces';

class SomeCheck implements AfterMiddleware {
  public async handle(ctx: any): Promise<void> {
    const rand = Math.floor(Math.random() * Math.floor(10));
    setTimeout(() => console.log(`After 3: ${rand}`), 3000);
  }
}

export default SomeCheck;
