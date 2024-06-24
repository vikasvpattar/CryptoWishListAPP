import React, { useState } from "react";

const CoinDetails = ({ desc }) => {
	const [flag, setFlag] = useState(false);
	const shortDesc = desc?.slice(0, 300) + "<p> Read more.... </p>";
	const longDesc = desc ? desc + "<p>Read less...." : "";
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
