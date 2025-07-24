import baseUrl from "../Api/axiosRequest";

/**
 *
 * @param {string} url
 * @param {any} data
 * @param {import('axios').AxiosRequestConfig} config
 * @returns
 */
const useInUpdateDataWithImage = async (url, data, config = {}) => {
  config.headers = {
    "Content-Type": "multipart/form-data",
    ...(config.headers || {}),
  };

  const res = await baseUrl.put(url, data, config);
  console.log(res.status);
  return res;
};

/**
 *
 * @param {string} url
 * @param {any} data
 * @param {import('axios').AxiosRequestConfig} config
 * @returns
 */
const useInsUpdateData = async (url, data, config) => {
  const res = await baseUrl.put(url, data, config);
  return res;
};

export { useInUpdateDataWithImage, useInsUpdateData };
