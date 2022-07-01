import axios from "axios";

const token = localStorage.getItem("_token") || "";

const baseURL = "http://localhost:8000/api/";

const instance = axios.create({
  baseURL: baseURL,
  headers: { Authorization: `Bearer ${token}` },
  withCredentials: true,
});

export default instance;
