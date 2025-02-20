// 导入axios
import axios from "axios";
// 创建axios实例
const instance = axios.create({
  // 设置项目基准地址
  baseURL: "api",
  // 设置请求超时时间
  timeout: 5000,
});
// 设置请求拦截器
instance.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem("token");
  if (token) {
    config.headers["token"] = token;
  }
  return config;
});
// 设置响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    return err.response.data;
  }
);

export default instance;
