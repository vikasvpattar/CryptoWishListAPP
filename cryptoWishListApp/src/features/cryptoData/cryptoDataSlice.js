import { createSlice } from "@reduxjs/toolkit";

// Utility functions for localStorage
const getFromLocalStorage = (key, defaultValue) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Initial state from localStorage
const initialWishlist = getFromLocalStorage("wishListedCoin", []);
const initialCurrency = getFromLocalStorage("currencyValue", "usd");

export const cryptoDataSlice = createSlice({
  name: "CryptoData",
  initialState: {
    selectedCurrency: initialCurrency,
    wishlist: initialWishlist,
  },
  reducers: {
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
      setToLocalStorage("currencyValue", action.payload); // Persist selected currency to localStorage
    },
    addToWishlist: (state, action) => {
      const existingCoin = state.wishlist.find(
        (item) => item.id === action.payload.id
      );
      if (!existingCoin) {
        state.wishlist.push(action.payload);
        setToLocalStorage("wishListedCoin", state.wishlist); // Persist wishlist to localStorage
      }
    },
    removeFromWishlist: (state, action) => {
      const updatedWishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
      state.wishlist = updatedWishlist;
      setToLocalStorage("wishListedCoin", state.wishlist); // Persist wishlist to localStorage
    },
  },
});

// Exporting actions for use in components
export const { setSelectedCurrency, addToWishlist, removeFromWishlist } =
  cryptoDataSlice.actions;

// Export the reducer
export default cryptoDataSlice.reducer;
