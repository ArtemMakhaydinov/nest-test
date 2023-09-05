import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
    constructor(response) {
        super(
            {
                status: HttpStatus.BAD_REQUEST,
                message: response,
            },
            HttpStatus.BAD_REQUEST
        );
    }
}
