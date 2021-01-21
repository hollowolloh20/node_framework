import http from 'http';
import listener from './framework/server/http/listener';
import config from './framework/provider/settings/config';
import routes from './routes/web';
import session from './bootstrap/session';

config.setRouter(routes);
config.setSession(session);

const server = http.createServer(listener);
server.listen(3000);

/*import RedisSession from './framework/server/http/session/redis';
import { createClient } from 'redis';

const client = createClient();
const session = new RedisSession(client);

session.set('test', { hello: 'yo' });

setTimeout(async () => {
  console.log(await session.get('test'));
}, 1000);*/
