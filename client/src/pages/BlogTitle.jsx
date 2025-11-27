import { Edit, Hash, Sparkles } from "lucide-react";
import React, { useState } from "react";

const BlogTitle = () => {
  const blogCategory = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState(blogCategory[0]);
  const [input, setInput] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(input, selectedCategory);
  };
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#8E37EB]"></Sparkles>
          <h1 className="text-xl font-semibold">AI Article Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Keyword</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="The future of artificial intelligence"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          required
        />

        <p className="mt-4 text-sm font-medium">Category</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {blogCategory.map((item, index) => (
            <span
              onClick={() => setSelectedCategory(item)}
              className={`text-xs px-4 py-1  border rounded-full cursor-pointer ${
                selectedCategory === item
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-500 border-gray-300"
              }`}
              key={index}
            >
              {item}
            </span>
          ))}
        </div>
        <br />
        <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
          <Hash className="w-5"></Hash>
          Generate Article
        </button>
      </form>
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex item-centre gap-3">
          <Hash className="w-6 h-6 text-[#8E37EB]"></Hash>
          <h1 className="text-xl font-semibold">Generate titles</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Hash className="w-9 h-9"></Hash>
            <p>Enter a topic and click "Generate title" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTitle;
