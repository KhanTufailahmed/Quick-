import { File, FileText, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", input);

      const res = await axios.post(`/api/ai/review-resume`, formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      console.log(res);
      if (res.data.success) {
        setContent(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#00DA83]"></Sparkles>
          <h1 className="text-xl font-semibold">Resume Review</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Resume</p>
        <input
          type="file"
          onChange={(e) => setInput(e.target.files[0])}
          accept="*"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
        />

        <p className="text-xs text-gray-500 font-light mt-1">
          Supports PDF, PNG, JPG formats
        </p>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <FileText className="w-5"></FileText>
          )}
          Remove background
        </button>
      </form>
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex item-centre gap-3">
          <FileText className="w-6 h-6 text-[#00DA83]"></FileText>
          <h1 className="text-xl font-semibold">Analysis Results</h1>
        </div>
        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <FileText className="w-9 h-9"></FileText>
              <p>Upload your resume and click "Review Resume" to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600 ">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewResume;
