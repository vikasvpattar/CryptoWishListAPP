import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";

import ChartPage from "./pages/ChartPage.jsx";
import CoinsPage from "./pages/CoinsPage.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import Loader from "./components/Loader.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Error from "./components/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/chart/:id", element: <ChartPage /> },
      { path: "/coins", element: <CoinsPage /> },
      { path: "/loader", element: <Loader /> },
      { path: "/error", element: <Error /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
