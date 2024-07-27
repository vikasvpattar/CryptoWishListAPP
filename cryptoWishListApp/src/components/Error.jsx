import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Error = (message) => {
  return (
    <div className="bg-gray-900	min-h-screen px-5 mx-auto text-white flex gap-2 justify-center items-center text-center flex-col">
      <h1 className="text-3xl font-bold">Sorry</h1>
      <p className="text-2xl font-bold"> page not found : 404 Error</p>
      <Link to={`/`}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="font-medium px-4 py-2 bg-green-500  whitespace-nowrap rounded-md"
        >
          Home Page
        </motion.button>
      </Link>
    </div>
  );
};

export default Error;
