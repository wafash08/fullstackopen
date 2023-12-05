import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

export async function getAll() {
  const response = await axios.get(`${baseUrl}/all`);
  return response.data;
}
