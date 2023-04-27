const convertNumberToVnd = (tien: number):string => {
  return tien.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
};

export default convertNumberToVnd;