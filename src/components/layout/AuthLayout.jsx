import React from "react";
import bgImg from "../../assets/bg-img.jpg";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImg})`,
          filter: "blur(8px)",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div
            className="bg-white/95 backdrop-blur-sm rounded-2xl
        shadow-xl overflow-hidden"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
