import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserService } from "../Services/UserService";
import { Types } from "mongoose";

const userService = new UserService();
export const userRegistration = asyncHandler(
  async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;
    await userService.register(fullName, email, password);
    res.status(201).json({ message: "Registered successfully" });
  }
);

export const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await userService.login(email, password);

  res.status(200).json({
    message: "Login successful",
    data: { token },
  });
});

export const getAllPublishers = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const publishers = await userService.getAllPublishers(userId);
    res.status(200).json({ publishers });
  }
);

export const followPublisher = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = new Types.ObjectId((req as any).user._id);
    const publisherId = new Types.ObjectId(req.body.publisherId);

    await userService.followPublisher(userId, publisherId);
    res.status(200).json({ message: "Now following publisher" });
  }
);

export const unfollowPublisher = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = new Types.ObjectId((req as any).user._id);
    const publisherId = new Types.ObjectId(req.body.publisherId);

    await userService.unfollowPublisher(userId, publisherId);
    res.status(200).json({ message: "Publisher unfollowed successfully" });
  }
);
