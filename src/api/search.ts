import service from "./http";

// 热门搜索  （参数 num=10）
export function getSearchReferral(params: any): any {
  return service({
    url: "/SearchRecommend",
    method: "get",
    params,
  });
}