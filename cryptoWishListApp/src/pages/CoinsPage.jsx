import React from "react";
import { CiSearch } from "react-icons/ci";
import CryptoData from "../components/CryptoData";

const CoinsPage = () => {
	return (
		<div className="bg-gray-900	 ">
			<div className="mx-auto w-full max-w-6xl flex flex-col gap-5 py-6">
				<div className="flex gap-3 text-white border border-white items-center rounded-full mx-auto w-full max-w-md px-2">
					<CiSearch className="size-6 " />
					<input
						type="text"
						name=""
						id=""
            className=" bg-transparent w-full py-2 outline-none"
            placeholder="Search"
					/>
				</div>
				<CryptoData />
			</div>
		</div>
	);
};

export default CoinsPage;
