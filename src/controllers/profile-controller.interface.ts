import type { Request, Response } from "express";

export interface IProfileController {
	getUserProfile(req: Request, res: Response): Promise<void>;
}
