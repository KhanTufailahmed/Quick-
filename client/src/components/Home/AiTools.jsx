import React from "react";
import { AiToolsData } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
const AiTools = () => {
  const data = AiToolsData;
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <div className="px-4 sm:px-20 xl:px-32 ">
      <div className="text-center">
        <h1 className="text-slate-700 text-[42px] font-semibold">
          Powerful AI Tools
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Every thing you need to create ,enhance and optimize your content with
          cutting-edge AI tools.
        </p>
      </div>
      <div className="flex flex-wrap mt-10 justify-center">
        {data.map((tool, index) => (
          <div
            key={index}
            className="p-8 m-4 max-w-xs rounde-lg bg-[#FDFDFe]
            shadow-lg border border-gray-100 hover:-translate-y-1 translation-all duration-300 cursor-pointer"
            onClick={() => user && navigate(tool.path)}
          >
            <tool.Icon
              className="w-12 h-12 p-3 text-white rounded-xl"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from},${tool.bg.to})`,
              }}
            />
            <h3 className="mt-6 mb-3 text-lg font-semibold">{tool.title}</h3>
            <p className="text-gray-400 text-sm max-w-[95%]">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
