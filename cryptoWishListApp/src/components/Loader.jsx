import React from "react";
import bitcoin from "../assets/bitcoinLoader.png";

const Loader = () => {
  return (
    <div className="bg-gray-900 h-screen flex justify-center items-center">
      <div className="size-28 mx-auto animate-spin-slow">
        <img src={bitcoin} alt="loaderImage" />
      </div>
    </div>
  );
};

export default Loader;
