import { injectable, inject } from "inversify";
import type { Request, Response } from "express";
import type { IReelsService } from "../services/reels-service.interface";
import type { IReelsController } from "./reels-controller.interface";

@injectable()
export class ReelsController implements IReelsController {
	constructor(
		@inject("IReelsService")
		private readonly reelsService: IReelsService,
	) {}

	async getReelsByUsername(req: Request, res: Response): Promise<void> {
		const { username, postCount } = req.body;
		const reelsData = await this.reelsService.getReelsByUsername(
			username,
			postCount,
		);
		res.status(200).json(reelsData);
	}
}
