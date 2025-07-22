import axios from "axios";

export const baseURL = "https://ynafs.com";
const axiosRequest = axios.create({ baseURL });

export default axiosRequest;
