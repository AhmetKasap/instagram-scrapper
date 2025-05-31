export interface IPaginatedResponse<T> {
	message: string;
	page: number;
	limit: number;
	result: T[];
	totalCount: number;
}
