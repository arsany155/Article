import { Request, Response } from "express";
import Article from "../Models/article";
import Tag from "../Models/tag";
import User from "../Models/user";
import asyncHandler from "express-async-handler";
import { ArticleService } from "../Services/ArticleService";

const articleService = new ArticleService();

export const publishArticle = asyncHandler(
  async (req: Request, res: Response) => {
    const article = await articleService.publishArticle(req.body);
    res
      .status(201)
      .json({ message: "Article published successfully", article });
  }
);

export const getUserFeed = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const articles = await articleService.getUserFeed(userId);
  res.status(200).json({ articles });
});

export const viewArticle = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const { articleId } = req.body;
  const article = await articleService.viewArticle(articleId, userId);
  res.status(200).json({ article });
});

export const likeArticle = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const { articleId } = req.body;
  const likes = await articleService.likeArticle(articleId, userId);
  res.status(200).json({ likes });
});
