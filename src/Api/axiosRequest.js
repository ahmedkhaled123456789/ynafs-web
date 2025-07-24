import axios from "axios";

export const baseURL = "https://ynafs.com";
const uri = new URL(baseURL);
const axiosRequest = axios.create({ baseURL });

axiosRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // skip when header set or token not exists
    if (!token || config.headers["Authorization"]) {
      return config;
    }

    const isRelative = !config.url.startsWith("http");
    const isSameHost =
      config.url.startsWith("http") && config.url.includes(uri.hostname);

    if (isRelative || isSameHost) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosRequest;
