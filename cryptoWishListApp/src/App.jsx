import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import { getAllData } from "./features/cryptoData/cryptoDataSlice";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllData());
	}, [dispatch]); 



	return (
		<div className="">
			<Navbar />
			<Outlet />
		</div>
	);
}

export default App;
