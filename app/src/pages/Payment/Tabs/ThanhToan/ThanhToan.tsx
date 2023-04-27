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
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";

interface Bill {

}

function ThanhToan() {
  const [bank, setBank] = useState<string>("Chọn ngân hàng");
  const [bill, setBill] = useState<string[]>([]);
  const {user} = useSelector((state:RootState)=> state.user)

  //  console.log(user);
  

  const handleSelectBank = (e: SelectChangeEvent) => {
    console.log(e.target.value);
    
    setBank(e.target.value);
  };

  const handlePay = () => {
    console.log(bill);
  }
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
            <b>Bùi Huy Bách</b>
          </Typography>
          <Typography fontSize={"16px"}>
            <span style={{ display: "inline-block", minWidth: "130px" }}>
              Mã khách hàng:
            </span>{" "}
            <b>00110022003</b>
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
            <b>Ha noi</b>
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
            startIcon={<SendIcon sx={{ color: "white" }} />}
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
        <PaymentTable addBill={setBill}/>
      </Box>
    </Box>
  );
}

export default ThanhToan;
