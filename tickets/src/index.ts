import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";
const start = async () => {
  console.log("Starting.....");
  
  //validate enviroment variable
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defind !!");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defind !!");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defind !!");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defind !!");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defind !!");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    //graceful shutdown
    natsWrapper.client.on("close", () => { 
      console.log("NATS connection closed!!");
      process.exit();
    });
    //graceful shutdown
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

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
