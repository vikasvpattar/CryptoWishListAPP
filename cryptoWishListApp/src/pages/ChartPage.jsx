import React, { useEffect, useState, useCallback } from "react";
import ChartComp from "../components/ChartComp";
import CoinDetails from "../components/CoinDetails";
import axios from "axios";
import MarketDetails from "../components/MarketDetails";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const ChartPage = () => {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchCryptoPrice = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`,
        {
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-ntsXi9EVwHMMe6NXhyJjvAmU",
          },
        }
      );
      setApiData(response.data);
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCryptoPrice();
  }, [fetchCryptoPrice]);

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  const desc = apiData?.description?.en;

  return (
    <div className="bg-gray-900 min-h-screen py-4 px-2 sm:py-8 sm:px-5">
      <div className="mx-auto w-full max-w-6xl">
        <ChartComp />
        <MarketDetails apiData={apiData} />
        <CoinDetails desc={desc} />
      </div>
    </div>
  );
};

export default ChartPage;
