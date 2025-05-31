import type { Request, Response } from "express";

export interface IReelsController {
	getReelsByUsername(req: Request, res: Response): Promise<void>;
}
