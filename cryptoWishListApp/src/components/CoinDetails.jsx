import React, { useState } from "react";
import Loader from "./Loader";

const CoinDetails = ({ desc }) => {
  const [flag, setFlag] = useState(false);
  const shortDesc = desc?.slice(0, 300) + "<p class='read'> Read more.... </p>";
  const longDesc = desc ? desc + "<p class='read'>Read less...." : "";
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
        <Loader />
      )}
    </div>
  );
};

export default CoinDetails;
