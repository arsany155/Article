// src/Services/UserService.ts
import { IUserService } from "../Interfaces/IUserService";
import User from "../Models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export class UserService implements IUserService {
  public async register(
    fullName: string,
    email: string,
    password: string
  ): Promise<void> {
    if (!fullName || !email || !password) {
      throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new Error("This user has been registered already");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      fullName: fullName.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });
  }

  public async login(email: string, password: string): Promise<string> {
    if (!email || !password) throw new Error("Email and password are required");

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) throw new Error("Invalid email or password");

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new Error("Invalid email or password");

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "7d" }
    );

    return token;
  }

  public async getAllPublishers(userId: Types.ObjectId): Promise<any[]> {
    console.log(userId);
    const currentUser = await User.findById(userId);
    if (!currentUser) throw new Error("User not found");

    const publishers = await User.find({
      isPublisher: true,
      _id: { $ne: userId },
    }).select("fullName");
    return publishers;
  }

  public async followPublisher(
    userId: Types.ObjectId,
    publisherId: Types.ObjectId
  ): Promise<void> {
    if (userId.toString() === publisherId.toString()) {
      throw new Error("You cannot follow yourself");
    }

    const publisher = await User.findOne({
      _id: publisherId,
      isPublisher: true,
    });
    if (!publisher) throw new Error("Publisher not found");

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    if (user.followingPublishers.includes(publisherId)) {
      throw new Error(`You are already following ${publisher.fullName}`);
    }

    user.followingPublishers.push(publisherId);
    await user.save();
  }

  public async unfollowPublisher(
    userId: Types.ObjectId,
    publisherId: Types.ObjectId
  ): Promise<void> {
    if (userId.toString() === publisherId.toString()) {
      throw new Error("You cannot unfollow yourself");
    }

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    if (!user.followingPublishers.includes(publisherId)) {
      throw new Error("You are not following this publisher");
    }

    user.followingPublishers = user.followingPublishers.filter(
      (id) => id.toString() !== publisherId.toString()
    );
    await user.save();
  }
}
