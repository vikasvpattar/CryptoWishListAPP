import React, { useState, useMemo } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import formatNumber from "../utilities/CurrencyConvert";
import { Link } from "react-router-dom";

const tableHeaderData = ["Coin", "Price", "24H High", "24H Low"];

const CryptoData = ({ apiData, isHomePage, searchedItem }) => {
  const [page, setPage] = useState(1);
  const selectedCurrency = useSelector(
    (state) => state.CryptoData.selectedCurrency
  );
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    return searchedItem
      ? apiData.filter((data) =>
          data.name.toLowerCase().includes(searchedItem.toLowerCase())
        )
      : apiData;
  }, [apiData, searchedItem]);

  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / itemsPerPage),
    [filteredData.length]
  );

  const handleNext = () =>
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));

  const handlePrevious = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  const handlePageClick = (pageNumber) => setPage(pageNumber);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, page, itemsPerPage]);

  return (
    <section className="py-6 w-full max-w-6xl mx-auto mt-4">
      <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-4">
        {isHomePage ? "Top 10 Coins" : "All Coins"}
      </h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full max-w-6xl mx-auto my-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-xl overflow-hidden">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 whitespace-nowrap">
            <tr>
              {tableHeaderData.map((header, index) => (
                <th
                  key={header}
                  scope="col"
                  className={`px-6 py-3 ${
                    index > 1 ? "hidden sm:table-cell" : ""
                  }`}
                >
                  <div className="flex items-center">{header}</div>
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">View More</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {paginatedData.map((data, i) => (
                <motion.tr
                  key={data.id}
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
                      <img src={data.image} alt={data.name} className="w-7" />
                      {data.name}
                    </div>
                  </th>
                  <td className="px-3 py-2 sm:px-6 sm:py-4">
                    {formatNumber(data.current_price, selectedCurrency)}
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    {formatNumber(data.high_24h, selectedCurrency)}
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    {formatNumber(data.low_24h, selectedCurrency)}
                  </td>
                  <td className="px-3 py-2 sm:px-6 sm:py-4">
                    <Link to={`/chart/${data.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="font-medium p-2 bg-green-500 text-white whitespace-nowrap rounded-md"
                      >
                        View more
                      </motion.button>
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      {!isHomePage && (
        <div className="flex justify-center mt-4">
          <ul className="inline-flex items-center text-sm h-10">
            <li>
              <button
                onClick={handlePrevious}
                className="flex items-center justify-center px-1 sm:px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                disabled={page === 1}
              >
                <MdKeyboardDoubleArrowLeft />
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i}>
                <button
                  onClick={() => handlePageClick(i + 1)}
                  className={`flex items-center justify-center px-2 sm:px-4 h-10 leading-tight ${
                    page === i + 1
                      ? "text-white bg-blue-500"
                      : "text-gray-500 bg-white"
                  } border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleNext}
                className="flex items-center justify-center px-2 sm:px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                disabled={page === totalPages}
              >
                <MdKeyboardDoubleArrowRight />
              </button>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default CryptoData;
