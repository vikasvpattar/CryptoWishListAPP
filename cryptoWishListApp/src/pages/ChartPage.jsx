import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Ticks, scales } from "chart.js/auto"; //Dont get rid of this

const ChartPage = () => {
	const { id } = useParams();
	const [apiData, setApiData] = useState({});

	const fetchCryptoPrice = async () =>
		await axios(
			`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`
		)
			.then((res) => {
				setApiData(res.data);
				console.log(res.data);
			})
			.catch((err) => console.log(err));

	useEffect(() => {
		fetchCryptoPrice();
	}, []);
	const gettingDate = (number) => {
		const date = new Date(number);
		return date.getDate() + "/" + (date.getMonth() + 1);
	};
	const price = apiData.prices?.map((data) => data[1]);
	// console.log(price);
	const chartData = {
		labels: apiData.prices?.map((data) => gettingDate(data[0])),

		datasets: [
			{
				data: price,
				borderWidth: 1,
				fill: true,
				backgroundColor: "rgba(58, 128, 233,0.1)",
				responsive: true,
				tension: 0.15,
				borderColor: "#3a80e9",
				pointRadius: 0,
				label: id,
			},
		],
	};
	const options = {
		responsive: true,
		interaction: {
			mode: "index",
			intersect: false,
		},
	};
	// console.log(params);
	return (
		<div className="w-[60vw] h-[60vh] mx-auto my-8">
			<Line data={chartData} options={options} />
		</div>
	);
};

export default ChartPage;
