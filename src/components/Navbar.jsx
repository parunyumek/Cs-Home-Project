"use client";

import * as React from "react";
import Container from "./Container";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { checkUserData } from "@/app/login/checkUserRole";
import { useEffect, useState } from "react";
import DropdownUser from "./DropdownUser";

const Navbar = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [checkedAuthentication, setCheckedAuthentication] = useState(false);

  useEffect(() => {
    if (!checkedAuthentication) {
      const fetchData = async () => {
        const userCookie = getCookie("user");
        if (userCookie) {
          const user = JSON.parse(userCookie);
          const isAuthenticated = checkUserData(user);
          setIsUserAuthenticated(isAuthenticated);
        }
        setCheckedAuthentication(true);
      };

      fetchData();
    }
  }, [checkedAuthentication]);

  return (
    <nav className="flex justify-center w-full bg-white h-[80px]">
      <Container>
        <div className="flex gap-[70px]">
          <button>
            <Link href={"/"} className="flex justify-center items-center gap-2">
              <img src="/assets/icons/house_1.svg" alt="" />
              <div className="text-blue-600 text-2xl font-medium">
                HomeServices
              </div>
            </Link>
          </button>
          <div className="flex items-center justify-center">
            <button className=" w-[114ps] h-[44px] text-black text-base font-bold leading-normal">
              <Link href={"/service"}>บริการของเรา</Link>
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-center text-blue-600 text-base font-medium ">
            {isUserAuthenticated ? (
              <DropdownUser />
            ) : (
              <button className="flex w-[118px] h-10 px-6 py-2 rounded-lg border border-blue-600 justify-start items-center gap-2.5">
                <Link href={"/login"}>เข้าสู่ระบบ</Link>
              </button>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
