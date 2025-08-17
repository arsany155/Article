import { Types } from "mongoose";

export interface IUserService {
  register(fullName: string, email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<string>;
  getAllPublishers(userId: Types.ObjectId): Promise<any[]>;
  followPublisher(
    userId: Types.ObjectId,
    publisherId: Types.ObjectId
  ): Promise<void>;
  unfollowPublisher(
    userId: Types.ObjectId,
    publisherId: Types.ObjectId
  ): Promise<void>;
}
