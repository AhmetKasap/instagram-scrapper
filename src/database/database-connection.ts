import mongoose from "mongoose";

const connectMongoDB = async (MONGO_URI: string): Promise<void> => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("MongoDB connected successfully");
	} catch (err) {
		console.error("MongoDB connection failed:", (err as Error).message);
		process.exit(1);
	}
};

export default connectMongoDB;
