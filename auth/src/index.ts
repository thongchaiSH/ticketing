import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  console.log('Starting up......');
  
  //validate enviroment variable
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defind !!");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defind !!");
  }

  try {
    //connet mongo db
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to mongodb");
  } catch (err) {
    console.error(err);
  }

  //start server
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
