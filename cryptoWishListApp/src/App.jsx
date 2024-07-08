import { Outlet } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div className="">
			<Navbar />
			<ToastContainer autoClose={2000} />

			<Outlet />
		</div>
	);
}

export default App;
