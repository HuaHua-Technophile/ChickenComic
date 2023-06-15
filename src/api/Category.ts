import service from "./http";

// 分类筛选条件
export function getAllLabel(): object {
  return service({
    url: "/AllLabel",
    method: "get",
  });
}

// 分类结果
export function getClassPage(params: object): object {
  return service({
    url: "/ClassPage",
    method: "get",
    params,
  });
}
