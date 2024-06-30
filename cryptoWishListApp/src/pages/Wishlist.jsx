import React from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import formatNumber from "../utilities/CurrencyConvert";
import { Link } from "react-router-dom";

const Wishlist = () => {
	const { list, isLoading, isError, selectedCurrency } = useSelector(
		(state) => state.CryptoData
	);
	// console.log(list);
	const wishlistData = JSON.parse(localStorage.getItem("wishListedCoin"));

	const tableHeaderData = [
		"coin",
		"Price",
		"24H High",
		// "24H Low",
		"Price Change",
	];
	return (
		<div className="bg-gray-900 min-h-screen py-8 px-5">
			{isLoading ? (
				<Loader />
			) : isError ? (
				<div className="error">Error: {isError}</div>
			) : wishlistData ? (
				<div>
					<h1 className="text-white text-2xl font-bold mb-4">
						Your Whitelisted coin
					</h1>
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl overflow-hidden">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap">
							<tr>
								{tableHeaderData.map((data) => (
									<th key={data} scope="col" className="px-6 py-3">
										<div className="flex items-center">{data}</div>
									</th>
								))}
								<th scope="col" className="px-6 py-3">
									<span className="sr-only">View More</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{wishlistData.map((data) => {
								const sameCoin = list?.filter((item) => item.id === data.id);
								return sameCoin
									? sameCoin.map((coinList) => {
											const profit =
												coinList?.current_price -
												data?.currentPrice[selectedCurrency];

											return (
												<tr
													key={coinList.id}
													className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
													<th
														scope="row"
														className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
														<div className="flex items-center gap-2">
															<img
																src={coinList.image}
																alt={coinList.name}
																className="w-7"
															/>
															{coinList.name}
														</div>
													</th>
													<td className="px-6 py-4">
														{formatNumber(
															coinList.current_price,
															selectedCurrency
														)}
													</td>
													<td className="px-6 py-4">
														{formatNumber(
															coinList.current_price,
															selectedCurrency
														)}
													</td>
													{/* <td className="px-6 py-4">
													{formatNumber(
														coinList.current_price,
														selectedCurrency
													)}
												</td> */}
													{/* <td className="px-6 py-4">
													{formatNumber(
														coinList.current_price,
														selectedCurrency
													)}
												</td> */}
													<td
														className={`px-6 py-4 ${
															profit > 0 ? "text-red-500" : "text-green-500"
														}`}>
														{formatNumber(profit, selectedCurrency)}
													</td>
													<td className="px-6 py-4 text-right">
														<Link to={`/chart/${coinList.id}`}>
															<button className="font-medium p-2 bg-green-500 text-white whitespace-nowrap">
																View more
															</button>
														</Link>
													</td>
												</tr>
											);
									  })
									: "";
							})}
						</tbody>
					</table>
				</div>
			) : (
				<h1>You haven't added any coin to the wishlist</h1>
			)}
		</div>
	);
};

export default Wishlist;
