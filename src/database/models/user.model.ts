import mongoose, { Document, Types } from "mongoose";
import { IRole, RoleEnum } from "./role.model";

export interface IUser {
	email: string;
	password: string;
	role: IRole;
	
}

export interface IUserWithDocument extends IUser, Document<Types.ObjectId> {}

const userSchema = new mongoose.Schema<IUserWithDocument>(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: {
			type: mongoose.Schema.Types.ObjectId,
			enum: RoleEnum,
			ref: "Role",
			required: true,
		},
	},
	{ versionKey: false },
);

const UserModel = mongoose.model<IUserWithDocument>("User", userSchema);

export default UserModel;
