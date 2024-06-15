import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllData = createAsyncThunk("getAllData", async () => {
	try {
		const response = await fetch(
			"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
		);
		const data = await response.json(); // Convert response to JSON
		return data; // Directly return the data
	} catch (error) {
		throw error; // Rethrow the error to be caught by Redux Toolkit
	}
});

export const cryptoDataSlice = createSlice({
	name: "CryptoData",
	initialState: {
		list: [],
		isLoading: false,
		isError: null, // Change error state to hold the error object
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllData.pending, (state) => {
				state.isLoading = true;
				state.isError = null; // Reset error state when fetching starts
			})
			.addCase(getAllData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.list = action.payload; // Assign the payload directly to the list
			})
			.addCase(getAllData.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = action.error.message; // Store error message in the state
			});
	},
});

export default cryptoDataSlice.reducer;
