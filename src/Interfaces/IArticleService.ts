import { Types } from "mongoose";

export interface IArticleService {
  publishArticle(data: {
    title: string;
    summary: string;
    body: string;
    tags: Types.ObjectId[];
    publisher: Types.ObjectId;
  }): Promise<any>;

  getUserFeed(userId: string): Promise<any[]>;

  viewArticle(articleId: string, userId: string): Promise<any>;

  likeArticle(articleId: string, userId: string): Promise<number>;
}
