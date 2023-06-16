export interface imgIndexUrl {
  data: {
    images: Array<{ path: string }>;
  };
}

export interface allLabelDataType {
  data: object;
}

export interface comicInfoCommonType {
  id?: number;
  comic_id: number;
  title: string;
  author: string[];
  styles: Array<{ name: string }>;
  is_finish: number;
  last_ord: number | string;
  vertical_cover: string;
  type: object;
  default: () => {};
}
