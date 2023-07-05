export interface imgIndexUrlType {
  data: {
    images: Array<{ path: string }>;
  };
}
export interface comicInfoCommonType {
  allow_wait_free: boolean;
  id?: number;
  comic_id: number;
  title: string;
  author: string[];
  author_name: Array<string>;
  styles: Array<{ name: string }>;
  is_finish: number;
  last_ord: number | string;
  vertical_cover: string;
  type: object;
  wiki: {
    id: number;
    title: string;
    vertical_cover: string;
  };
  default: () => {};
}
export interface userInfoType {
  id?: number;
  name?: string;
  collection?: Array<{
    id: string;
    vertical_cover: string;
    title: string;
    last_ord: number;
  }>;
  watchingHistory?: Array<{
    index: number;
    data: {
      id: number;
      title: string;
      horizontal_cover: string;
      ep_list: Array<object>;
    };
  }>;
}
