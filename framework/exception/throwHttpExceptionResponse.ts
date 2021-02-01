import { HttpException } from '../exception';

function throwHttpExceptionResponse(response: any, e: HttpException) {
  response.status(e.status).send(
    JSON.stringify({
      status: e.status,
      title: e.title,
      detail: e.detail,
    })
  );
}

export default throwHttpExceptionResponse;
