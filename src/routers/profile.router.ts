import { RequestHandler, Router } from "express";
import { inject, injectable } from "inversify";
import type { IRouter } from "../interfaces/router.interface";
import type { IProfileController } from "../controllers/profile-controller.interface";
import authMiddleware from "../middlewares/auth.middleware";

@injectable()
class ProfileRouter implements IRouter {
	router: Router = Router();
	path: string = "/api/v1/instagram-scrapper/profile";

	constructor(
		@inject("IProfileController")
		private readonly profileController: IProfileController,
	) {}

	setupRoutes(): void {
		this.router.get(
			"/:username",
			authMiddleware() as unknown as RequestHandler,
			this.profileController.getUserProfile.bind(this.profileController),
		);
	}
}

export default ProfileRouter;
