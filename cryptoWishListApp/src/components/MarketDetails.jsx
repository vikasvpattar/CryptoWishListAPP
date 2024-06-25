import React from "react";
import { useSelector } from "react-redux";
import formatNumber from "../utilities/CurrencyConvert";

const MarketInfo = ({ label, value }) => (
	<div className="flex items-center justify-between gap-4 py-2 border-b-2 border-slate-600">
		<span>{label}</span>
		<span>{value !== undefined ? value : "N/A"}</span>
	</div>
);

const MarketDetails = ({ apiData }) => {
	const selectedCurrency = useSelector(
		(state) => state.CryptoData.selectedCurrency
	);

	if (!apiData) {
		return <div>Loading...</div>;
	}

	const { image, name, symbol, market_cap_rank, market_data } = apiData;

	if (!market_data) {
		return <div>Market data is unavailable</div>;
	}

	const {
		price_change_percentage_24h: percentageChange,
		current_price,
		ath,
		atl,
		market_cap,
		fully_diluted_valuation,
		circulating_supply,
		total_supply,
	} = market_data;

	const priceChangeClass =
		percentageChange > 0 ? "text-green-600" : "text-red-600";

	return (
		<div className="text-white flex flex-col gap-2 justify-center items-center my-5">
			<div>
				<div className="flex gap-2 items-center leading-normal">
					{image && <img src={image.small} alt={name} />}
					<span className="text-xl">{name}</span>
					<span className="uppercase text-xs">{symbol} Price</span>
					<span className="text-xs bg-gray-600 py-1 px-2 rounded-lg">
						#{market_cap_rank}
					</span>
				</div>
				<div className="flex gap-2 items-center">
					<span className="font-bold text-3xl ml-5">
						{current_price && current_price[selectedCurrency] !== undefined
							? formatNumber(current_price[selectedCurrency], selectedCurrency)
							: "N/A"}
					</span>
					<span className={priceChangeClass}>
						{percentageChange !== undefined ? `${percentageChange}%` : "N/A"}
					</span>
				</div>
			</div>
			<div className="border-2 border-white flex flex-col gap-2 p-4 w-11/12 md:w-1/2 rounded-xl">
				<MarketInfo
					label="All Time High"
					value={ath && formatNumber(ath[selectedCurrency], selectedCurrency)}
				/>
				<MarketInfo
					label="All Time Low"
					value={atl && formatNumber(atl[selectedCurrency], selectedCurrency)}
				/>
				<MarketInfo
					label="Market Cap"
					value={
						market_cap &&
						formatNumber(market_cap[selectedCurrency], selectedCurrency)
					}
				/>
				<MarketInfo
					label="Fully Diluted Valuation"
					value={
						fully_diluted_valuation &&
						formatNumber(
							fully_diluted_valuation[selectedCurrency],
							selectedCurrency
						)
					}
				/>
				<MarketInfo
					label="Circulating Supply"
					value={formatNumber(circulating_supply, selectedCurrency, false)}
				/>
				<MarketInfo
					label="Total Supply"
					value={formatNumber(total_supply, selectedCurrency, false)}
				/>
			</div>
		</div>
	);
};

export default MarketDetails;
