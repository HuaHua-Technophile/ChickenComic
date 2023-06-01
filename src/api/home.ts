import service from "./http.js";
// 首页
// 首页Tab推荐模块Feed漫画列表
export function getHomeFeed(params: object): any {
  return service({
    url: "/HomeFeed",
    method: "get",
    params,
  });
}
