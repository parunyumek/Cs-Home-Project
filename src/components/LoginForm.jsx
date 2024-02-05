"use client";
import { useState } from "react";
import {
  handleLogin,
  checkEmailDatabase,
  checkPasswordDatabase,
} from "../app/login/actions";
import Link from "next/link";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const isEmailValid = (email) => {
    // Regular expression pattern for validating email
    const emailFormat =
      /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo|outlook|xyzcompany|icloud|aol)\.(com|co\.th|net|org|edu|gov|mil)$/;

    return emailFormat.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setEmailError("โปรดกรอกอีเมล");
      return;
    }

    if (!email.includes("@")) {
      setEmailError("อีเมลต้องมีเครื่องหมาย @");
      return;
    }

    if (!isEmailValid(email)) {
      setEmailError(
        "รูปแบบอีเมลไม่ถูกต้อง โปรดระบุโดเมนของอีเมลที่ถูกต้อง เช่น (.com .net เป็นต้น)"
      );
      return;
    }

    if (!password) {
      setPasswordError("โปรดกรอกรหัสผ่าน");
      return;
    }

    const emailInDatabase = await checkEmailDatabase(email);
    if (!emailInDatabase) {
      setEmailError("อีเมลไม่ถูกต้องหรือไม่มีอยู่ในระบบ");
      return;
    }

    const isPasswordValid = await checkPasswordDatabase(password);
    if (!isPasswordValid) {
      setPasswordError("รหัสผ่านไม่ถูกต้อง");
      return;
    }

    await handleLogin({ email, password });
  };
  return (
    <div className="w-full flex justify-center h-screen bg-[#f3f4f6]">
      <form
        onSubmit={handleSubmit}
        // action={handleLogin}
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
            className="w-[440px] h-11 px-4 py-2.5 bg-white rounded-lg border border-gray-300 text-black justify-start items-center gap-2.5 inline-flex"
            value={email}
            onChange={handleEmail}
          />
          {emailError && <p className="text-red-500 text-xs">• {emailError}</p>}
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
            className="w-[440px] h-11 px-4 py-2.5 bg-white rounded-lg border border-gray-300 text-black justify-start items-center gap-2.5 inline-flex"
            value={password}
            onChange={handlePassword}
          />
          {passwordError && (
            <p className=" text-red-500 text-xs">• {passwordError}</p>
          )}
        </div>
        <button
          // onClick={handleLogin}
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
