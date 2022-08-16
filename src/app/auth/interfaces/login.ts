export interface Login {
  email: string;
  password: string;
}

export interface ResponseLogin {
  token?: string;
  data: User;
}

export interface User {
  name: string;
  email: string;
  roleId: {
    _id: string;
    name: string;
  };
  image?: string;
  uid: string;
}
