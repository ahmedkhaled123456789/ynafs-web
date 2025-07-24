import axiosRequest from "../Api/axiosRequest";

/**
 *
 * @param {string} url
 * @param {import('axios').AxiosRequestConfig} config
 * @returns
 */
const useDeleteData = async (url, config) => {
  const res = await axiosRequest.delete(url, config);
  return res.data;
};

export default useDeleteData;
