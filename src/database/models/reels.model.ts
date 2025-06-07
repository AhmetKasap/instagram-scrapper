import mongoose, { Document, Schema, Types } from "mongoose";

export interface IReels {
	reelsUrl: string;
	pubDate: Date;
	username: string;
}

export interface IReelsWithDocument
	extends IReels,
		Document<Types.ObjectId> {}

const ReelsSchema = new Schema<IReelsWithDocument>({
	reelsUrl: { type: String, required: true },
	pubDate: { type: Date, required: true },
	username: { type: String, ref: "Profile", required: true },
});

export const ReelsModel = mongoose.model<IReelsWithDocument>(
	"Reels",
	ReelsSchema,
);
