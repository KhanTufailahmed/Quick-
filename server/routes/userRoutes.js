import express from "express";
import { auth } from "../middleware/auth.js";

import {
  getPublishedCreations,
  getUserCreations,
  toogleLikeCreation,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.route("/get-user-creations").get(auth, getUserCreations);
userRouter.route("/get-published-creations").get(auth, getPublishedCreations);
userRouter.route("/toggle-like-creations").post(auth, toogleLikeCreation);

export default userRouter; 
