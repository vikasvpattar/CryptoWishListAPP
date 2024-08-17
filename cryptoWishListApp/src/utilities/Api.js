import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3";

export const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`, {
      params,
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-ntsXi9EVwHMMe6NXhyJjvAmU",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};
