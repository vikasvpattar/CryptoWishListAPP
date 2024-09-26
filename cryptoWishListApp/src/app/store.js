import { configureStore } from "@reduxjs/toolkit";
import cryptoDataSlice from "../features/cryptoData/cryptoDataSlice";
import { cryptoApi } from "../features/cryptoApi"; // Import the RTK Query API slice

export const store = configureStore({
  reducer: {
    CryptoData: cryptoDataSlice, // Existing cryptoData slice
    [cryptoApi.reducerPath]: cryptoApi.reducer, // Add the RTK Query API slice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware), // Add RTK Query middleware
});
