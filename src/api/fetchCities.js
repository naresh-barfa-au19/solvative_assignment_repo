import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_HOST = import.meta.env.VITE_API_HOST;

export const fetchCities = async ({ query, limit, page }) => {
  try {
    const options = {
      method: "GET",
      url: API_URL,
      params: { namePrefix: query, limit, offset: page * limit },
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": API_HOST,
      },
    };

    const response = await axios.request(options);
    return {data: response?.data ?? []};
  } catch (error) {
    console.error("Error fetching cities:", error);
    return { data: [] };
  }
};
