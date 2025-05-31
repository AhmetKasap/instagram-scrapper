export interface IProfileService {
	getProfile(username: string): Promise<any>;
}
