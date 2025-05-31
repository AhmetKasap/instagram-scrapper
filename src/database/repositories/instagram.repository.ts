import { injectable } from "inversify";
import BaseRepository from "@/database/mongo/repositories/repository";
import {
	InstagramModel,
	type IInstagramWithDocument,
} from "@/database/mongo/models/instagram.model";

export interface IInstagramRepository
	extends BaseRepository<IInstagramWithDocument> {}

@injectable()
class InstagramRepository
	extends BaseRepository<IInstagramWithDocument>
	implements IInstagramRepository
{
	constructor() {
		super(InstagramModel);
	}
}

export default InstagramRepository;
