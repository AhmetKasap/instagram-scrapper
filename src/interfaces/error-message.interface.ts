export interface IValidationError {
	field: string;
	errors: string[];
}
export interface IErrorMessage {
	validationErrors?: IValidationError[];
	errorId: number;
	message: string;
	details?: any;
}
