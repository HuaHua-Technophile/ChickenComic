import service from "./http";
// 排行榜
// 排行榜列表
export function getListRank(): object {
  return service({
    url: "/ListRank",
    method: "get",
  });
}

// 排行榜详情
export function getRankInfo(params: object): object {
  return service({
    url: "/ImageToken",
    method: "get",
    params,
  });
}
