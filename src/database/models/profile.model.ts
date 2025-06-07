import mongoose, { Document, Schema, Types } from "mongoose";

export interface IProfile {
	username: string;
	fullName: string;
	bio: string;
	profilePicUrl: string;
}

export interface IProfileWithDocument
	extends IProfile,
		Document<Types.ObjectId> {}

const ProfileSchema = new Schema<IProfileWithDocument>({
	username: { type: String, required: true },
	fullName: { type: String, required: true },
	bio: { type: String, required: true },
	profilePicUrl: { type: String, required: true },
});

 const ProfileModel = mongoose.model<IProfileWithDocument>(
	"Profile",
	ProfileSchema,
);
export default ProfileModel;