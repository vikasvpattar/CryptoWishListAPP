import { configureStore } from "@reduxjs/toolkit";
import cryptoDataSlice from "../features/cryptoData/cryptoDataSlice";


export const store = configureStore({
	reducer: {
		CryptoData: cryptoDataSlice,
	},
});
