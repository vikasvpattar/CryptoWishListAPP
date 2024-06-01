import React, { useEffect, useState } from "react";
import heroImage from "../assets/MockupheroImage.png";

import CryptoData from "../components/CryptoData";

const Home = () => {
	return (
		<div className="bg-gray-900	 px-5">
			<div className="flex flex-col md:flex-row gap-3 justify-between  items-center text-white w-full max-w-7xl mx-auto py-4">
				<div>
					<h1 className="text-9xl w-1/2 font-bold">
						Track Crypto <br />
						<span className="text-blue-700 whitespace-nowrap leading-tight">
							Real Time.
						</span>
					</h1>
				</div>
				<div className="w-1/2">
					<img src={heroImage} alt="cryptoImage" className="w-full" />
				</div>
			</div>

			<CryptoData />
		</div>
	);
};

export default Home;
