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
import NotificationsIcon from "@mui/icons-material/Notifications";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { useRouter } from "next/navigation";


const DropdownUser = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

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

  const handleLinkToHistories = (e) => {
    e.preventDefault();
    router.push("/user/order-histories");
  };

  const handleLinkToOrders = (e) => {
    e.preventDefault();
    router.push("/user/orders");
  };

  useEffect(() => {
    handleGetUserData();
  }, []);

  return (
    <Fragment>
      <div className="flex gap-3">
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ color: "#646C80" }}
        >
          {userData?.fullname}
        </Button>
        <img
          src="\assets\icons\22638092_4500_1_01.svg"
          alt=""
          className=" w-10 h-10 rounded-full"
        />
        <div className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center">
          <NotificationsIcon sx={{ height: "30px", fill: "#9AA1B0" }} />
        </div>
      </div>
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
        <MenuItem
          onClick={handleClose}
          className="flex gap-2"
          sx={{
            color: "#4B5160",
            "&:hover": {
              backgroundColor: "#EFEFF2",
              color: "#232630",
              "& svg": { fill: "#323640" },
            },
          }}
        >
          <PersonOutlineOutlinedIcon sx={{ fill: "#9AA1B0" }} />
          ข้อมูลผู้ใช้งาน
        </MenuItem>
        <MenuItem
          onClick={handleLinkToHistories}
          className="flex gap-2"
          sx={{
            color: "#4B5160",
            "&:hover": {
              backgroundColor: "#EFEFF2",
              color: "#232630",
              "& svg": { fill: "#323640" },
            },
          }}
        >
          <AssignmentOutlinedIcon
            sx={{
              fill: "#9AA1B0",
            }}
          />
          รายการคำสั่งซ่อม
        </MenuItem>
        <MenuItem
          onClick={handleLinkToOrders}
          className="flex gap-2"
          sx={{
            color: "#4B5160",
            "&:hover": {
              backgroundColor: "#EFEFF2",
              color: "#232630",
              "& svg": { fill: "#323640" },
            },
          }}
        >
          <RestoreRoundedIcon sx={{ fill: "#9AA1B0" }} />
          ประวัติการซ่อม
        </MenuItem>
        {userData?.role === "admin" && ( // เพิ่มเงื่อนไขตรวจสอบว่าผู้ใช้เป็น admin หรือไม่
          <MenuItem
            onClick={handleClose}
            className="flex gap-2"
            sx={{
              color: "#4B5160",
              "&:hover": {
                backgroundColor: "#EFEFF2",
                color: "#232630",
                "& svg": { fill: "#323640" },
              },
            }}
          >
            <button
              onClick={() => {
                window.location.href = "/admin/category";
              }}
            >
              <AdminPanelSettingsOutlinedIcon sx={{ fill: "#9AA1B0" }} /> Admin
              Dashboard
            </button>
          </MenuItem>
        )}
        <Divider />
        <MenuItem
          onClick={() => handleLogout()}
          className="flex gap-2"
          sx={{
            color: "#4B5160",
            "&:hover": {
              backgroundColor: "#EFEFF2",
              color: "#232630",
              "& svg": { fill: "#323640" },
            },
          }}
        >
          <LogoutRoundedIcon sx={{ fill: "#9AA1B0" }} />
          ออกจากระบบ
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default DropdownUser;
