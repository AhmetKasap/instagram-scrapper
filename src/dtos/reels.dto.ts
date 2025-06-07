import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export interface ICreateReel {
	username: string;
	postCount: number;
}

export class CreateReelDto implements ICreateReel {
	@IsString()
	@IsNotEmpty()
	username!: string;

	@IsNumber()
	@IsNotEmpty()
	postCount!: number;
}


export interface IReelsResponse{
	reelsUrl: string;
	pubDate?: Date;
}


export interface ISaveReelsData {
	username: string;
	reelsUrl: string;
	pubDate: Date;
}