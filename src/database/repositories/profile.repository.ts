import { injectable } from "inversify";
import { IProfileWithDocument } from "../models/profile.model";
import ProfileModel from "../models/profile.model";
import BaseRepository from "./base.repository";

export interface IProfileRepository
	extends BaseRepository<IProfileWithDocument> {}

@injectable()
class ProfileRepository
	extends BaseRepository<IProfileWithDocument>
	implements IProfileRepository
{
	constructor() {
		super(ProfileModel);
	}
}

export default ProfileRepository;
