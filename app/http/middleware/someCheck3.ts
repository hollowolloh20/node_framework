import { BeforeMiddleware, AfterMiddleware } from '../../../framework/interfaces';
import EventEmitter from '../../../framework/events';
// import { EventEmitter } from 'events';

class Before implements BeforeMiddleware {
  public async handle(ctx: any, next: Function): Promise<void> {
    const rand = Math.floor(Math.random() * Math.floor(10));
    console.log('Before implements BeforeMiddleware rand = ' + rand);
    if (rand >= 5) {
      console.log('CTX = ' + ctx);
      next();
    }
  }
}

class After implements AfterMiddleware {
  public async handle(ctx: any): Promise<void> {
    console.log('Hello from after');
    console.log('After ctx = ' + ctx);
  }
}

class SomeCheck implements BeforeMiddleware {
  public async handle(ctx: any, next: Function): Promise<void> {
    const human = new EventEmitter();

    human
      .on('pain', (message: string) => {
        console.log(`I can't stand ${message}`);
      })
      .useBefore([new Before()]);

    human
      .on('scream', () => {
        console.log("Silent scream who no one can't hear!");
      })
      .useAfter([new After()]);

    human.emit('pain', 'this shit!');
    human.emit('scream');
    next();
  }
}

export default SomeCheck;
