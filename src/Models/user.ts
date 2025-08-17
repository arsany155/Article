import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    followingTags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    followingPublishers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isPublisher: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
