import { Types } from "mongoose";

export interface ITagService {
  createTag(title: string): Promise<void>;
  getAllTagsWithArticles(): Promise<any[]>;
  getFollowedTags(userId: Types.ObjectId): Promise<any[]>;
  followTag(userId: Types.ObjectId, tagId: Types.ObjectId): Promise<void>;
  unfollowTag(userId: Types.ObjectId, tagId: Types.ObjectId): Promise<void>;
  getTopVisitedTags(): Promise<any[]>;
}
