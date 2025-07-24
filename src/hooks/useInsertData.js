import axiosRequest from "../Api/axiosRequest";

/**
 *
 * @param {string} url
 * @param {import('axios').AxiosRequestConfig} config
 * @returns
 */
const useInsertDataWithImage = async (url, config = {}) => {
  config.headers = {
    "Content-Type": "multipart/form-data",
    ...(config.headers || {}),
  };

  const res = await axiosRequest.post(url, config, config);
  return res;
};

/**
 *
 * @param {string} url
 * @param {import('axios').AxiosRequestConfig} config
 * @returns
 */
const useInsertData = async (url, config) => {
  const res = await axiosRequest.post(url, config);
  return res;
};

export { useInsertData, useInsertDataWithImage };
