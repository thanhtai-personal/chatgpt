import { HttpClient } from "./httpClient";

export const backendHttpClient = new HttpClient({
  baseURL: process.env.REACT_APP_API_URL,
});
