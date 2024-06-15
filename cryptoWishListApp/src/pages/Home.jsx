import React, { useEffect, useState } from "react";
import heroImage from "../assets/MockupheroImage.png";
import { getAllData } from "../features/cryptoData/cryptoDataSlice";
import CryptoData from "../components/CryptoData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

const Home = () => {
	const { list, isLoading, isError } = useSelector((state) => state.CryptoData); 
	

	return (
		<div className="bg-gray-900	 px-5 mx-auto">
			<div className="flex flex-col md:flex-row gap-3 justify-between  items-center text-white w-full max-w-6xl mx-auto py-4">
				<div>
					<h1 className="lg:text-9xl text-7xl lg:w-1/2 font-bold">
						Track Crypto <br />
						<span className="text-blue-700 lg:whitespace-nowrap leading-tight">
							Real Time.
						</span>
					</h1>
				</div>
				<div className="md:w-1/2 max-w-[500px]">
					<img src={heroImage} alt="cryptoImage" className="w-full " />
				</div>
			</div>
			{isLoading ? (
				<Loader />
			) : isError ? (
				<div className="error">Error: {isError}</div>
			) : (
				<CryptoData apiData={list} isHomePage={true} />
			)}
		</div>
	);
};

export default Home;
