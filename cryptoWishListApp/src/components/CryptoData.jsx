import React, { useState } from "react";
import { useSelector } from "react-redux";
import formatNumber from "../utilities/CurrencyConvert";
import { Link } from "react-router-dom";
const tableHeaderData = ["coin", "Price", "24H High", "24H Low"];

const CryptoData = ({ apiData, isHomePage, searchedItem }) => {
	const [page, setPage] = useState(1);
	const selectedCurrency = useSelector(
		(state) => state.CryptoData.selectedCurrency
	);
	const itemsPerPage = 10;
	const filteredData = searchedItem
		? apiData.filter((data) =>
				data.name.toLowerCase().includes(searchedItem.toLowerCase())
		  )
		: apiData;

	const totalPages = Math.ceil(apiData.length / itemsPerPage);

	const handleNext = () => {
		setPage((prevPage) => Math.min(prevPage + 1, totalPages));
	};

	const handlePrevious = () => {
		setPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	const handlePageClick = (pageNumber) => {
		setPage(pageNumber);
	};

	return (
		<section className="py-6">
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full max-w-6xl mx-auto my-4">
				{isHomePage ? (
					<h2 className="text-white text-3xl pb-6 font-bold">Top 10 coins</h2>
				) : (
					<h2 className="text-white text-3xl pb-6 font-bold">All Coins</h2>
				)}

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
						{filteredData &&
							filteredData
								.slice((page - 1) * itemsPerPage, page * itemsPerPage)
								.map((data) => (
									<tr
										key={data.id}
										className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											<div className="flex items-center gap-2">
												<img src={data.image} alt={data.name} className="w-7" />
												{data.name}
											</div>
										</th>
										<td className="px-6 py-4">
											{formatNumber(data.current_price, selectedCurrency)}
										</td>
										<td className="px-6 py-4">
											{formatNumber(data.current_price, selectedCurrency)}
										</td>
										<td className="px-6 py-4">
											{formatNumber(data.current_price, selectedCurrency)}
										</td>
										<td className="px-6 py-4 text-right">
											<Link to={`/chart/${data.id}`}>
												<button className="font-medium p-2 bg-green-500 text-white whitespace-nowrap">
													View more
												</button>
											</Link>
										</td>
									</tr>
								))}
					</tbody>
				</table>

				{isHomePage ? (
					""
				) : (
					<div className="flex justify-center mt-4">
						<ul className="inline-flex items-center text-base h-10">
							<li>
								<button
									onClick={handlePrevious}
									className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 "
									disabled={page === 1}>
									Previous
								</button>
							</li>
							{[...Array(totalPages)].map((_, i) => (
								<li key={i}>
									<button
										onClick={() => handlePageClick(i + 1)}
										className={`flex items-center justify-center px-4 h-10 leading-tight ${
											page === i + 1
												? "text-white bg-blue-500"
												: "text-gray-500 bg-white"
										} border border-gray-300 hover:bg-gray-100 hover:text-gray-700 `}>
										{i + 1}
									</button>
								</li>
							))}
							<li>
								<button
									onClick={handleNext}
									className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
									disabled={page === totalPages}>
									Next
								</button>
							</li>
						</ul>
					</div>
				)}
			</div>
		</section>
	);
};

export default CryptoData;
