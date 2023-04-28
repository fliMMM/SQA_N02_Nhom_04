import {
  Typography,
  Box,
  Stack,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentTable from "./Table";
import { useState } from "react";
import Bill, { BillToPay } from "../../../../models/bill.model";
import useNotis from "../../../../hook/noti";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import billApi from "../../../../api/billApi";
import CircularProgress from "@mui/material/CircularProgress";

interface ThanhToanProps {
  reload: boolean;
  setReload: (reload:boolean) => void;
}

function ThanhToan({reload, setReload}:ThanhToanProps) {
  const [bank, setBank] = useState<string>("Chọn ngân hàng");
  const [bill, setBill] = useState<Bill[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.user);
  const noti = useNotis();

  const handleSelectBank = (e: SelectChangeEvent) => {
    setBank(e.target.value);
  };

  const handlePay = async () => {
    if (bank === "Chọn ngân hàng") {
      noti("Hãy chọn ngân hàng thanh toán", "info");
      return;
    }
    if (bill.length === 0) {
      noti("Hãy chọn 1 hoá đơn để thanh toán", "info");
      return;
    }

    const billIds = bill.map((bill) => bill._id);

    const billToPay: BillToPay = {
      userCode: user?.userCode as string,
      billIds,
    };

    try {
      setLoading(true);
      const res = await billApi.pay(billToPay);
      noti(res.data.message, "success");
      setLoading(false);
      setReload(!reload);
    } catch (err) {
      noti("Thanh toán không thành công", "error");
    }
  };
  return (
    <Box>
      <Box mb={1} width={{ lg: "80%" }}>
        <Typography
          color={"#223671"}
          mt={3}
          mb={0.5}
          fontSize={17}
          fontWeight={"bold"}
        >
          Thông tin khách hàng
        </Typography>
        <Stack
          mb={{ xs: 1 }}
          spacing={{ xs: 1 }}
          direction={{ xs: "column", sm: "row" }}
        >
          <Typography width={{ sm: "40%" }} sx={{ fontSize: "16px" }}>
            <span style={{ display: "inline-block", minWidth: "130px" }}>
              Họ tên:
            </span>{" "}
            <b>{user?.fullname}</b>
          </Typography>
          <Typography fontSize={"16px"}>
            <span style={{ display: "inline-block", minWidth: "130px" }}>
              Mã khách hàng:
            </span>{" "}
            <b>{user?.userCode}</b>
          </Typography>
        </Stack>

        <Stack spacing={{ xs: 1 }} direction={{ xs: "column", sm: "row" }}>
          <Typography width={{ sm: "40%", fontSize: "16px" }}>
            <span style={{ display: "inline-block", minWidth: "130px" }}>
              Số điện thoại:
            </span>{" "}
            <b>0354604144</b>
          </Typography>
          <Typography fontSize={"16px"}>
            <span style={{ display: "inline-block", minWidth: "130px" }}>
              Địa chỉ:
            </span>{" "}
            <b>{user?.address}</b>
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ sm: "center" }}
        >
          <FormControl sx={{ m: 1, width: "300px", marginLeft: "0px" }}>
            <Select
              sx={{ height: "40px" }}
              value={bank}
              onChange={handleSelectBank}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              renderValue={(value) => {
                return (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <CreditCardIcon sx={{ color: "#223671" }} />
                    {value}
                  </Box>
                );
              }}
            >
              <MenuItem value="Chọn ngân hàng">Chọn ngân hàng</MenuItem>
              <MenuItem value={"Vietinbank"}>Vietinbank</MenuItem>
              <MenuItem value={"Vietcombank"}>Vietcombank</MenuItem>
              <MenuItem value={"Techcombank"}>Techcombank</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={handlePay}
            startIcon={
              loading === false ? (
                <SendIcon sx={{ color: "white" }} />
              ) : (
                <CircularProgress size={15} sx={{ color: "white" }} />
              )
            }
            sx={{
              height: "40px",
              width: "300px",
              backgroundColor: "#223771",
              color: "white",
              fontWeight: "bold",
              ":hover": {
                backgroundColor: "#3C5398",
              },
            }}
          >
            Thực hiện thanh toán
          </Button>
        </Stack>
      </Box>
      <Box>
        <Typography mb={1} color={"#223671"} fontSize={17} fontWeight={"bold"}>
          Thông tin thanh toán
        </Typography>
        <PaymentTable reload={reload} addBill={setBill} />
      </Box>
    </Box>
  );
}

export default ThanhToan;
