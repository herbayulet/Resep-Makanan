import axios from "axios";

const BASE_URL = "https://themealdb.com/api/json/v1/1/"

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});