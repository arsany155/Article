import express from "express";
import protect from "../Middlewares/auth.middleware";
import {
  createTag,
  getAllTagsWithArticles,
  getFollowedTags,
  followTag,
  unfollowTag,
  getTopVisitedTags,
} from "../Controllers/tagController";

const tagRouter = express.Router();

tagRouter.post("/create", createTag);
tagRouter.get("/", getAllTagsWithArticles);
tagRouter.get("/followed", protect, getFollowedTags);
tagRouter.get("/getTopVisitedTags", getTopVisitedTags);
tagRouter.post("/follow", protect, followTag);
tagRouter.post("/unfollow", protect, unfollowTag);

export default tagRouter;
