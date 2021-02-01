import Request from './request';
import Response from './response';
import Cookie from './cookie';
import config from '../../provider/settings/config';
import { Session } from './session';
import { RouterContract } from '../../interfaces';
import { throwHttpExceptionResponse } from '../../exception';

const requestTypeWithoutBody: Array<string> = ['GET', 'OPTIONS', 'TRACE', 'CONNECT'];

function listener(req: any, res: any): void {
  const ctx: any = {};

  setContextCookie(ctx, req, res);
  setContextSession(ctx);
  handleRequest(ctx, req, res);
}

function setContextCookie(ctx: any, req: any, res: any) {
  ctx.cookie = new Cookie(req, res);
}

function setContextSession(ctx: any) {
  const session = config.getSession();

  if (session) {
    ctx.session = new Session(session, ctx.cookie);
  }
}

function handleRequest(ctx: any, req: any, res: any) {
  const request = new Request(req);
  const response = new Response(res);
  const router = config.getRouter();

  if (requestTypeWithoutBody.includes(req.method)) {
    setCtxAndRunRouter(ctx, request, response, router);
  } else {
    let body: string = '';
    req.on('data', (chunk: string) => {
      body += chunk;
    });
    req.on('end', () => {
      request.body = body;
      setCtxAndRunRouter(ctx, request, response, router);
    });
  }
}

function setCtxAndRunRouter(ctx: any, request: Request, response: Response, router: RouterContract) {
  ctx.request = request;
  ctx.response = response;

  try {
    router.handle(ctx);
  } catch (e) {
    throwHttpExceptionResponse(ctx.response, e);
  }
}

export default listener;
