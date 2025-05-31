import RoleModel, { IRoleWithDocument } from "../models/role.model";
import BaseRepository from "./base.repository";
import { injectable } from "inversify";

export interface IRoleRepository extends BaseRepository<IRoleWithDocument> {}

@injectable()
class RoleRepository
	extends BaseRepository<IRoleWithDocument>
	implements IRoleRepository
{
	constructor() {
		super(RoleModel);
	}
}

export default RoleRepository;
