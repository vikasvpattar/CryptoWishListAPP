import React, { useEffect, useState } from "react";
import ChartComp from "../components/ChartComp";
import CoinDetails from "../components/CoinDetails";
import axios from "axios";
import MarketDetails from "../components/MarketDetails";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const ChartPage = () => {
	const [apiData, setApiData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams();
	const options = {
		method: "GET",
		url: `https://api.coingecko.com/api/v3/coins/${id}`,
		headers: {
			accept: "application/json",
			"x-cg-demo-api-key": "CG-ntsXi9EVwHMMe6NXhyJjvAmU",
		},
	};

	const fetchCryptoPrice = async () => {
		try {
			setIsLoading(true);
			const response = await axios.request(options);

			setApiData(response.data);
			setIsLoading(false);
			// console.log(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const desc = apiData?.description?.en;
	// console.log(apiData);
	useEffect(() => {
		fetchCryptoPrice();
	}, []);
	return (
		<div className="bg-gray-900 min-h-screen py-8 px-5">
			{!isLoading ? (
				<div className="mx-auto w-full max-w-6xl">
					<ChartComp />
					<MarketDetails apiData={apiData} />
					<CoinDetails desc={desc} />
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default ChartPage;
