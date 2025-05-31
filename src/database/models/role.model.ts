import mongoose, { Document, Types } from "mongoose";

export enum RoleEnum {
	ADMIN = "ADMIN",
	USER = "USER",
}
export interface IRole {
	_id: Types.ObjectId;
	name: RoleEnum;
}
export interface IRoleWithDocument extends IRole, Document<Types.ObjectId> {}

const roleSchema = new mongoose.Schema<IRoleWithDocument>({
	name: { type: String, enum: RoleEnum, required: true },
});

const RoleModel = mongoose.model<IRoleWithDocument>("Role", roleSchema);

export default RoleModel;
