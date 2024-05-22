import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChartPage = () => {
	const params = useParams();
	const [apiData, setApiData] = useState([]);
	const options = {
		method: "GET",
		url: "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1",
		headers: {
			accept: "application/json",
			"x-cg-demo-api-key": "CG-ntsXi9EVwHMMe6NXhyJjvAmU",
		},
	};

	const fetchCryptoPrice = async () =>
		await axios(options)
			.then((res) => {
				setApiData(res.data);
				console.log(res.data);
			})
			.catch((err) => console.log(err));

	useEffect(() => {
		fetchCryptoPrice();
	}, []);
	console.log(params);
	return <div>ChartPage</div>;
};

export default ChartPage;
