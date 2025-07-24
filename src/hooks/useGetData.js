import axiosRequest from "../Api/axiosRequest";

/**
 *
 * @param {string} url
 * @param {import('axios').AxiosRequestConfig} config
 * @returns
 */
const useGetData = async (url, config) => {
  const res = await axiosRequest.get(url, config);
  return res.data;
};

/**
 *
 * @param {string} url
 * @returns
 */
const useGetDataToken = async (url) => {
  const res = await axiosRequest.get(url);
  return res.data;
};

export { useGetData, useGetDataToken };
