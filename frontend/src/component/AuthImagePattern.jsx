import React from "react";

function AuthImagePattern({ title, subtitle }) {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gray-700 p-12">
      <div className="max-w-md text-center">
        {/* Grid for 9 Boxes */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/60 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-xl font-bold mb-3 text-white">{title}</h2>
        <p className="opacity-60 text-sm text-white">{subtitle}</p>
      </div>
    </div>
  );
}

export default AuthImagePattern;
