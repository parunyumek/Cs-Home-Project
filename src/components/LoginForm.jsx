"use client";

import { useState, useEffect } from "react";
import { handleLogin } from "../app/login/action";
import Link from "next/link";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full flex justify-center h-screen">
      <form
        action={handleLogin}
        className=" w-[614px] h-[600px] relative bg-white rounded-lg border border-gray-300 flex-col justify-start items-center inline-flex mt-14 "
      >
        <div className="text-center text-blue-950 text-[32px] mt-8">
          เข้าสู่ระบบ
        </div>
        <div className=" w-[440px] h-[72px] flex-col justify-start items-start gap-1 inline-flex mt-4">
          <label
            htmlFor="email"
            className="text-zinc-700 text-base font-medium leading-normal"
          >
            อีเมล
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="กรุณากรอกอีเมล"
            className="w-[440px] h-11 px-4 py-2.5 bg-white rounded-lg border border-gray-300 justify-start items-center gap-2.5 inline-flex"
          />
        </div>
        <div className="w-[440px] h-[72px] flex-col justify-start items-start gap-1 inline-flex mt-5 ">
          <label className="text-zinc-700 text-base font-medium leading-normal">
            รหัสผ่าน
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="กรุณากรอกรหัสผ่าน"
            className="w-[440px] h-11 px-4 py-2.5 bg-white rounded-lg border border-gray-300 justify-start items-center gap-2.5 inline-flex"
          />
        </div>
        <button
          type="submit"
          className="w-[440px] h-11 px-6 py-2.5 bg-blue-600 rounded-lg mt-11 text-center text-white text-base font-medium leading-normal"
        >
          เข้าสู่ระบบ
        </button>
        <div className=" w-[440px] h-[21px] flex-row justify-center items-center gap-2 inline-flex mt-8 ">
          <span>
            <hr className=" border-l-[150px] bg-gray-400 " />
          </span>
          <span>
            <div className=" text-gray-500 text-sm">หรือลงชื่อเข้าใช้ผ่าน</div>
          </span>
          <span>
            <hr className=" border-l-[150px] bg-gray-400 " />
          </span>
        </div>
        {/* <button className="w-[440px] h-11 px-6 py-2.5 rounded-lg border border-blue-600 text-blue-600 mt-8 ">
เข้าสู่ระบบด้วย Facebook
</button> */}
        <div className="mt-12 ">
          <span className="text-gray-500">
            ยังไม่มีบัญชีผู้ใช้ HomeService?
          </span>
          <span> </span>
          <Link
            href={"register"}
            className=" text-blue-600 underline underline-offset-2"
          >
            ลงทะเบียน
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
