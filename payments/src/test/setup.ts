import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      signin(id?:string): string[];
    }
  }
}

jest.mock("../nats-wrapper");

process.env.STRIPE_KEY='sk_test_51IY7b4LrYrBix0s54v7O9HdaDgbWovMTjJA6ODNBoXr3OVkoRZQv6adZEdv703Jd2gJkMuJUS80ehemkqrN1C89d00rnxC4jXF'


let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfgh";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const callections = await mongoose.connection.db.collections();
  for (let collection of callections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  //Build a JWT payload {id,email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  //Create the JWT!
  const toket = jwt.sign(payload, process.env.JWT_KEY!);

  //Build session object {jwt:MY_JWT}
  const session = { jwt: toket };

  //Turn that session to JSON
  const sessionJSON = JSON.stringify(session);

  //Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  //Return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};
