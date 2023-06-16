import service from "./http";
// 排行榜
// 排行榜列表
export function getListRank() {
  return service({
    url: "/ListRank",
    method: "get",
  });
}

// 排行榜详情
export function getRankInfo(params: object) {
  return service({
    url: `/GetRankInfo`,
    method: "get",
    params,
  });
}
