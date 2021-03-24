import { currentUser, errorHandler, NotFoundError } from "@ithongchai/common";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";
import { createChargeRouter } from "./routes/new";





const app = express();
app.set("trust proxy", true);
//set send return json
app.use(json());

//setup cookie
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV != "test",
  })
);

app.use(currentUser);

//setup routes
app.use(createChargeRouter);

//setup 404 page
app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
