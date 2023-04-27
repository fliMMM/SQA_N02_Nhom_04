import axiosClient from "./axiosClient";

interface BillToPay{
  userCode: string,
  billIds: string[]
}

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