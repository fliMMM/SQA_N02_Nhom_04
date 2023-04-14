import { Typography, Box, Stack } from "@mui/material";
function ThanhToan() {
  return (
    <Box>
      <Box>
        <Typography color={"#223671"} fontSize={20} fontWeight={"bold"}>
          Thông tin khách hàng
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }}>
          <Typography sx={{ width: "40%", fontSize: "19px" }}>
            <span style={{ display: "inline-block", minWidth: "100px" }}>
              Họ tên:
            </span>{" "} <b>Bùi Huy Bách</b>
          </Typography>
          <Typography fontSize={"19px"}>
            <span style={{ display: "inline-block", minWidth: "100px" }}>
              Mã khách hàng:
            </span>{" "}
            <b>00110022003</b>
          </Typography>
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }}>
          <Typography width={{ sm: "40%", fontSize: "19px" }}>
            Số điện thoại: <b>0354604144</b>
          </Typography>
          <Typography fontSize={"19px"}>
            Địa chỉ: <b>Ha noi</b>
          </Typography>
        </Stack>
      </Box>
      <Box>
        <Typography color={"#223671"} fontSize={20} fontWeight={"bold"}>
          Thông tin thanh toán
        </Typography>
      </Box>
    </Box>
  );
}

export default ThanhToan;
