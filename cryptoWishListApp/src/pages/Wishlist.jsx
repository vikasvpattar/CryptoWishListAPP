import React from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../components/Loader";
import formatNumber from "../utilities/CurrencyConvert";
import { Link } from "react-router-dom";
import APIError from "../components/APIError";
import { useGetAllDataQuery } from "../features/cryptoApi"; // Import RTK Query hook

const Wishlist = () => {
  const selectedCurrency = useSelector(
    (state) => state.CryptoData.selectedCurrency
  );
  const wishlist = useSelector((state) => state.CryptoData.wishlist); // Get wishlist from Redux

  // Use RTK Query to fetch the latest coin data
  const { data: list, isLoading, error } = useGetAllDataQuery(selectedCurrency);

  // Handle loading state
  if (isLoading) return <Loader />;

  // Handle error state
  if (error)
    return <APIError message={error.message || "Something went wrong"} />;

  // If wishlist is empty, show message
  if (wishlist.length === 0) {
    return (
      <div className="bg-gray-900 h-screen flex justify-center items-center">
        <h1 className="text-white text-2xl font-bold text-center">
          You haven't added any coins to the wishlist
        </h1>
      </div>
    );
  }

  let totalProfitLoss = 0;
  const tableHeaderData = ["Coin", "Price", "24H High", "Price Change"];

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-5">
      <h1 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-4 w-full max-w-6xl mx-auto">
        Your Whitelisted Coins
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full max-w-6xl mx-auto my-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl overflow-hidden">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap">
            <tr>
              {tableHeaderData.map((header) => (
                <th key={header} scope="col" className="px-6 py-3">
                  {header}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">View More</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {wishlist.map((wishItem, i) => {
                const coin = list?.find((item) => item.id === wishItem.id);
                if (!coin) return null;

                const profit =
                  coin.current_price - wishItem.currentPrice[selectedCurrency];
                totalProfitLoss += profit;

                return (
                  <motion.tr
                    key={coin.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white border-b"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-2">
                        <img src={coin.image} alt={coin.name} className="w-7" />
                        {coin.name}
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      {formatNumber(coin.current_price, selectedCurrency)}
                    </td>
                    <td className="px-6 py-4">
                      {formatNumber(coin.high_24h, selectedCurrency)}
                    </td>
                    <td
                      className={`px-6 py-4 ${
                        profit < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {formatNumber(profit, selectedCurrency)}
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/chart/${coin.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="font-medium p-2 bg-green-500 text-white whitespace-nowrap rounded-md"
                        >
                          View more
                        </motion.button>
                      </Link>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan="3"
                className="px-6 py-4 text-md font-bold text-right text-white"
              >
                Total Profit/Loss:
              </td>
              <td
                colSpan="2"
                className={`px-6 py-4 text-md font-bold ${
                  totalProfitLoss < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {formatNumber(totalProfitLoss, selectedCurrency)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
