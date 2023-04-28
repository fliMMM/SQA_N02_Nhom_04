interface User {
  email: string,
  password: string,
  confirmPassword?: string,
  userCode?: string,
  createdAt?: string,
  electricityIndex?: number;
  _v?: number;
  _id?: string;
  fullname?: string;
  address?: string;
}

export default User