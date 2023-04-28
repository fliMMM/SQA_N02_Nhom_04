import React, { useState } from "react";
import { Card, Stack, CardContent, Typography } from "@mui/material";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Tabs, Tab, Box } from "@mui/material";
import ThanhToan from "./Tabs/ThanhToan/ThanhToan";
import PaymentHistory from "./Tabs/LichSu/LichSuThanhToan";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

function Payment() {
  const [tab, setTab] = useState(0);
  const [reload, setReload] = useState<boolean>(false);

  const handleChangTab = (e: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };



  
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChangTab}>
          <Tab
            label="Thanh toán tiền điện"
            id="thanhToan"
            aria-controls="tabpanel-thanhToan"
          />
          <Tab
            label="Lịch sử thanh toán"
            id="lichSuThanhToan"
            aria-controls="tabpanel-lichSuThanhToan"
          />
        </Tabs>
      </Box>

      <div
        hidden={tab === 1}
        role="tabpanel"
        id="tabpanel-thanhToan"
        aria-labelledby="thanhToan"
      >
        <ThanhToan reload={reload} setReload={ setReload} />
      </div>
      <div
        hidden={tab === 0}
        role="tabpanel"
        id="tabpanel-lichSuThanhToan"
        aria-labelledby="lichSuThanhToan"
      >
        <PaymentHistory reload={reload} setReload={ setReload}/>
      </div>
    </Box>
  );
}

export default Payment;
