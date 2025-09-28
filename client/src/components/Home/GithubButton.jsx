import React from "react";
import { Github } from "lucide-react";


const GithubButton = () => {
  return (
    <>
      <style>{`
        @keyframes rotate {
          100% { transform: rotate(1turn); }
        }

        .rainbow-border {
          position: relative;
          display: inline-flex;
          border-radius: 9999px; /* full rounded */
          padding: 3px; /* space for the border */
          overflow: hidden;
        }

        .rainbow-border::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          padding: 2px; /* thickness of border */
          background: conic-gradient(
            from 0deg,
            #ff6ec7,
            #ffd166,
            #5eead4,
            #60a5fa,
            #ff6ec7
          );
          animation: rotate 4s linear infinite;
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude; 
        }

        .rainbow-border button {
          position: relative;
          border-radius: 9999px;
          background: #1f2937; /* dark gray like your second image */
          color: white;
          font-weight: 700;
          font-size: 0.875rem;
          padding: 0.75rem 2rem;
          z-index: 1;
        }
      `}</style>

      <div className="rainbow-border hover:scale-105 active:scale-100 transition duration-300">
        <button
          className="flex items-center"
          onClick={() =>
            window.open("https://github.com/KhanTufailahmed/Quick-", "_blank")
          }
        >
          <Github className="w-4 h-4"></Github>
          <span className="ml-2 text-sm">Star on Github</span>
        </button>
      </div>
    </>
  );
};

export default GithubButton;
