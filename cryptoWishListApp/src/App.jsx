import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import { getAllData } from "./features/cryptoData/cryptoDataSlice";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllData);
	}, []);
	const Cdata = useSelector((state) => state);
	console.log(Cdata.CryptoData.list);
	return (
		<div className="bg-gray-900">
			<Navbar />
			<Outlet />
		</div>
	);
}

export default App;
