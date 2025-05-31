import mongoose, { Document, Schema, Types } from "mongoose";

export interface IInstagram {
	categoryId: Types.ObjectId;
	publisherId: Types.ObjectId;
	reelsUrl?: string;
	pubDate: Date;
	viewCount: number;
	isActive: boolean;
	notificationCreated?: boolean;
	filePath?: string;
}

export interface IInstagramWithDocument
	extends IInstagram,
		Document<Types.ObjectId> {}

const InstagramSchema = new Schema<IInstagramWithDocument>({
	categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
	publisherId: { type: Schema.Types.ObjectId, ref: "Publisher" },
	reelsUrl: { type: String, default: null },
	pubDate: { type: Date, required: true },
	viewCount: { type: Number, default: 0 },
	isActive: { type: Boolean, default: true },
	notificationCreated: { type: Boolean, default: false },
	filePath: { type: String, default: null },
});

export const InstagramModel = mongoose.model<IInstagramWithDocument>(
	"Instagram",
	InstagramSchema,
);
