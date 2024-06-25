import React from "react";

const MarketDetails = ({ apiData }) => {
	const percentageChange = apiData?.market_data?.price_change_percentage_24h;
	return (
		<div className="text-white flex flex-col gap-2 justify-center items-center my-5">
			<div>
				<div className="flex gap-2 items-center leading-normal">
					<img src={apiData?.image?.small} alt="" />
					<span className="text-xl">{apiData?.name}</span>
					<span className="uppercase text-xs">{apiData?.symbol} Price</span>
					<span className="text-xs bg-gray-600 py-1 px-2 rounded-lg">
						#{apiData?.market_cap_rank}
					</span>
				</div>
				<div className="flex gap-2 items-center">
					<span className="font-bold text-3xl ml-5">
						{apiData?.market_data?.current_price?.usd}
					</span>
					<span
						className={`${
							percentageChange > 0 ? "text-green-600" : "text-red-600"
						}`}>
						{percentageChange}%
					</span>
				</div>
			</div>
			<div className="border-2 border-white flex-flex-col gap-2 p-4 w-1/2 rounded-xl">
				<div className="flex items-center justify-between gap-4 py-2 border-b-2  border-slate-600">
					<span>All Time High</span>
					<span>{apiData?.market_data?.ath?.usd}</span>
				</div>
				<div className="flex items-center justify-between py-2 gap-4 border-b-2 border-slate-600">
					<span>All Time Low</span>
					<span>{apiData?.market_data?.atl?.usd}</span>
				</div>
				<div className="flex items-center justify-between py-2 gap-4 border-b-2 border-slate-600">
					<span>Market Cap</span>
					<span>{apiData?.market_data?.market_cap?.usd}</span>
				</div>
				<div className="flex items-center justify-between gap-4 py-2 border-b-2 border-slate-600">
					<span>Fully Diluted Valuation </span>
					<span>{apiData?.market_data?.fully_diluted_valuation?.usd}</span>
				</div>
				<div className="flex items-center justify-between gap-4 border-b-2 py-2 border-slate-600">
					<span>Circulating Supply </span>
					<span>{apiData?.market_data?.circulating_supply}</span>
				</div>
				<div className="flex items-center justify-between gap-4 py-2 ">
					<span>Total Supply </span>
					<span>{apiData?.market_data?.total_supply}</span>
				</div>
			</div>
		</div>
	);
};

export default MarketDetails;
