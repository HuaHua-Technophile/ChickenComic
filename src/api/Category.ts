import service from "./http";
import { type allLabelDataType } from "@/utils/typeing";
// 分类筛选条件
export function getAllLabel(): Promise<allLabelDataType> {
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
