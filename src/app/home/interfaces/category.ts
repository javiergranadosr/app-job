export interface Category {
  total: number;
  categories: DetailCategory[];
}

export interface DetailCategory {
  name: string;
  uid: string;
}
