interface Bill{
  _id: string;
  userCode: string;
  amountMoney: string;
  electricityIndex: number;
  isPaid: boolean;
  content: string;
  updatedAt?: string;
}

export interface BillToPay{
  userCode: string,
  billIds: string[]
}

export default Bill;