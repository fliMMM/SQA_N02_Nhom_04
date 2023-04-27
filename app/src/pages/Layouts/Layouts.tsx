import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import { useState } from "react";
import Login from "../Login/login";
import { IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "../../components/Header/header";
import { useSelector, useDispatch } from "react-redux";

function Layouts() {
  const [open, setOpen] = useState<boolean>(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  // const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector((state: any) => state.user);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (user === null) {
      navigate("login")
      return;
    }
    if (isSmallScreen == true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSmallScreen]);

  if (user === null) {
    return <Login/>
  }

  return (
    <div>
      <Header open={open} toggleDrawer={toggleDrawer}></Header>

      <SideBar open={open} />

      <div
        style={{
          marginLeft: open === true ? 250 : "auto",
          padding: "20px 30px",
          backgroundColor: "rgb(248,249,249)",
          height:'calc(100vh - 60px)'
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Layouts;
