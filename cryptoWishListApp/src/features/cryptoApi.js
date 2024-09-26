import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/coins/markets",
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      headers.set("x-cg-demo-api-key", "CG-ntsXi9EVwHMMe6NXhyJjvAmU");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllData: builder.query({
      query: (currency = "usd") =>
        `?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
    }),
  }),
});

// Export the hook for fetching data with currency
export const { useGetAllDataQuery } = cryptoApi;
