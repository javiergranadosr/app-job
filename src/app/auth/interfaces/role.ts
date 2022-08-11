export interface Role {
  total: number;
  roles: Roles[];
}

export interface Roles {
  name: string;
  description: string;
  uid: string;
}
