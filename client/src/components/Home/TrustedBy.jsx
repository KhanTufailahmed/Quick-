import { assets } from "@/assets/assets";
import React from "react";

const TrustedBy = () => {
  const logos = [
    assets.lucent,
    assets.facebook,
    assets.netflix,
    assets.google,
    assets.instagram,
    assets.slack,
    assets.linkedin,
  ];
  return (
    <div className="overflow-hidden w-full relative max-w-5xl mx-auto mt-10 select-none">
      <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#ffffff] to-transparent"></div>

      <div className="marquee-inner flex min-w-[200%] will-change-transform gap-12">
        {[...logos, ...logos].map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt={`logo-${i}`}
            className="h-10 w-auto object-contain mx-6"
            draggable="false"
          />
        ))}
      </div>

      <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-[#ffffff] to-transparent"></div>
    </div>
  );
};

export default TrustedBy;
