// 安装axios
// $cnpm i axios -S
import axios from "axios";
// 创建axios 初始化
const service = axios.create({
  baseURL: "https://api.usuuu.com/qq", // 基本URL
  timeout: 30000, //超时时间
  /* headers: {
    "Content-Type": "application/json;charset=utf-8",
  }, */
  // withCredentials: true, //自动获取cookie信息
});
// request 拦截器 发送数据到后台拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log("axios中request报错", error);
  }
);
// response 拦截器 后台发送前台拦截器
service.interceptors.response.use(
  (config) => {
    return config.data;
  },
  (error) => {
    console.log("axios中response报错", error);
  }
);

//fastmock用户信息获取伪接口
export function getQQInfo(qq: string): object {
  return service({
    url: `/${qq}`,
    method: "get",
  });
}
