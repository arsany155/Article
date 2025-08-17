import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    visited: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Tag", tagSchema);
