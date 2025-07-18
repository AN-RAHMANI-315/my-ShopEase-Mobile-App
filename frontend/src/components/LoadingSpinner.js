import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-white border-opacity-30 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <h2 className="mt-8 text-2xl font-bold text-white">ShopEase</h2>
        <p className="mt-2 text-white text-opacity-80">Loading your shopping experience...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;