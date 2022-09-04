export interface Salary {
  total: number;
  salaries: DetailSalary[];
}

export interface DetailSalary {
  name: string;
  uid: string;
}
