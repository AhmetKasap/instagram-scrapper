export interface ILoginService {
	loginToInstagram(page: any): Promise<boolean>;
}
