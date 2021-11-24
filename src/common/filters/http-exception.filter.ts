import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp(); // Get access to native response object
    const response = context.getResponse<Response>(); // Get response

    const status = exception.getStatus(); // Get status code of default exception
    const exceptionResponse = exception.getResponse(); // Get response message of default exception
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    // Send custom response
    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
