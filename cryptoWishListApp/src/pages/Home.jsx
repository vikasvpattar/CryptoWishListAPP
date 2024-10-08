import React from "react";
import heroImage from "../assets/MockupheroImage.png";
import CryptoData from "../components/CryptoData";
import APIError from "../components/APIError.jsx";
import Loader from "../components/Loader";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useGetAllDataQuery } from "../features/cryptoApi"; // Import the RTK Query hook

const Home = () => {
  const selectedCurrency = useSelector(
    (state) => state.CryptoData.selectedCurrency
  ); // Get selected currency from Redux

  // Use the RTK Query hook to fetch data based on the selected currency
  const { data: list, error, isLoading } = useGetAllDataQuery(selectedCurrency);

  return (
    <div className="bg-gray-900 min-h-screen px-5 mx-auto">
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center text-white w-full max-w-6xl mx-auto py-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="lg:text-9xl sm:text-7xl text-6xl lg:w-1/2 font-bold"
          >
            Track Crypto <br />
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75, duration: 1 }}
              className="text-blue-700 lg:whitespace-nowrap leading-tight"
            >
              Real Time.
            </motion.span>
          </motion.h1>
        </div>
        <div className="md:w-1/2 max-w-[500px]">
          <AnimatePresence>
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 10 }}
              transition={{
                type: "smooth",
                repeatType: "mirror",
                duration: 2,
                repeat: Infinity,
              }}
            >
              <img src={heroImage} alt="cryptoImage" className="w-full" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Handle loading, error, and data rendering using RTK Query */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <APIError message={error.message || "Something went wrong"} />
      ) : (
        <CryptoData apiData={list} isHomePage={true} />
      )}
    </div>
  );
};

export default Home;
