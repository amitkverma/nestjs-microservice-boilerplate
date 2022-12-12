import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { NotFoundError, PrismaClientValidationError, PrismaClientUnknownRequestError, PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { BaseExceptionFilter } from '@nestjs/core';

import { Response } from 'express';

interface IHTTPError{
    status: number,
    message: string
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const errorObj = {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error',
            message: 'Internal Server Error',
            meta: null
        }
        if (exception instanceof NotFoundError) {
            errorObj.error = (exception as NotFoundError).name;
            errorObj.statusCode = HttpStatus.NOT_FOUND;
            errorObj.message = 'Data Not Found';
        } else if (exception instanceof PrismaClientValidationError) {
            errorObj.error = (exception as PrismaClientValidationError).name;
            errorObj.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
            errorObj.message = (exception as PrismaClientValidationError).message
        }
        else if (exception instanceof PrismaClientUnknownRequestError) {
            errorObj.error = (exception as PrismaClientUnknownRequestError).name;
            errorObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            errorObj.message = (exception as PrismaClientUnknownRequestError).message
        }
        else if (exception instanceof PrismaClientKnownRequestError) {
            errorObj.error = 'Request Error';
            errorObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            errorObj.message = (exception as PrismaClientKnownRequestError).message
            errorObj.meta = (exception as PrismaClientKnownRequestError).meta
        }
        return response.status(HttpStatus.NOT_FOUND).json({ statusCode: (exception as IHTTPError).status, error: (exception as HttpException).name, message: (exception as HttpException).message, meta: (exception as HttpException).cause });
    }
}
