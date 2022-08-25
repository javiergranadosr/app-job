export interface ListVacant {
  total: number;
  vacants: DataVacant[];
}

export interface DataVacant {
  title: string;
  salary: number;
  category: Info;
  company: string;
  lastDate: string;
  description: string;
  image: string;
  author: Info;
}

export interface Info {
  _id: string;
  name: string;
}
