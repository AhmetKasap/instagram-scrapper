import type { IErrorMessage } from "../interfaces/error-message.interface";
import { injectable } from "inversify";


@injectable()
export default class HttpException extends Error {
	code: number;
	message: string;
	messageJson: IErrorMessage;
	constructor(code = 500, message: IErrorMessage) {
		super(JSON.stringify(message));
		this.code = code;
		
		this.message = JSON.stringify(message.message);
		this.messageJson = message;
		Error.captureStackTrace(this, this.constructor);
	}
}
export class BadRequestException extends HttpException {
	constructor(error: IErrorMessage) {
		super(400, error);
	}
}

export class UnauthorizedException extends HttpException {
	constructor(error: IErrorMessage) {
		super(401, error);
	}
}

export class PaymentRequiredException extends HttpException {
	constructor(error: IErrorMessage) {
		super(402, error);
	}
}

export class ForbiddenException extends HttpException {
	constructor(error: IErrorMessage) {
		super(403, error);
	}
}

export class NotFoundException extends HttpException {
	constructor(error: IErrorMessage) {
		super(404, error);
	}
}

export class MethodNotAllowedException extends HttpException {
	constructor(error: IErrorMessage) {
		super(405, error);
	}
}

export class NotAcceptableException extends HttpException {
	constructor(error: IErrorMessage) {
		super(406, error);
	}
}

export class ConflictException extends HttpException {
	constructor(error: IErrorMessage) {
		super(409, error);
	}
}

export class GoneException extends HttpException {
	constructor(error: IErrorMessage) {
		super(410, error);
	}
}

export class LengthRequiredException extends HttpException {
	constructor(error: IErrorMessage) {
		super(411, error);
	}
}

export class PreconditionFailedException extends HttpException {
	constructor(error: IErrorMessage) {
		super(412, error);
	}
}

export class PayloadTooLargeException extends HttpException {
	constructor(error: IErrorMessage) {
		super(413, error);
	}
}

export class UnsupportedMediaTypeException extends HttpException {
	constructor(error: IErrorMessage) {
		super(415, error);
	}
}

export class UnprocessableEntityException extends HttpException {
	constructor(error: IErrorMessage) {
		super(422, error);
	}
}

export class TooManyRequestsException extends HttpException {
	constructor(error: IErrorMessage) {
		super(429, error);
	}
}

export class InternalServerErrorException extends HttpException {
	constructor(error: IErrorMessage) {
		super(500, error);
	}
}

export class NotImplementedException extends HttpException {
	constructor(error: IErrorMessage) {
		super(501, error);
	}
}

export class BadGatewayException extends HttpException {
	constructor(error: IErrorMessage) {
		super(502, error);
	}
}

export class ServiceUnavailableException extends HttpException {
	constructor(error: IErrorMessage) {
		super(503, error);
	}
}

export class GatewayTimeoutException extends HttpException {
	constructor(error: IErrorMessage) {
		super(504, error);
	}
}
export class ExpiredException extends HttpException {
	constructor(error: IErrorMessage) {
		super(410, error);
	}
}
