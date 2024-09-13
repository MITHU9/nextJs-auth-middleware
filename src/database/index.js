import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://kmmithu2015:mithu10@mithu10.yyqxi.mongodb.net/";

  try {
    await mongoose.connect(connectionUrl);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectToDB;
