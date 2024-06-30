import React, { useEffect, useState } from "react";
import cryptos from "../assets/Cryptos.png";
import {
	getAllData,
	setSelectedCurrency,
} from "../features/cryptoData/cryptoDataSlice";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const selectedCurrency = useSelector(
		(state) => state.CryptoData.selectedCurrency
	);
	const storedCurrency = JSON.parse(localStorage.getItem("currencyValue"));
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllData(selectedCurrency));
	}, [dispatch, selectedCurrency]);

	const handleSelect = (e) => {
		const selectedValue = e.target.value;
		localStorage.setItem("currencyValue", JSON.stringify(selectedValue));
		dispatch(setSelectedCurrency(selectedValue));
	};
	const navList = [
		{ value: "Home", href: "home" },
		{ value: "Coins", href: "coins" },
		{ value: "Wishlist", href: "wishlist" },
		{ value: "Our App", href: "our-app" },
	];
	const FiatCurrency = [
		{ label: "USD", id: "usd" },
		{ label: "INR", id: "inr" },
	];

	return (
		<header className="bg-blue-700 w-full sticky z-30 top-0 px-5">
			<nav className="flex justify-between items-center mx-auto w-full max-w-6xl py-4 text-white font-bold ">
				<NavLink to={"/"}>
					<div className="w-32">
						<img src={cryptos} alt="Cryptos" />
					</div>
				</NavLink>
				<div className="hidden md:block">
					<ul className="flex justify-between gap-4  ">
						{navList &&
							navList.map((item) => (
								<NavLink key={item.value} to={`/${item.href}`}>
									{item.value}
								</NavLink>
							))}
					</ul>
				</div>
				<div className="hidden md:block  ">
					<select
						name="currency"
						id="currency"
						className=" bg-transparent py-1 px-2 pe-2  block"
						defaultValue={storedCurrency}
						onChange={handleSelect}>
						{FiatCurrency.map((data) => (
							<option key={data.id} className="bg-blue-500" value={data.id}>
								{data.label}
							</option>
						))}
					</select>
				</div>
				<div className="block md:hidden">
					<div className="text-center">
						<button
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
							type="button"
							onClick={() => setIsNavOpen(!isNavOpen)}>
							<GiHamburgerMenu />
						</button>
					</div>
					<div
						id="drawer-right-example"
						className={` ${
							isNavOpen ? " translate-x-0" : "translate-x-full"
						} fixed transition-transform  top-0 right-0 z-40 h-screen p-4 overflow-y-auto  bg-white sm:w-80 w-48 dark:bg-gray-800`}>
						<h5 className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
							Links
						</h5>
						<button
							type="button"
							onClick={() => setIsNavOpen(!isNavOpen)}
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
							<MdCancel />
						</button>

						<ul className="flex flex-col gap-4 text-blue-600">
							{navList &&
								navList.map((item) => (
									<NavLink key={item.value} to={`/${item.href}`}>
										{item.value}
									</NavLink>
								))}
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
