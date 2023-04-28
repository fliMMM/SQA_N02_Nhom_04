import axiosClient from "./axiosClient";
import { BillToPay } from "../models/bill.model";


const billApi =  {
  pay(billToPay: BillToPay) {
    const url = "bill/pay";

    return axiosClient.post(url, billToPay);
  },
  getPaid(data:{userCode:string}) {
    const url = "bill/get-paid";

    return axiosClient.post(url, data);
  },
  getUnpaid(userCode:string) {
    const url = "bill/get-unpaid";

    return axiosClient.post(url, userCode);
  }
}


export default billApi;