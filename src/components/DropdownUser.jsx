"use client";
import React, { Fragment } from "react";
// logout
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Logout from "./Logout";
import { getCookie } from "cookies-next";
import { checkUserData } from "@/app/login/checkUserRole";
import { useState, useEffect } from "react";

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
    console.log(result);
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
      >
        <MenuItem onClick={handleClose}>ข้อมูลผู้ใช้งาน</MenuItem>
        <MenuItem onClick={handleClose}>รายงานคำสั่งซ่อม</MenuItem>
        <MenuItem onClick={handleClose}>ประวัติการซ่อม</MenuItem>
        <MenuItem onClick={handleClose}>
          <Logout />
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default DropdownUser;
