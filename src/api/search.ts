import service from "./http";

// 热门搜索  （参数 num=10）
export function getSearchReferral(params: any): any {
  return service({
    url: "/SearchRecommend",
    method: "get",
    params,
  });
}


// 搜索建议词
// ?term=天&num=20
export function getSuggestedWord(params: any): any {
  console.log(params);
  return service({
    url: "/bcomic/SearchSug",
    method: "get",
    params,
  });
}

// 漫画搜搜
// keyWord
export function getSearchResult(params: any): any {
  console.log(params);
  return service({
    url: "/Search",
    method: "get",
    params,
  });
}