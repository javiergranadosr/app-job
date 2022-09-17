export interface EditProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  password: string;
  newPassword: string;
}

export interface ResponseProfile {
  message: string;
  data?: {
    name: string;
    email: string;
    roleId: string;
    phone?: string;
    city?: string;
    uid: string;
  };
}
