import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const baseUrl = "https://api.openweathermap.org/data/2.5";

export async function getWeather({ lat, lon }) {
  return axios
    .get(`${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(res => res.data);
}
