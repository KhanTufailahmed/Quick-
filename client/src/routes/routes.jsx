import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import WriteArticle from "../pages/WriteArticle";
import BlogTitle from "../pages/BlogTitle";
import GenerateImages from "../pages/GenerateImages";
import RemoveBackground from "../pages/RemoveBackground";
import RemoveObject from "../pages/RemoveObject";
import Community from "../pages/Community";
import ReviewResume from "../pages/ReviewResume";
import Home from "../pages/Home";
import DashBoard from "../pages/DashBoard";
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/ai",
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: <DashBoard></DashBoard>
      },
      {
        path: "write-article",
        element: <WriteArticle></WriteArticle>,
      },
      {
        path: "blog-titles",
        element: <BlogTitle></BlogTitle>,
      },
      {
        path: "generate-images",
        element: <GenerateImages></GenerateImages>,
      },
      {
        path: "remove-background",
        element: <RemoveBackground></RemoveBackground>,
      },
      {
        path: "remove-object",
        element: <RemoveObject></RemoveObject>,
      },
      {
        path: "community",
        element: <Community></Community>,
      },
      {
        path: "review-resume",
        element: <ReviewResume></ReviewResume>,
      },
    ],
  },
]);

export default AppRouter;
