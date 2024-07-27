import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import CryptoData from "../components/CryptoData";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import APIError from "../components/APIError";

const CoinsPage = () => {
  const { list, isLoading, isError } = useSelector((state) => state.CryptoData);
  const [search, setSearch] = useState("");

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="mx-auto w-full max-w-6xl flex flex-col gap-5 p-5">
        <div className="flex gap-3 text-white border border-white items-center rounded-full mx-auto w-full max-w-md px-2">
          <CiSearch className="size-6 " />
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => setSearch(e.target.value)}
            className=" bg-transparent w-full py-2 outline-none"
            placeholder="Search"
          />
        </div>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <APIError message={isError} />
        ) : (
          <CryptoData apiData={list} searchedItem={search} />
        )}
      </div>
    </div>
  );
};

export default CoinsPage;
