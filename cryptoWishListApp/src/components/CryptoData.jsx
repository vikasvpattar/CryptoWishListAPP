import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CryptoData = () => {
	const [apiData, setApiData] = useState([]);
	const tableHeaderData = ["coin", "Price", "24H High", "24H Low"];

	const fetchCryptoPrice = () => {
		axios
			.get(
				"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
			)
			.then((res) => {
				setApiData(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.error("Error fetching crypto prices:", err);
			});
	};

	useEffect(() => {
		fetchCryptoPrice();
	}, []);
	return (
		<section className="py-6">
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full max-w-6xl mx-auto my-4">
				<h2 className="text-white text-3xl pb-6 font-bold"> Top 10 coins</h2>

				<table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl overflow-hidden">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap">
						<tr>
							{tableHeaderData &&
								tableHeaderData.map((data) => (
									<th key={data} scope="col" className="px-6 py-3">
										<div className="flex items-center ">
											{data}
									
										</div>
									</th>
								))}
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">View More</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{apiData &&
							apiData.map((data, index) => {
								if (index <= 10) {
									return (
										<tr
											key={data.id}
											className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
												<div
													className="flex
												items-center gap-2">
													<img
														src={data.image}
														alt={data.name}
														className="w-7"
													/>
													{data.name}
												</div>
											</th>
											<td className="px-6 py-4">{data.current_price}</td>
											<td className="px-6 py-4">{data.high_24h}</td>
											<td className="px-6 py-4">{data.low_24h}</td>
											<td className="px-6 py-4 text-right">
												<Link to={`/chart/${data.id}`}>
													<button className="font-medium p-2 bg-green-500 text-white whitespace-nowrap">
														View more
													</button>
												</Link>
											</td>
										</tr>
									);
								}
							})}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default CryptoData;
