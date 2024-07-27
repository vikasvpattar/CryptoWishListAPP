import React from "react";

const APIError = (message) => {
  return (
    <div className="bg-gray-900	min-h-screen px-5 mx-auto text-white text-center flex justify-center items-center flex-col gap-2">
      <h1 className="text-3xl font-bold">
        Error occured while fetching the API
      </h1>
      <span className="text-red-500">{message}</span>
      <p className="text-xl font-bold">Please refresh after 1 minute</p>
    </div>
  );
};

export default APIError;
