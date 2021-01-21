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
  .useBefore([new Middle(), new Middle2()])
  .useAfter([new Middle3(), new Middle4()]);

export default router;
