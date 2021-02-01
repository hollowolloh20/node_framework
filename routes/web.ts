import Router from '../framework/router/router';
import Middle from '../app/http/middleware/someCheck';
import Middle2 from '../app/http/middleware/someCheck2';
import Middle3 from '../app/http/middleware/someCheck3';
import Middle4 from '../app/http/middleware/someCheck4';

const router = new Router();

router
  .get('/index', (ctx) => {
    ctx.response.send(
      JSON.stringify({
        result: 'success',
      })
    );
  })
  .useBefore([new Middle()]);

router
  .get('/index2', (ctx) => {
    ctx.response.send(
      JSON.stringify({
        result: 'success',
      })
    );
  })
  .useBefore([new Middle2()]);

router
  .get('/index3', (ctx) => {
    ctx.response.send(
      JSON.stringify({
        result: 'success',
      })
    );
  })
  .useBefore([new Middle3()]);

router
  .get('/index4', (ctx) => {
    ctx.response.send(
      JSON.stringify({
        result: 'success',
      })
    );
  })
  .useBefore([new Middle3(), new Middle3()])
  .useAfter([new Middle4(), new Middle4()]);

export default router;
