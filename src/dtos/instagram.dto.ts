export interface IInstagramScheduleData {
	_id: string;
	settings: {
		customUrl: string;
		instagramId: string;
		postCount: number;
		interval: number;
		fetchActive: boolean;
	};
	categoryId: string;
}

export interface IInstagramProfile {
	username: string;
	fullName: string;
	bio: string;
	profilePicUrl: string;
}

export interface IInstagramReel {
	reelsUrl: string;
	pubDate?: Date;
}

export interface ICreateReelDto {
	publisherId: string;
	categoryId: string;
	pubDate: Date;
	reelsUrl: string;
	isActive: boolean;
	notificationCreated: boolean;
	filePath: string;
}
