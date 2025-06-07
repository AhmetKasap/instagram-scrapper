import type { IReelsResponse } from "../dtos/reels.dto";

export interface IReelsService {
	getReelsByUsername(
		username: string,
		postCount: number,
	): Promise<IReelsResponse[]>;
}
