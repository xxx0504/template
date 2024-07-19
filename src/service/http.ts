/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios, { AxiosError, AxiosResponse } from 'axios'
import axios, { AxiosResponse } from 'axios';
// import { refreshToken } from '@/helper/login'

const HttpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
  headers: {
    post: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    Source: 'MERCHANT',
  },
});
const UploadClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_UPLOAD_URL,
  timeout: 100000,
  headers: {
    post: {
      'Content-Type': 'multipart/form-data',
    },
    Source: 'MERCHANT',
  },
});
const DownloadTextClient = axios.create({
  timeout: 30000,
  headers: {
    post: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    Source: 'MERCHANT',
  },
});
const DownloadFileClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_DOWNLOAD_URL,
  timeout: 30000,
  headers: {
    post: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    Source: 'MERCHANT',
  },
});
/**
 * 业务代码错误code,对应业务单独处理
 */

const resCode: Set<string> = new Set(['120104']);

const responseInterceptors = async (res: AxiosResponse<any, any>) => {
  if (res.data.code !== '200') {
    if (resCode.has(res.data.code)) {
      return Promise.resolve(res);
    }
    console.log(res.data.msg || '接口错误');
    return Promise.reject(res);
  }
  return res;
};

// let hasShowExpiredModal = false

// const responseInterceptorsError = async (err: AxiosError) => {
//   if (err.response?.status === 403) {
//     // 没有权限
//     if (!hasShowExpiredModal) {
//       console.log({
//         title: '提示',
//         content: '您没有权限',
//         onOk() {
//           hasShowExpiredModal = false
//         },
//       })
//       return Promise.reject(err)
//     }
//   } else if (err.response?.status === 401) {
//     console.log('登录过期，请重新登录')
//     // token 过期
//     if (window.location.pathname === '/chat') {
//       window.close()
//     }
//     // 清除location记录
//     if (window.history && window.history.replaceState) {
//       window.history.replaceState(null, '', window.location.href)
//     }
//     window.location.href =
//       import.meta.env.VITE_SSO_LOGIN_URL

//     return Promise.reject(err)
//   }
//   console.log('系统错误')
//   return Promise.reject(err)
// }

// HttpClient.interceptors.response
// let isRefreshing = false
// 响应拦截
HttpClient.interceptors.response.use(
  responseInterceptors
  // responseInterceptorsError
);

export type TStatusCode = '200' | '401';

export interface ResType<T = null> {
  code: TStatusCode;
  data: T;
  msg: string;
  success?: string;
}

interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>;
  post<T>(url: string, params?: unknown): Promise<ResType<T>>;
  delete<T>(url: string, params?: unknown): Promise<ResType<T>>;
  upload<T>(url: string, params: unknown): Promise<ResType<T>>;
  download(url: string): void;
  downloadText(url: string): Promise<string>;
  downloadFile(url: string): Promise<File>;
}

const http: Http = {
  async get(url, params?) {
    try {
      const res = await HttpClient.get(url, { params }).catch(err => {
        throw err.data;
      });
      return res.data;
    } catch (err) {
      // throw err
    }
  },
  async post(url, params?) {
    try {
      const res = await HttpClient.post(url, JSON.stringify(params)).catch(
        err => {
          throw err.data;
        }
      );
      return res.data;
    } catch (err) {
      // throw err
    }
  },

  async delete(url, params?) {
    try {
      const res = await HttpClient.delete(url, { params }).catch(err => {
        throw err.data;
      });
      return res.data;
    } catch (err) {
      // throw err
    }
  },
  async upload(url, file: FormData) {
    try {
      const res = await UploadClient.post(url, file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).catch(err => {
        throw err.data;
      });
      return res.data;
    } catch (err) {
      // throw err
    }
  },

  download(url) {
    if (!url) {
      return console.log('文件链接不存在');
    }
    const link = document.createElement('a');
    link.href = url;
    const urlSplit = url.split('/');
    link.download = urlSplit[urlSplit.length - 1];
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
  downloadText: async function (urlUrl: string): Promise<string> {
    try {
      const { data } = await DownloadTextClient.get(urlUrl);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  downloadFile: async function (urlUrl: string): Promise<File> {
    try {
      const { data } = await DownloadFileClient.get(urlUrl);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default http;
