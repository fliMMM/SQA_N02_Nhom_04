interface Bill{
  _id: string;
  userCode: string;
  amountMoney: number;
  electricityIndex: number;
  isPaid: boolean;
  content: string;
}

export interface BillToPay{
  userCode: string,
  billIds: string[]
}

export default Bill;