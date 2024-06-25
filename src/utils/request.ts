import axios from "axios";
import { ElMessage } from "element-plus";
axios.defaults.timeout = 10000000; // 超时时间
axios.defaults.baseURL = "http://127.0.0.1:8080/"; // http://127.0.0.1:4523/m1/3898618-0-default"; //"http://127.0.0.1:8080";
// 数据格式转换
axios.defaults.transformRequest = function (data) {
  data = JSON.stringify(data);
  return data;
};

// 路由请求拦截
axios.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    try {
      // 设置前端token
      const token = localStorage.getItem("token");
      if (token && token !== "") {
        config.headers["token"] = token;
      }
    } catch {
      console.log("error put token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);
// 路由响应拦截
axios.interceptors.response.use(
  (response) => {
    console.log(response, "sss");
    if (response.data.code !== 0) {
      ElMessage({
        showClose: true,
        message: response.data.msg,
        type: "error",
      });
    } else {
      return response.data;
    }
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          error.message = `错误请求`;
          break;
        case 401:
          error.message = `未授权，请重新登录`;
          break;
      }
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log(error.message);
    }
    ElMessage({
      showClose: true,
      message: error.message,
      type: "error",
    });
    return Promise.reject(error.response); // 返回接口返回的错误信息
  }
);
export default axios;
