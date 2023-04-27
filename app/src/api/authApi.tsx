import axiosClient from "./axiosClient";

import UserInfo from "../models/user.model";

const authApi =  {
  login(userData: UserInfo) {
    const url = "auth/login";

    return axiosClient.post(url, userData);
  },
  register(userData: UserInfo) {
    const url = "auth/register";

    return axiosClient.post(url, userData);
  }
}


export default authApi;