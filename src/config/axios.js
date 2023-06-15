import axios from "axios";

const instance = axios.create({ baseURL: "https://mythicals.onrender.com" });

export default instance;
