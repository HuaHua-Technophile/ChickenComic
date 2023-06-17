export interface imgIndexUrl {
  data: {
    images: Array<{ path: string }>;
  };
}
export interface comicInfoCommonType {
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
  default: () => {};
}
