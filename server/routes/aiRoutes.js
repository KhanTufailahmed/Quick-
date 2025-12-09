import express from "express";
import { generateArticle } from "../controllers/aiController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.route("/generate-article").post(auth,generateArticle);


export default router;