import React from "react";
import { Card, Stack, CardContent, Typography } from "@mui/material";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import { Chart } from "./Components/Chart/Chart";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Stack spacing={4} direction={'column'} >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 3 }}
        
      >
        <Card
          sx={{
            backgroundColor: "#FF9F43",
            minWidth: "32%",
          }}
        >
          <CardContent>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack spacing={1}>
                <Typography color={"white"} fontSize={20} fontWeight={"bold"}>
                  100 W
                </Typography>

                <Typography color={"white"} fontSize={15} fontWeight={"bold"}>
                  Số điện đã tiêu thụ
                </Typography>
              </Stack>

              <DynamicFormIcon sx={{ color: "white", fontSize: "70px" }} />
            </Stack>
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor: "#FF9F43",
            minWidth: "32%",
          }}
        >
          <CardContent>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack spacing={1}>
                <Typography color={"white"} fontSize={20} fontWeight={"bold"}>
                  100
                </Typography>

                <Typography color={"white"} fontSize={15} fontWeight={"bold"}>
                  Tổng tiền điện
                </Typography>
              </Stack>

              <LocalAtmIcon sx={{ color: "white", fontSize: "70px" }} />
            </Stack>
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor: "#FF9F43",
            minWidth: "32%",
          }}
        >
          <CardContent>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack spacing={1}>
                <Typography color={"white"} fontSize={20} fontWeight={"bold"}>
                  100
                </Typography>

                <Typography color={"white"} fontSize={15} fontWeight={"bold"}>
                  Con số gì đó
                </Typography>
              </Stack>

              <DynamicFormIcon sx={{ color: "white", fontSize: "70px" }} />
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Chart chartName={"Biểu đồ tiêu thụ điện"} />
      <Chart chartName={"Biểu đồ tiền điện"} />
    </Stack>
  );
}

export default Home;
