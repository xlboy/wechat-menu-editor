import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { BASE_URL, TIME_OUT, errorHandle } from './config';
interface IResponseData<T> {
  code: number;
  message: string;
  result: T
}

/**
 * 创建axios实例
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
});

/**
 * 响应拦截处理
 */
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status === 200) {
      const code = res.data.code;
      if (code === 0) {
        return Promise.resolve(res.data);
      }
    }
    return Promise.reject(res.data);
  },
  (error: AxiosError) => {
    if (error && error.response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(error.response.status);
      return Promise.reject(error.response);
    }
    console.log("网络请求失败, 请刷新重试");
    return Promise.reject(error);
  }
);

const ajaxGet = <T = any>(url: string, params?: any): Promise<IResponseData<T>> => axiosInstance.get(url, { params });
const ajaxPost = <T = any>(url: string, params?: any): Promise<IResponseData<T>> => axiosInstance.post(url, params);

export {
  ajaxGet,
  ajaxPost
};

export default axiosInstance;

