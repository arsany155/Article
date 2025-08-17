import express from "express";
import protect from "../Middlewares/auth.middleware";
import {
  userRegistration,
  userLogin,
  getAllPublishers,
  followPublisher,
  unfollowPublisher,
} from "../Controllers/userController";

const userRouter = express.Router();

userRouter.post("/register", userRegistration);
userRouter.post("/login", userLogin);
userRouter.post("/follow", protect, followPublisher);
userRouter.post("/unfollow", protect, unfollowPublisher);
userRouter.get("/getAllPublishers", getAllPublishers);

export default userRouter;
