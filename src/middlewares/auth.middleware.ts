import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/http.exceptions";
import { container } from "../inversify.config";
import { IConfig } from "../config";

export default function authMiddleware() {
	const config = container.get<IConfig>("IConfig");
	return async (
		req: Request,
		_res: Response,
		next: NextFunction,
	) => {
		const rapidApiHost = req.headers["x-rapidapi-host"];
		const rapidApiKey = req.headers["x-rapidapi-key"];
		const adminKey = req.headers["admin-api-key"];

		if (adminKey && adminKey === config.ADMIN_KEY) {
			return next(); 
		}

		if (rapidApiHost && rapidApiKey === config.RAPIDAPI_KEY) {
			return next();
		}

		throw new UnauthorizedException({
			message: "Access denied: Unauthorized request",
			errorId: 401,
		});
	};
}
