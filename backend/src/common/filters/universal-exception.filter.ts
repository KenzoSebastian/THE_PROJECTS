import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class UniversalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<any>();

    if (
      exception &&
      (exception.code === 'LIMIT_UNEXPECTED_FILE' ||
        exception.message?.includes('Unexpected field'))
    ) {
      const wrongField = exception.field ? `'${exception.field}'` : 'tertentu';

      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        message: `Field file ${wrongField} tidak dikenali atau salah ketik pada endpoint [${request.method}] ${request.url}. Silakan periksa kembali key form-data Anda.`,
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const resBody = exception.getResponse() as any;

      if (status === HttpStatus.BAD_REQUEST && resBody.message) {
        return response.status(status).json({
          statusCode: status,
          error: 'Validation Error',
          message: resBody.message,
        });
      }

      return response.status(status).json(resBody);
    }

    // 3. DEFAULT ERROR HANDLING (SERVER CRASH / PRISMA DATABASE ERROR)
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: exception.message || 'Terjadi kesalahan internal pada server.',
    });
  }
}
