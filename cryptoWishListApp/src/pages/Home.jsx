import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const tableHeaderData = ["coin", "Price", "24H High", "24H Low"];

const Home = () => {
	const [apiData, setApiData] = useState([]);
	const fetchCryptoPrice = async () =>
		await axios
			.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
			.then((res) => {
				setApiData(res.data);
				console.log(res.data);
			})
			.catch((err) => console.log(err));

	useEffect(() => {
		fetchCryptoPrice();
	}, []);
	return (
		<div>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							{tableHeaderData &&
								tableHeaderData.map((data) => (
									<th key={data} scope="col" className="px-6 py-3">
										<div className="flex items-center">
											{data}
											<Link to={"/#"}>
												<svg
													className="w-3 h-3 ms-1.5"
													aria-hidden="true"
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													viewBox="0 0 24 24">
													<path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
												</svg>
											</Link>
										</div>
									</th>
								))}
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">Wishlist</span>
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
												{data.name}
											</th>
											<td className="px-6 py-4">{data.current_price}</td>
											<td className="px-6 py-4">{data.high_24h}</td>
											<td className="px-6 py-4">{data.low_24h}</td>
											<td className="px-6 py-4 text-right">
												<Link to={`/chart/${data.id}`}>
													<button className="font-medium p-4 bg-green-500 text-white whitespace-nowrap">
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
		</div>
	);
};

export default Home;
