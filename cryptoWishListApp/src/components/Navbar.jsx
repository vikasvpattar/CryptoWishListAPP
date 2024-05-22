import React from "react";
import cryptos from "../assets/Cryptos.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	const navList = [
		{ value: "Home", href: "home" },
		{ value: "About", href: "about" },
		{ value: "Our App", href: "our-app" },
		{ value: "Token Sales", href: "token-sales" },
	];

	return (
		<header className="bg-blue-700 w-full">
			<nav className="flex justify-between items-center mx-auto w-full max-w-7xl py-4 text-white font-bold">
				<div className="w-32">
					<img src={cryptos} alt="Cryptos" />
				</div>
				<ul className="flex justify-between gap-4">
					{navList &&
						navList.map((item) => (
							<NavLink key={item.value} to={`/${item.href}`}>
								{item.value}
							</NavLink>
						))}
				</ul>
				<button>Download App</button>
			</nav>
		</header>
	);
};

export default Navbar;
