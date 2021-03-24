import { currentUser } from "@ithongchai/common";
import express from "express";

const router = express.Router();

// router.get("/api/users/currentuser", currentUser,requireAuth, (req, res) => {
router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
