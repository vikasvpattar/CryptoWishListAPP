import axios from "axios";
import React, { useEffect, useState } from "react";

const CoinDetails = () => {
	const [apiData, setApiData] = useState({});
	const [flag, setFlag] = useState(false);

	const fetchCryptoPrice = async () => {
		try {
			const response = await axios.get(
				"https://api.coingecko.com/api/v3/coins/bitcoin"
			);

			setApiData(response.data);
			console.log(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const desc = apiData?.description?.en;
	const shortDesc = desc?.slice(0, 300) + "<p> Read more.... </p>";
	const longDesc = desc ? desc + "<p>Read less...." : "";

	useEffect(() => {
		fetchCryptoPrice();
	}, []);
	return (
		<div className=" description">
			{desc ? (
				desc.length > 300 ? (
					<p
						onClick={() => setFlag(!flag)}
						dangerouslySetInnerHTML={{ __html: flag ? longDesc : shortDesc }}
					/>
				) : (
					<p dangerouslySetInnerHTML={{ __html: desc }} />
				)
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default CoinDetails;
