import service from "./http";
// 章节内容
// 漫画章节内容图片&索引
export function getImageIndex(params: object): any {
  return service({
    url: "/GetImageIndex",
    method: "get",
    params,
  });
}
