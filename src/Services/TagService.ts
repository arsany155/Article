import { ITagService } from "../Interfaces/ITagService";
import Tag from "../Models/tag";
import Article from "../Models/article";
import User from "../Models/user";
import { Types } from "mongoose";

export class TagService implements ITagService {
  async createTag(title: string): Promise<void> {
    if (!title) throw new Error("Field is required");

    const existingTag = await Tag.findOne({ title: title.toLowerCase() });
    if (existingTag) {
      throw new Error("This title has been used already");
    }

    await Tag.create({ title: title.toLowerCase() });
  }

  async getAllTagsWithArticles(): Promise<any[]> {
    const tags = await Tag.find().select("title");

    const tagsWithArticles = await Promise.all(
      tags.map(async (tag) => {
        const articles = await Article.find({ tags: tag._id })
          .select("title summary publisher createdAt")
          .populate("publisher", "fullName");

        return {
          _id: tag._id,
          title: tag.title,
          articles,
        };
      })
    );

    return tagsWithArticles;
  }

  async getFollowedTags(userId: Types.ObjectId): Promise<any[]> {
    const user = await User.findById(userId).populate("followingTags", "title");
    if (!user) throw new Error("User not found");

    return user.followingTags;
  }

  async followTag(
    userId: Types.ObjectId,
    tagId: Types.ObjectId
  ): Promise<void> {
    const tag = await Tag.findById(tagId);
    if (!tag) throw new Error("Tag not found");

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    if (user.followingTags.includes(tagId)) {
      throw new Error("You are already following this tag");
    }

    user.followingTags.push(tagId);
    await user.save();
  }

  async unfollowTag(
    userId: Types.ObjectId,
    tagId: Types.ObjectId
  ): Promise<void> {
    const tag = await Tag.findById(tagId);
    if (!tag) throw new Error("Tag not found");

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    if (!user.followingTags.includes(tagId)) {
      throw new Error("You are not following this tag");
    }

    user.followingTags = user.followingTags.filter(
      (id) => id.toString() !== tagId.toString()
    );
    await user.save();
  }

  async getTopVisitedTags(): Promise<any[]> {
    return await Tag.find()
      .sort({ visited: -1 })
      .limit(5)
      .select("title visited");
  }
}
