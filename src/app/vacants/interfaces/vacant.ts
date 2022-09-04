export interface ListVacant {
  total: number;
  vacants: DataVacant[];
}

export interface DataVacant {
  title: string;
  salary: Info;
  category: Info;
  company: string;
  lastDate: string;
  description: string;
  image: string | File;
  author: Info | string;
  uid?: string,
}

export interface Info {
  _id: string;
  name: string;
}

export interface ResponseVacant {
  message: string;
  vacant: DataVacant;
}

export interface ResponseVacantDelete {
  delete: boolean;
  message: string;
}
