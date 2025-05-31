import { injectable, inject } from "inversify";
import type { Request, Response } from "express";
import type { IProfileService } from "../services/profile-service.interface";
import type { IProfileController } from "./profile-controller.interface";

@injectable()
export class ProfileController implements IProfileController {
	constructor(
		@inject("IProfileService")
		private readonly profileService: IProfileService,
	) {}

	async getUserProfile(req: Request, res: Response): Promise<void> {
		const { username } = req.params;
		const profileData = await this.profileService.getProfile(username);
		res.status(200).json(profileData);
	}
}
