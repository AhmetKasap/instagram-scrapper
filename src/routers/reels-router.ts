import { RequestHandler, Router } from "express";
import { inject, injectable } from "inversify";
import type { IRouter } from "../interfaces/router.interface";
import type { IReelsController } from "../controllers/reels-controller.interface";
import validationMiddleware from "../middlewares/validation.middleware";
import { CreateReelDto } from "../dtos/reels.dto";
import authMiddleware from "../middlewares/auth.middleware";

@injectable()
class ReelsRouter implements IRouter {
	router: Router = Router();
	path: string = "/api/v1/instagram-scrapper/reels";

	constructor(
		@inject("IReelsController")
		private readonly reelsController: IReelsController,
	) {}

	setupRoutes(): void {
		this.router.post(
			"/",
			authMiddleware() as unknown as RequestHandler,
			validationMiddleware(CreateReelDto, "body"),
			this.reelsController.getReelsByUsername.bind(this.reelsController),
		);
	}
}

export default ReelsRouter;
