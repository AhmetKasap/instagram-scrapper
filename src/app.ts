import "express-async-errors";
import express, {
	type Express,
	type Request,
	type Response,
	type NextFunction,
} from "express";
import { createServer, Server } from "http";
import cors from "cors";
import morgan from "morgan";
import { inject, injectable } from "inversify";

import HttpException from "./exceptions/http.exceptions";
import type { IConfig } from "./config";
import AppRouter from "./app-router";
import connectMongoDB from "./database/database-connection";

@injectable()
class App {
	app: Express;
	httpServer: Server;
	constructor(
		@inject("IAppRouter") private readonly appRouter: AppRouter,
		@inject("IConfig") private readonly config: IConfig,
	) {
		const app: Express = express();

		app.use(
			cors({
				origin: this.config.CORS_ORIGIN.split(","),
				credentials: true,
			}),
		);

		app.use(morgan("dev"));
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use(express.static("public"));

		this.app = app;
		this.httpServer = createServer(this.app);

	}
	async init() {
		this.appRouter.run(this.app);

		connectMongoDB(this.config.MONGO_URL);

		this.httpServer.listen(this.config.PORT, () => {
			console.log(`App listening on ${this.config.PORT}`);
		});
	}
	afterInit() {
		this.app.use(
			(
				error: HttpException | Error,
				_req: Request,
				res: Response,
				_next: NextFunction,
			) => {
				if (error instanceof HttpException) {
					res.status(error.code).json(error.messageJson);
				} else {
					console.log(error);
					res.status(500).json({
						errorId: 1,
						message: "Bir hata oluştu",
					});
				}
			},
		);
	}
}
export default App;
