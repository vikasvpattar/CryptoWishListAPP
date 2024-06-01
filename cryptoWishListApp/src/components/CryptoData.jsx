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
		<section>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full max-w-[95%] mx-auto my-4">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 whitespace-nowrap">
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
			{/* pagination */}
			{/* <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
				<div className="flex flex-1 justify-between sm:hidden">
					<a
						href="#"
						className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
						Previous
					</a>
					<a
						href="#"
						className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
						Next
					</a>
				</div>
				<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
					<div>
						<p className="text-sm text-gray-700">
							Showing <span className="font-medium">1</span> to{" "}
							<span className="font-medium">10</span> of{" "}
							<span className="font-medium">97</span> results
						</p>
					</div>
					<div>
						<nav
							className="isolate inline-flex -space-x-px rounded-md shadow-sm"
							aria-label="Pagination">
							<a
								href="#"
								className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
								<span className="sr-only">Previous</span>
								<FaChevronLeft className="h-5 w-5" aria-hidden="true" />
							</a>
							<a
								href="#"
								aria-current="page"
								className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
								1
							</a>
							<a
								href="#"
								className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
								2
							</a>
							<a
								href="#"
								className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">
								3
							</a>
							<span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
								...
							</span>
							<a
								href="#"
								className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">
								8
							</a>
							<a
								href="#"
								className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
								9
							</a>
							<a
								href="#"
								className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
								10
							</a>
							<a
								href="#"
								className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
								<span className="sr-only">Next</span>
								<FaChevronRight className="h-5 w-5" aria-hidden="true" />
							</a>
						</nav>
					</div>
				</div>
			</div> */}
		</section>
	);
};

export default CryptoData;
