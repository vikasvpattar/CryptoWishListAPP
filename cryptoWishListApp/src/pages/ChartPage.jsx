import React from "react";
import ChartComp from "../components/ChartComp";
import CoinDetails from "../components/CoinDetails";

const ChartPage = () => {
	return (
		<div className="bg-gray-900  py-8 px-5">
			<div className="mx-auto w-full max-w-6xl">
				<ChartComp />
				<CoinDetails />
			</div>
		</div>
	);
};

export default ChartPage;
