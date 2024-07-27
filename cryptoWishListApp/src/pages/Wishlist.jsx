import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import formatNumber from "../utilities/CurrencyConvert";
import { Link } from "react-router-dom";
import APIError from "../components/APIError";
const Wishlist = () => {
  const { list, isLoading, isError, selectedCurrency } = useSelector(
    (state) => state.CryptoData
  );
  // console.log(list);
  const wishlistData = JSON.parse(localStorage.getItem("wishListedCoin")) || [];
  let totalProfitLoss = 0;
  const tableHeaderData = ["coin", "Price", "24H High", "Price Change"];
  if (isLoading) return <Loader />;
  if (isError) return <APIError message={isError} />;
  if (wishlistData.length === 0)
    return (
      <div className="bg-gray-900 h-screen flex justify-center items-center">
        <h1 className="text-white text-2xl font-bold text-center">
          You haven't added any coin to the wishlist
        </h1>
      </div>
    );
  return (
    <div className="bg-gray-900 min-h-screen py-8 px-5">
      <h1 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-4 w-full max-w-6xl mx-auto">
        Your Whitelisted Coins
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full max-w-6xl mx-auto my-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl overflow-hidden">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap">
            <tr>
              {tableHeaderData.map((data) => (
                <th key={data} scope="col" className="px-6 py-3">
                  <div className="flex items-center">{data}</div>
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">View More</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {wishlistData.map((data) => {
              const coin = list?.find((item) => item.id === data.id);
              if (!coin) return null;

              const profit =
                coin.current_price - data.currentPrice[selectedCurrency];
              totalProfitLoss += profit;

              return (
                <tr key={coin.id} className="bg-white border-b ">
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
                </tr>
              );
            })}
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
