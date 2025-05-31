import dotenv from "dotenv";
import { injectable } from "inversify";

dotenv.config();

const envCheckVariables = [
	"PORT",
	"MONGO_URL",
	"ADMIN_KEY",
	"RAPIDAPI_KEY",
	"KAFKA_BROKERS",

	"INSTAGRAM_KAFKA_CLIENT_ID",
	"INSTAGRAM_KAFKA_GROUP_ID",
	"INSTAGRAM_KAFKA_TOPIC",
	"INSTAGRAM_REDIS_TTL",
	"INSTAGRAM_BULLMQ_QUEUE",
	"INSTAGRAM_USERNAME",
	"INSTAGRAM_PASSWORD",
	"CORS_ORIGIN",
];

export interface IConfig {
	PORT: number;
	MONGO_URL: string;
	REDIS_HOST: string;
	REDIS_PORT: number;
	REDIS_PASSWORD: string;
	KAFKA_BROKERS: string;
	ADMIN_KEY: string;
	RAPIDAPI_KEY: string;

	INSTAGRAM_KAFKA_CLIENT_ID: string;
	INSTAGRAM_KAFKA_GROUP_ID: string;
	INSTAGRAM_KAFKA_TOPIC: string;
	INSTAGRAM_REDIS_TTL: number;
	INSTAGRAM_BULLMQ_QUEUE: string;
	INSTAGRAM_USERNAME: string;
	INSTAGRAM_PASSWORD: string;
	CORS_ORIGIN: string;
}

@injectable()
class Config implements IConfig {
	PORT: number;
	MONGO_URL: string;
	ADMIN_KEY: string;
	RAPIDAPI_KEY: string;
	REDIS_HOST: string;
	REDIS_PORT: number;
	REDIS_PASSWORD: string;
	KAFKA_BROKERS: string;

	INSTAGRAM_KAFKA_CLIENT_ID: string;
	INSTAGRAM_KAFKA_GROUP_ID: string;
	INSTAGRAM_KAFKA_TOPIC: string;
	INSTAGRAM_REDIS_TTL: number;
	INSTAGRAM_BULLMQ_QUEUE: string;
	INSTAGRAM_USERNAME: string;
	INSTAGRAM_PASSWORD: string;
	CORS_ORIGIN: string;

	constructor() {
		envCheckVariables.forEach((variable) => {
			let optional = false;
			if (variable.endsWith("?")) {
				optional = true;
				variable = variable.slice(0, -1);
			}
			if (process.env[variable] === undefined) {
				if (optional) {
					return;
				}
				throw new Error(`${variable} is not defined`);
			}
		});
		this.PORT = +(process.env["PORT"] as string);

		this.MONGO_URL = process.env["MONGO_URL"] as string;

		this.REDIS_HOST = process.env["REDIS_HOST"] as string;
		this.REDIS_PORT = process.env["REDIS_PORT"] as unknown as number;
		this.REDIS_PASSWORD = process.env["REDIS_PASSWORD"] as string;
		this.KAFKA_BROKERS = process.env["KAFKA_BROKERS"] as string;
		this.ADMIN_KEY = process.env["ADMIN_KEY"] as string;
		this.RAPIDAPI_KEY = process.env["RAPIDAPI_KEY"] as string;
		this.INSTAGRAM_KAFKA_CLIENT_ID = process.env[
			"INSTAGRAM_KAFKA_CLIENT_ID"
		] as string;
		this.INSTAGRAM_KAFKA_GROUP_ID = process.env[
			"INSTAGRAM_KAFKA_GROUP_ID"
		] as string;
		this.INSTAGRAM_KAFKA_TOPIC = process.env[
			"INSTAGRAM_KAFKA_TOPIC"
		] as string;
		this.INSTAGRAM_REDIS_TTL = process.env[
			"INSTAGRAM_REDIS_TTL"
		] as unknown as number;
		this.INSTAGRAM_BULLMQ_QUEUE = process.env[
			"INSTAGRAM_BULLMQ_QUEUE"
		] as string;
		this.INSTAGRAM_USERNAME = process.env["INSTAGRAM_USERNAME"] as string;
		this.INSTAGRAM_PASSWORD = process.env["INSTAGRAM_PASSWORD"] as string;
		this.CORS_ORIGIN = process.env["CORS_ORIGIN"] as string;
	}
}

export default Config;
