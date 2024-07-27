import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "https://api.coingecko.com/api/v3/coins/markets";
const API_KEY = "CG-ntsXi9EVwHMMe6NXhyJjvAmU";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": API_KEY,
  },
};

export const getAllData = createAsyncThunk(
  "cryptoData/getAllData",
  async (currency = "usd", { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        options
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialWishlist =
  JSON.parse(localStorage.getItem("wishListedCoin")) || [];
const initialCurrency =
  JSON.parse(localStorage.getItem("currencyValue")) || "usd";

export const cryptoDataSlice = createSlice({
  name: "CryptoData",
  initialState: {
    list: [],
    isLoading: false,
    isError: null,
    selectedCurrency: initialCurrency,
    wishlist: initialWishlist,
  },
  reducers: {
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
    addToWishlist: (state, action) => {
      const existingCoin = state.wishlist.find(
        (item) => item.id === action.payload.id
      );
      if (!existingCoin) {
        state.wishlist.push(action.payload);
        localStorage.setItem("wishListedCoin", JSON.stringify(state.wishlist));
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("wishListedCoin", JSON.stringify(state.wishlist));
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
        console.error("Fetch error:", action.payload);
        state.isError = action.payload || action.error.message;
      });
  },
});

export const { setSelectedCurrency, addToWishlist, removeFromWishlist } =
  cryptoDataSlice.actions;
export default cryptoDataSlice.reducer;
