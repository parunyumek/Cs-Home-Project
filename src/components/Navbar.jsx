"use client";

import * as React from "react";
import Container from "./Container";
import Link from "next/link";
import { getUser } from "@/app/login/action";
import { useEffect, useState } from "react";
import { logoutUser } from "@/app/login/action";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [hasToken, setHasToken] = useState(false);
  const [dataUser, setDataUser] = useState("");

  const router = useRouter();

  const handleGetUser = async () => {
    const result = await getUser();
    setDataUser(result);
    if (result) {
      setHasToken(true);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

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
              บริการของเรา
            </button>
          </div>
        </div>
        <div className="flex items-center">
          {hasToken ? (
            <div className="flex items-center">
              <span className="mr-3">{dataUser?.fullname}</span>
              <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full hover:cursor-pointer">
                <img
                  onClick={() => handleLogout()}
                  src="/assets/icons/icon-user.png"
                />
              </div>
            </div>
          ) : (
            <button className="text-center text-blue-600 text-base font-medium flex w-[118px] h-10 px-6 py-2 rounded-lg border border-blue-600 justify-start items-center gap-2.5">
              <Link href={"/login"}>เข้าสู่ระบบ</Link>
            </button>
          )}
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
