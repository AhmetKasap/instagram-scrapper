import { IsNotEmpty, IsString } from "class-validator";

export interface IProfile {
	username: string;
	
}

export class ProfileDto implements IProfile {
	@IsString()
	@IsNotEmpty()
	username!: string;

}

export interface IProfileResponse {
	username: string;
	fullName: string;
	bio: string;
	profilePicUrl: string;
}