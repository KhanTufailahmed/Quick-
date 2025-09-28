import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import TrustedBy from "./TrustedBy";
import Testimonial from "./Testimonial";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat h-screen">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]">
            Create amazing content <br />
            with{" "}
            {/* <span className="text-[#5044E5]">
              AI tools
              <img
                alt="brush"
                draggable="false"
                width="220"
                height="60"
                decoding="async"
                data-nimg="1"
                class="absolute -bottom-4 md:-bottom-6 -right-5 min-w-52 w-full"
                src="brush-line.svg"
                style={{ color: "transparent" }}
              />
            </span> */}
            <span className="relative inline-block text-[#5044E5] hover:scale-110 transition duration-400">
              AI tools
              <img
                alt="brush"
                draggable="false"
                width={220}
                height={60}
                decoding="async"
                data-nimg="1"
                className="absolute -bottom-2 left-0 w-full"
                src="brush-line.svg"
                style={{ color: "transparent" }}
              />
            </span>
          </h1>
          <p className="mt-4 max-w-xs sm:max-w-md 2xl:max-w-xl mx-auto mx-sm:text-xs text-gray-600">
            Transform your content creation with our suite of premium AI tools.
            Write articles, generate images, and enhance your workflow.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm max-sm:text-xs ">
            <button
              onClick={() => navigate("/ai")}
              className="bg-[#5044E5] text-white px-10 py-3 rounded-full hover:scale-102 active:scale-95 transition cursor-pointer mt-2"
            >
              Start creating now
            </button>
            <button className="bg-white  px-10 py-3  border border-gray-300   rounded-full hover:scale-102 active:scale-95 transition cursor-pointer mt-2">
              Watch demo
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8 mx-auto text-gray-600">
            <img src={assets.user_group} alt="group pic" className="h-8" />
            Trusted by 10k+ users
          </div>
        </div>
        <TrustedBy></TrustedBy>
      </div>
    </div>
  );
};

export default Hero;
