/**
 * @description Generic response interface
 * @template T - The type of the result
 */

export interface IGenericResponse<T = undefined> {
	message: string;
	result?: T;
	success: boolean;
}
