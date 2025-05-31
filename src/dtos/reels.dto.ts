import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export interface ICreateReelDto {
	username: string;
	postCount: number;
}

export class CreateReelDto implements ICreateReelDto {
	@IsString()
	@IsNotEmpty()
	username!: string;

	@IsNumber()
	@IsNotEmpty()
	postCount!: number;
}
