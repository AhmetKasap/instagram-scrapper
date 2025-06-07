import { IProfile } from "../dtos/profile.dto";

export interface IProfileService {
	getProfile(username: string): Promise<any>;
}
