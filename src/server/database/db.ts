import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async (uri: string) => {
  try {
    const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions;
    await mongoose.connect(uri, options);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
