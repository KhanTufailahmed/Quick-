import express from "express";
import { generateArticle, generateBlogTitle, generateImage } from "../controllers/aiController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.route("/generate-article").post(auth,generateArticle);
router.route("/generate-blog-title").post(auth,generateBlogTitle);
router.route("/generate-image").post(auth,generateImage);


export default router;