import {
	Model,
	Document,
	type RootFilterQuery,
	type MongooseBaseQueryOptions,
	type ProjectionType,
	type UpdateQuery,
} from "mongoose";
import handleMongooseError from "../error-handler";

class BaseRepository<T extends Document> {
	private readonly model: Model<T>;

	constructor(model: Model<T>) {
		this.model = model;
	}
	getModel() {
		return this.model;
	}
	async create(data: Partial<T>): Promise<T> {
		try {
			return await this.model.create(data);
		} catch (error) {
			handleMongooseError(error);
		}
	}
	async createMany(data: Partial<T>[]): Promise<T[]> {
		try {
			return await this.model.create(data);
		} catch (error) {
			handleMongooseError(error);
		}
	}

	async find(
		query: RootFilterQuery<T>,
		projection?: ProjectionType<T>,
	): Promise<T[]> {
		try {
			return await this.model.find(query, projection).exec();
		} catch (error) {
			handleMongooseError(error);
		}
	}

	async findById(
		id: string,
		projection?: ProjectionType<T>,
	): Promise<T | null> {
		try {
			return await this.model.findById(id, projection).exec();
		} catch (error) {
			handleMongooseError(error);
		}
	}

	async findOne(query: RootFilterQuery<T>): Promise<T | null> {
		try {
			return await this.model.findOne(query).exec();
		} catch (error) {
			handleMongooseError(error);
		}
	}

	async findByIdAndUpdate(id: string, data: Partial<T>): Promise<T | null> {
		try {
			return await this.model.findByIdAndUpdate(id, data);
		} catch (error) {
			handleMongooseError(error);
		}
	}

	async updateOne(
		filter: RootFilterQuery<T>,
		update: UpdateQuery<T>,
	): Promise<void> {
		await this.model.updateOne(filter, update).exec();
	}

	async deleteById(id: string): Promise<void> {
		try {
			await this.model.findByIdAndDelete(id).exec();
		} catch (error) {
			handleMongooseError(error);
		}
	}
	async deleteMany(filter: RootFilterQuery<T>): Promise<void> {
		try {
			await this.model.deleteMany(filter).exec();
		} catch (error) {
			handleMongooseError(error);
		}
	}
	async deleteOne(filter: RootFilterQuery<T>): Promise<void> {
		try {
			await this.model.deleteOne(filter).exec();
		} catch (error) {
			handleMongooseError(error);
		}
	}

	async findWithPagination(
		query: RootFilterQuery<T>,
		projection?: ProjectionType<T>,
		page: number = 1,
		limit: number = 10,
	): Promise<T[]> {
		try {
			return await this.model
				.find(query, projection)
				.skip((page - 1) * limit)
				.limit(limit)
				.exec();
		} catch (error) {
			handleMongooseError(error);
		}
	}

	async count(
		filter: RootFilterQuery<T> | undefined = undefined,
		options: MongooseBaseQueryOptions<T> | null = null,
	): Promise<number> {
		try {
			return await this.model.countDocuments(filter, options).exec();
		} catch (error) {
			handleMongooseError(error);
		}
	}
}

export default BaseRepository;
