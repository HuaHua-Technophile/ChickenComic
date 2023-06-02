import service from "./http";
// 章节内容
// 漫画章节内容图片&索引
export function getImageIndex(params: object): object {
  return service({
    url: "/GetImageIndex",
    method: "get",
    params,
  });
}

// 漫画章节内容图片Token
export function getImageToken(params: object): object {
  return service({
    url: "/ImageToken",
    method: "get",
    params,
  });
}
