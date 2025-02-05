import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-white/50">
      <div className="relative flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-black animate-spin" />
        <p className="text-lg font-medium text-gray-900 font-kreon">
          Please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;