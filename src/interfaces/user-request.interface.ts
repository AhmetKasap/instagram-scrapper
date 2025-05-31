import type { Request } from "express";
import type { IUser } from "src/database/models/user.model";

export default interface IUserRequest<T, U, V> extends Request<T, U, V> {
	user: IUser;
}
