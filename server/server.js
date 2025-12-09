import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import router from "./routes/aiRoutes.js";



const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());


app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.use(requireAuth())

app.use("api/v1/ai",router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
