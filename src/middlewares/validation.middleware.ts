import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import type { RequestHandler } from "express";
import type { IValidationError } from "../interfaces/error-message.interface";
import HttpException from "../exceptions/http.exceptions";
const validationMiddleware = (
	type: any,
	value: "body" | "query" | "params",
	skipMissingProperties = false,
	whitelist = true,
	forbidNonWhitelisted = true,
): RequestHandler => {
	return (req, _res, next) => {
		const data = plainToInstance(type, req[value]);
		validate(data, {
			skipMissingProperties,
			whitelist,
			forbidNonWhitelisted,
		}).then((errors: ValidationError[]) => {
			if (errors.length > 0) {
				const messages: IValidationError[] = errors.map(
					(error: ValidationError) => {
						const error1: IValidationError = {
							field: error.property,
							errors: [],
						};
						for (const key of Object.keys(
							error?.constraints || {},
						)) {
							if (error.constraints?.[key]) {
								error1.errors.push(error.constraints[key]);
							}
						}
						return error1;
					},
				);
				next(
					new HttpException(400, {
						errorId: 1,
						message: "Validation error",
						validationErrors: messages,
					}),
				);
			} else {
				req[value] = data;
				next();
			}
		});
	};
};

export default validationMiddleware;
