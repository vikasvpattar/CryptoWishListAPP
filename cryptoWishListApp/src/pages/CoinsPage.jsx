import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import CryptoData from "../components/CryptoData";
import Loader from "../components/Loader";
import APIError from "../components/APIError";
import { useSelector } from "react-redux";
import { useGetAllDataQuery } from "../features/cryptoApi"; // Import the RTK Query hook

const CoinsPage = () => {
  const selectedCurrency = useSelector(
    (state) => state.CryptoData.selectedCurrency
  ); // Get selected currency from Redux

  // Use the RTK Query hook to fetch data based on the selected currency
  const { data: list, error, isLoading } = useGetAllDataQuery(selectedCurrency);

  const [search, setSearch] = useState("");

  // Handle error state
  if (error) {
    return <APIError message={error.message || "Something went wrong"} />;
  }

  // Handle loading state
  if (isLoading) {
    return <Loader />;
  }

  // Filtered data based on search input
  const filteredData = list?.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="mx-auto w-full max-w-6xl flex flex-col gap-5 p-5">
        <div className="flex gap-3 text-white border border-white items-center rounded-full mx-auto w-full max-w-md px-2">
          <CiSearch className="size-6 " />
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className=" bg-transparent w-full py-2 outline-none"
            placeholder="Search"
          />
        </div>
        {/* Pass filtered data to the CryptoData component */}
        <CryptoData apiData={filteredData} searchedItem={search} />
      </div>
    </div>
  );
};

export default CoinsPage;
