import service from "./http";
//推荐漫画列表 3个
export function getRecommend(): Promise<any> {
  return service({
    url: `/Recommend`,
    method: "get",
  });
}
//推荐漫画列表 10个
export function getHomeRecommend(): Promise<any> {
  return service({
    url: `/HomeRecommend`,
    method: "get",
  });
}
