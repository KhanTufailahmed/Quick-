import prisma from "../config/db.js";
import { GoogleGenAI } from "@google/genai";

import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// import pdf from "pdf-parse/lib/pdf-parse.js";
// import pdf from "pdf-parse";
import { PDFParse } from "pdf-parse";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.status(400).json({
        message: "Limit reached. Upgrade to continue",
        success: false,
      });
    }

    // const response = await AI.models.generateContent({
    //   model: "gemini-2.5-flash",
    //   messages: [
    //     {
    //       role: "user",
    //       contents: prompt,
    //     },
    //   ],
    //   temperature: 0.7,
    //   max_tokens: length,
    // });

    // const content = response.text;
    // const result = await AI.models.generateContent({
    //   model: "gemini-1.5-flash",
    //   contents: [
    //     {
    //       role: "user",
    //       parts: [{ text: prompt }],
    //     },
    //   ],
    //   generationConfig: {
    //     temperature: 0.7,
    //     maxOutputTokens: length,
    //   },
    // });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: length,
      },
    });

    const content = response.text;

    if (!content) {
      return res.status(500).json({
        message: "AI did not return any content",
        success: false,
      });
    }
    await prisma.creations.create({
      data: {
        userId,
        prompt,
        content,
        type: "article",
      },
    });
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    return res.status(200).json({
      message: content,
      success: true,
    });
  } catch (error) {
    console.error("Generate Article Error:", error.message);

    return res.status(400).json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.status(400).json({
        message: "Limit reached. Upgrade to continue",
        success: false,
      });
    }

    // const response = await AI.models.generateContent({
    //   model: "gemini-2.5-flash",
    //   messages: [
    //     {
    //       role: "user",
    //       contents: prompt,
    //     },
    //   ],
    //   temperature: 0.7,
    //   max_tokens: length,
    // });

    // const content = response.text;
    // const result = await AI.models.generateContent({
    //   model: "gemini-1.5-flash",
    //   contents: [
    //     {
    //       role: "user",
    //       parts: [{ text: prompt }],
    //     },
    //   ],
    //   generationConfig: {
    //     temperature: 0.7,
    //     maxOutputTokens: length,
    //   },
    // });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 100,
      },
    });

    const content = response.text;

    if (!content) {
      return res.status(500).json({
        message: "AI did not return any content",
        success: false,
      });
    }
    await prisma.creations.create({
      data: {
        userId,
        prompt,
        content,
        type: "blog-title",
      },
    });
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    return res.status(200).json({
      message: content,
      success: true,
    });
  } catch (error) {
    console.error("Generate Article Error:", error.message);

    return res.status(400).json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;

    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(400).json({
        message: "This Feature is only available for premium subscriptions",
        success: false,
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await prisma.creations.create({
      data: {
        userId,
        prompt,
        content: secure_url,
        publish,
        type: "image",
      },
    });

    return res.status(200).json({
      message: secure_url,
      success: true,
    });
  } catch (error) {
    console.error("Generate Article Error:", error.message);

    return res.status(400).json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { image } = req.file;

    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(400).json({
        message: "This Feature is only available for premium subscriptions",
        success: false,
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await prisma.creations.create({
      data: {
        userId,
        prompt: "remove background from image",
        content: secure_url,
        type: "image",
      },
    });

    return res.status(200).json({
      message: secure_url,
      success: true,
    });
  } catch (error) {
    console.error("Generate Article Error:", error.message);

    return res.status(400).json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const { image } = req.file;

    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(400).json({
        message: "This Feature is only available for premium subscriptions",
        success: false,
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [
        {
          effect: `gen_remove:${object}`,
        },
      ],
      resource_type: "image",
    });

    await prisma.creations.create({
      data: {
        userId,
        prompt: `Remove ${object} from image`,
        content: imageUrl,
        type: "image",
      },
    });

    return res.status(200).json({
      message: imageUrl,
      success: true,
    });
  } catch (error) {
    console.error("Generate Article Error:", error.message);

    return res.status(400).json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;

    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(400).json({
        message: "This Feature is only available for premium subscriptions",
        success: false,
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        message: "Resume size should be less than 5MB",
        success: false,
      });
    }
    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await PDFParse(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });
    const content = response.text;

    if (!content) {
      return res.status(500).json({
        message: "AI did not return any content",
        success: false,
      });
    }

    await prisma.creations.create({
      data: {
        userId,
        prompt: "Review the uploaded resume",
        content: content,
        type: "resume-review",
      },
    });

    return res.status(200).json({
      message: content,
      success: true,
    });
  } catch (error) {
    console.error("Generate Article Error:", error.message);

    return res.status(400).json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
};
