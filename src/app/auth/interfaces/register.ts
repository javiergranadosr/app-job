export interface Register {
  name: string;
  email: string;
  roleId: string;
  password: string;
}

export interface ResponseError {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export interface ResponseRegister {
  message: string;
  user?: {
    name: string;
    email: string;
    roleId: string;
    uid: string;
  };
}
