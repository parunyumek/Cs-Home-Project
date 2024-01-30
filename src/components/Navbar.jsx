import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Container from "./Container";

const Navbar = () => {
  return (
    <nav className="flex justify-center w-full bg-white h-[80px]">
      <Container>
        <div className="flex gap-[70px]">
          <div className="flex justify-center items-center gap-2">
            <img src="/assets/icons/house_1.svg" alt="" />
            <div className="text-blue-600 text-2xl font-medium">
              HomeServices
            </div>
          </div>
          <button className="text-black text-base font-bold leading-normal">
            บริการของเรา
          </button>
        </div>
        <div className="flex items-center">
          <button className="flex w-[118px] h-10 px-6 py-2 rounded-lg border border-blue-600 justify-start items-center gap-2.5">
            <div className="text-center text-blue-600 text-base font-medium ">
              เข้าสู่ระบบ
            </div>
          </button>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
