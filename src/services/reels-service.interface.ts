import type { IInstagramReel } from "../dtos/instagram.dto";

export interface IReelsService {
	getReelsByUsername(
		username: string,
		postCount: number,
	): Promise<IInstagramReel[]>;
}
