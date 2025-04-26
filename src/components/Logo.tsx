
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-eurovision-500 to-eurovision-700 animate-pulse"></div>
        <div className="absolute inset-1 rounded-full bg-black flex items-center justify-center">
          <div className="text-eurovision-500 font-bold text-xl">SG</div>
        </div>
      </div>
      <div className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-eurovision-300 to-eurovision-500">
        SongGalaxy
      </div>
    </div>
  );
};

export default Logo;
