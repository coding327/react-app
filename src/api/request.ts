import axios from "axios";
import {
  ShowFail,
  ShowLoading,
  ShowSuccess,
  CloseToast,
} from "../utils/message";
import { history } from "umi";
export const baseURL = "http://localhost:3000/"; // 本地接口

const request = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {},
});

// 拦截器   Interceptors
// Add a request interceptor  请求拦截器
request.interceptors.request.use(
  function (config) {
    // 发送到后端
    const token = sessionStorage.getItem("pro_token");
    config.headers.token = token;
    // 请求发送之前
    ShowLoading();
    return config;
  },
  function (error) {
    ShowFail("请求失败");
    // 请求失败
    return Promise.reject(error);
  }
);

// Add a response interceptor  响应拦截器
request.interceptors.response.use(
  function (response) {
    // 响应成功
    console.log(response.data);
    // CloseToast()
    // if(response.data.code==200){
    //     ShowSuccess(response.data.msg)
    // }else{
    //     ShowFail(response.data.msg)
    //     if(response.data.code==3001){
    //         router.replace('/login')
    //     }
    // }
    return response;
  },
  function (error) {
    // 响应失败  503
    ShowFail("响应失败-服务器异常");
    history.push("/503");
    return Promise.reject(error);
  }
);

// GET 请求
export const GET = (url: string, params?: object, headers?: object) => {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: "GET",
      params: params,
      headers,
    })
      .then((result) => {
        resolve(result.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// POST 请求

export const POST = (
  url: string,
  data?: object,
  params?: object,
  headers?: object
) => {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: "POST",
      data: data,
      params: params,
      headers,
    })
      .then((result) => {
        resolve(result.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { request };
