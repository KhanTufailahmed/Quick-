import OpenAI from "openai";
import prisma from "../config/db.js";
import { clerkClient } from "@clerk/express";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.status(400).json({
        message: "Limit reached. Upgrade to continue",
        succcess: false,
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;
    await prisma.creations.create({
      data: {
        userId: userId,
        prompt: prompt,
        content: content,
        type: "article",
      },
    });

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    return res.status(200).json({
      message: content,
      succcess: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message, succcess: false });
  }
};
