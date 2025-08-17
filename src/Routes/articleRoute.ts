import express from "express";
import protect from "../Middlewares/auth.middleware";
import {
  publishArticle,
  getUserFeed,
  viewArticle,
  likeArticle,
} from "../Controllers/articleController";

const articleRouter = express.Router();

articleRouter.post("/publish", protect, publishArticle);
articleRouter.get("/getRecentArticles", protect, getUserFeed);
articleRouter.post("/viewArticle", protect, viewArticle);
articleRouter.post("/likeArticle", protect, likeArticle);

export default articleRouter;
