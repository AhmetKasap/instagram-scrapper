import { injectable } from "inversify";
import BaseRepository from "./base.repository";
import { IReelsWithDocument, ReelsModel } from "../models/reels.model";

export interface IReelsRepository
	extends BaseRepository<IReelsWithDocument> {}

@injectable()
class ReelsRepository
	extends BaseRepository<IReelsWithDocument>
	implements IReelsRepository
{
	constructor() {
		super(ReelsModel);
	}
}

export default ReelsRepository;
