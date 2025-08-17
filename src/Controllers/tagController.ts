import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { TagService } from "../Services/TagService";
import { Types } from "mongoose";

const tagService = new TagService();

export const createTag = asyncHandler(async (req: Request, res: Response) => {
  await tagService.createTag(req.body.title);
  res.status(201).json({ message: "Tag created successfully" });
});

export const getAllTagsWithArticles = asyncHandler(
  async (req: Request, res: Response) => {
    const tags = await tagService.getAllTagsWithArticles();
    res.status(200).json({ tags });
  }
);

export const getFollowedTags = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = new Types.ObjectId((req as any).user._id);
    const tags = await tagService.getFollowedTags(userId);
    res.status(200).json({ followedTags: tags });
  }
);

export const followTag = asyncHandler(async (req: Request, res: Response) => {
  const userId = new Types.ObjectId((req as any).user._id);
  const tagId = new Types.ObjectId(req.body.tagId);

  await tagService.followTag(userId, tagId);
  res.status(200).json({ message: "You are now following this tag" });
});

export const unfollowTag = asyncHandler(async (req: Request, res: Response) => {
  const userId = new Types.ObjectId((req as any).user._id);
  const tagId = new Types.ObjectId(req.body.tagId);

  await tagService.unfollowTag(userId, tagId);
  res.status(200).json({ message: "You have unfollowed this tag" });
});

export const getTopVisitedTags = asyncHandler(
  async (req: Request, res: Response) => {
    const tags = await tagService.getTopVisitedTags();
    res.status(200).json({ topTags: tags });
  }
);
