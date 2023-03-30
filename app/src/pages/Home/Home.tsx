import React, { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import { useState } from "react";
import { IconButton, useMediaQuery } from "@mui/material";
import styles from "./style.module.css";
import { useTheme } from "@mui/material/styles";
import Header from "../../components/Header/header";

function Home() {
  const [open, setOpen] = useState<boolean>(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isSmallScreen == true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSmallScreen]);

  return (
    <div>
      <Header open={open} toggleDrawer={toggleDrawer}></Header>

      <SideBar open={open} />

      <div
        style={{
          marginLeft: open === true ? 250 : "auto",
          padding: "10px",
          backgroundColor: "rgb(248,249,249)",
          height:'calc(100vh - 60px)'
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
