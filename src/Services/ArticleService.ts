import { IArticleService } from "../Interfaces/IArticleService";
import Article from "../Models/article";
import Tag from "../Models/tag";
import User from "../Models/user";
import { Types } from "mongoose";

export class ArticleService implements IArticleService {
  async publishArticle(data: {
    title: string;
    summary: string;
    body: string;
    tags: Types.ObjectId[];
    publisher: Types.ObjectId;
  }): Promise<any> {
    const { title, summary, body, tags, publisher } = data;

    if (!title || !summary || !body || !tags || !publisher) {
      throw new Error("All fields are required to publish an article.");
    }

    if (!Array.isArray(tags)) {
      throw new Error("Tags must be an array.");
    }

    const existingTags = await Tag.find({ _id: { $in: tags } });
    if (existingTags.length !== tags.length) {
      throw new Error("One or more tags are invalid.");
    }

    const article = await Article.create({
      title,
      summary,
      body,
      publisher,
      tags,
    });

    await User.findByIdAndUpdate(publisher, { isPublisher: true });

    return article;
  }

  async getUserFeed(userId: string): Promise<any[]> {
    const user = await User.findById(userId).populate("followingTags", "_id");
    if (!user) throw new Error("User not found.");

    const followedTagIds = user.followingTags.map((tag: any) => tag._id);
    if (!followedTagIds.length) return [];

    const articles = await Article.find({ tags: { $in: followedTagIds } })
      .sort({ createdAt: -1 })
      .limit(10);

    return articles;
  }

  async viewArticle(articleId: string, userId: string): Promise<any> {
    const article = await Article.findById(articleId).populate(
      "publisher",
      "fullName -_id"
    );
    if (!article) throw new Error("Article not found.");

    if (!article.viewedBy.includes(new Types.ObjectId(userId))) {
      article.viewers += 1;
      article.viewedBy.push(new Types.ObjectId(userId));
      await article.save();
    }

    await Tag.updateMany(
      { _id: { $in: article.tags } },
      { $inc: { visited: 1 } }
    );

    const articleObj = article.toObject();
    delete articleObj.viewedBy;
    delete articleObj.likedBy;
    delete articleObj.tags;

    return articleObj;
  }

  async likeArticle(articleId: string, userId: string): Promise<number> {
    const article = await Article.findById(articleId);
    if (!article) throw new Error("Article not found.");

    if (article.likedBy.includes(new Types.ObjectId(userId))) {
      throw new Error("You already liked this article.");
    }

    article.likes += 1;
    article.likedBy.push(new Types.ObjectId(userId));
    await article.save();

    return article.likes;
  }
}
