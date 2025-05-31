import BaseRepository from "./base.repository";
import { injectable } from "inversify";
import UserModel, { type IUserWithDocument } from "../models/user.model";

export interface IUserRepository extends BaseRepository<IUserWithDocument> {}

@injectable()
class UserRepository
	extends BaseRepository<IUserWithDocument>
	implements IUserRepository
{
	constructor() {
		super(UserModel);
	}
}

export default UserRepository;
