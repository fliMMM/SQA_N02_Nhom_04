import React, { useEffect, useState } from "react";
import { IconButton, Button, Menu, MenuItem } from "@mui/material";
import styles from "./style.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import assets from "../../assets/assets";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  toggleDrawer: () => void;
}

function Header(props: Props) {
  const { open, toggleDrawer } = props;
  const navigate = useNavigate();

  const [user, setUser] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // console.log(anchorEl);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(true);
    }
  }, []);

  return (
    <header className={styles.header}>
      <IconButton
        onClick={toggleDrawer}
        sx={{ left: open === true ? 260 : "auto" }}
      >
        <MenuIcon sx={{ color: "rgb(245,140,92)" }} />
      </IconButton>

      {user === true ? (
        <div>
          <Button
            id="basic-button"
            aria-controls={openMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={handleOpenMenu}
            sx={{ color: "rgb(34,54,113)", fontWeight: "bold" }}
          >
            <img src={assets.logo} alt="" width={60} height={50} />
            <p>Bui HUy Bach</p>
            {openMenu === true ? (
              <KeyboardArrowUpIcon sx={{ color: "rgb(34,54,113)" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ color: "rgb(34,54,113)" }} />
            )}
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{
              "& .MuiPaper-root": {
                minWidth: "180px",
              },
              left: "10px",
            }}
          >
            <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
            <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                localStorage.removeItem("user");
                setUser(false);
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <Button
          sx={{
            color: "white",
            backgroundColor: "#223671",
            fontWeight: "bold",
            ":hover": {
              backgroundColor: "#F58C5C",
            },
            }}
            onClick = {()=>{navigate('/login')}}
        >
          Đăng nhập
        </Button>
      )}
    </header>
  );
}

export default Header;
