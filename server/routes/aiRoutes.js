import express from "express";
import { generateArticle, generateBlogTitle, generateImage, removeImageBackground, removeImageObject, resumeReview } from "../controllers/aiController.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.route("/generate-article").post(auth,generateArticle);
router.route("/generate-blog-title").post(auth,generateBlogTitle);
router.route("/generate-image").post(auth,generateImage);
router.route("/remove-image-background").post(upload.single("image"),auth,removeImageBackground);
router.route("/remove-image-object").post(upload.single("image"),auth,removeImageObject);
router.route("/remove-image-object").post(upload.single("image"),auth,resumeReview);


export default router;