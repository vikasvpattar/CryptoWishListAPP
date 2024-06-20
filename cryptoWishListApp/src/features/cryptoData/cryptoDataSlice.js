import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllData = createAsyncThunk(
	"getAllData",
	async (currency = "usd") => {
		try {
			const response = await fetch(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
			);
			const data = await response.json();
			return data;
		} catch (error) {
			throw error;
		}
	}
);

export const cryptoDataSlice = createSlice({
	name: "CryptoData",
	initialState: {
		list: [],
		isLoading: false,
		isError: null,
		selectedCurrency: "usd",
	},
	reducers: {
		setSelectedCurrency: (state, action) => {
			state.selectedCurrency = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllData.pending, (state) => {
				state.isLoading = true;
				state.isError = null;
			})
			.addCase(getAllData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.list = action.payload;
			})
			.addCase(getAllData.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = action.error.message;
			});
	},
});

export const { setSelectedCurrency } = cryptoDataSlice.actions;
export default cryptoDataSlice.reducer;
