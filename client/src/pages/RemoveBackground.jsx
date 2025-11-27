import { Eraser, Sparkles } from "lucide-react";
import React, { useState } from "react";

const RemoveBackground = () => {
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
          <Sparkles className="w-6 text-[#FF4938]"></Sparkles>
          <h1 className="text-xl font-semibold">Background Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <input
          type="file"
          onChange={(e) => setInput(e.target.files[0])}
          accept="image/*"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
        />

        <p className="text-xs text-gray-500 font-light mt-1">
          Support JPG, PNG,and other image formats
        </p>

        <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
          <Eraser className="w-5"></Eraser>
          Remove background
        </button>
      </form>
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex item-centre gap-3">
          <Eraser className="w-6 h-6 text-[#FF4938]"></Eraser>
          <h1 className="text-xl font-semibold">Generate titles</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Eraser className="w-9 h-9"></Eraser>
            <p>Enter a topic and click "Remove background" to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;
