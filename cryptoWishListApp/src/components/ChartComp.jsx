import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Ticks, scales } from "chart.js/auto"; // Don't remove this
import { useSelector } from "react-redux";
import Loader from "./Loader";
import APIError from "./APIError";

const ChartComp = () => {
  const { id } = useParams();
  const [apiData, setApiData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const currency = useSelector((state) => state.CryptoData.selectedCurrency);

  const fetchCryptoPrice = async () => {
    const options = {
      method: "GET",
      url: `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=30&interval=daily`,
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-ntsXi9EVwHMMe6NXhyJjvAmU",
      },
    };
    try {
      const response = await axios.request(options);
      setApiData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error || "Error fetching data");
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    setIsLoading(true);

    fetchCryptoPrice();
  }, [currency]);
  const gettingDate = (number) => {
    const date = new Date(number);
    return date.getDate() + "/" + (date.getMonth() + 1);
  };
  const price = apiData.prices?.map((data) => data[1]);

  const firstPrice = price && price.length > 0 ? price[0] : null;
  const lastPrice = price && price.length > 0 ? price[price.length - 1] : null;
  let increase = lastPrice - firstPrice;
  const chartData = {
    labels: apiData.prices?.map((data) => gettingDate(data[0])),

    datasets: [
      {
        data: price,
        borderWidth: 1,
        fill: true,
        backgroundColor:
          increase > 1 ? "rgba(57, 255, 57, 0.26)" : "rgba(243, 142, 142, 0.3)",
        responsive: true,
        tension: 0.15,
        borderColor:
          increase > 1 ? "rgba(57, 255, 57, 0.8)" : "rgba(243, 142, 142, 0.8)",
        pointRadius: 0,
        label: id.charAt(0).toUpperCase() + id.slice(1),
      },
    ],
  };
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          color: "#fff", // Color of the x-axis labels
        },
        grid: {
          color: "#1f1e1e", // Color of the x-axis grid lines
        },
        border: {
          width: 1,
          color: "#fff", // <-------------- Color of the x-axis
        },
      },
      y: {
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "#1f1e1e", // Color of the x-axis grid lines
        },
        border: {
          width: 1,
          color: "#fff", // <-------------- Color of the x-axis
        },
      },
    },
  };
  if (isLoading) {
    return (
      <div className="h-[60vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <di>
        <APIError message={error} />
      </di>
    );
  }
  return (
    <div className="w-full md:w-3/4 mx-auto my-10">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartComp;
