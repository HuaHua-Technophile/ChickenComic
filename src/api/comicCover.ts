import service from "./http";
// 漫画详情页
// 漫画详情页数据
export function getComicDetail(comicId: string) {
  return service({
    url: `/bcomic/ComicDetail?comicId=${comicId}`,
    method: "get",
  });
}
