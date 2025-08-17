import mongoose from "mongoose";

const connectToDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Article",
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection Failed to MongoDB", error);
    process.exit(1);
  }
};

export default connectToDB;
