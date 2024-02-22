"use client";
import React, { Fragment } from "react";
// logout
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { getCookie } from "cookies-next";
import { checkUserData } from "@/app/login/checkUserRole";
import { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import handleLogout from "@/app/login/actions";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import RestoreRoundedIcon from "@mui/icons-material/RestoreRounded";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
const DropdownUser = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [userData, setUserData] = useState({});
  const user = getCookie("user") ? JSON.parse(getCookie("user")) : {};

  const handleGetUserData = async () => {
    const result = await checkUserData(user?.email);
    setUserData(result);
  };

  useEffect(() => {
    handleGetUserData();
  }, []);

  return (
    <Fragment>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className=" text-gray-700"
      >
        {userData?.fullname}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{}}
      >
        <MenuItem onClick={handleClose} className="flex gap-2">
          <PersonOutlineOutlinedIcon sx={{ fill: "#9AA1B0" }} />
          ข้อมูลผู้ใช้งาน
        </MenuItem>
        <MenuItem onClick={handleClose} className="flex gap-2">
          <AssignmentOutlinedIcon sx={{ fill: "#9AA1B0" }} />
          รายงานคำสั่งซ่อม
        </MenuItem>
        <MenuItem onClick={handleClose} className="flex gap-2">
          <RestoreRoundedIcon sx={{ fill: "#9AA1B0" }} />
          ประวัติการซ่อม
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleLogout()} className="flex gap-2">
          <LogoutRoundedIcon sx={{ fill: "#9AA1B0" }} />
          ออกจากระบบ
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default DropdownUser;
