import * as React from "react";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CssBaseline } from "@mui/material";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
}

export default function SideBar(props: Props) {
  const { open } = props;
  const navigate = useNavigate();

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <CssBaseline />
      <List>
        <ListItem disablePadding sx={{ height: "52px" }}>
          <ListItemButton
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemIcon>
              <img src={assets.logo} alt="" width={90} height={40} />
            </ListItemIcon>
            <ListItemText primary={"TÊN WEB"} style={{ color: "white" }} />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <Drawer
        variant="persistent"
        anchor={"left"}
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "rgb(34,54,113)",
          },
        }}
      >
        {list()}
      </Drawer>
    </React.Fragment>
  );
}
