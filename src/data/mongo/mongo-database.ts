import mongoose from "mongoose";

interface ConnectionOptions {
  mongoUrl: string;
  dbname: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions) {
    const { mongoUrl, dbname } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName: dbname,
      });

      console.log("Connected to MongoDB");
      return true;
    } catch (error) {
      console.error("Error connecting to MongoDB", error);
      throw error;
    }
  }

  static async disconnect() {
    await mongoose.disconnect();
  }
}
