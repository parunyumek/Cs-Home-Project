"use client";

import { Prompt } from "next/font/google";
import { useState } from "react";
import { supabase } from "../../supabase";
const prompt = Prompt({
  weight: ["400"],
  subsets: ["latin"],
});

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const { user, error } = await supabase.auth.signUp({
        fullName,
        phoneNumber,
        email,
        password,
      });

      if (error) {
        console.error('Error registering user:', error.message);
      } else {
        console.log('User registered successfully:', user);
        // Additional actions after successful registration
      }
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div
        className={`${prompt.className} flex items-center justify-center   bg-[#f3f4f6]  h-screen `}
      >
        <div className="w-[600px] h-auto pb-10 bg-white rounded-[5px] shadow border border-zinc-300 flex-col justify-center items-center">
          <div className=" ">
            <h1 className="text-blue-600 text-2xl font-medium mb-3 text-center pt-[41px]">
              ลงทะเบียนผู้ใช้ใหม่
            </h1>

            <div className="flex flex-col mb-3">
              <label className="block w-[460px] h-4 text-gray-600 text-lg font-medium mb-6 mx-auto">
                ชื่อ - นามสกุล
              </label>
              <input
                type="text"
                className="w-[460px] h-9 bg-white rounded border border-zinc-400 mx-auto text-black"
                value={fullName}
                id="fullName"
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>

            <div className="flex flex-col mb-3">
              <label className="block w-[460px] h-4 text-gray-600 text-lg font-medium mb-6 mx-auto">
                เบอร์โทรศัพท์
              </label>
              <input
                type="tel"
                pattern="[0-9]*"
                className="w-[460px] h-9 bg-white rounded border border-zinc-400 mx-auto text-black"
                value={phoneNumber}
                id="phoneNumber"
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>

            <div className="flex flex-col mb-3">
              <label className="block w-[460px] h-4 text-gray-600 text-lg font-medium mb-6 mx-auto">
                อีเมล
              </label>
              <input
                type="email"
                className="w-[460px] h-9 bg-white rounded border border-zinc-400 mx-auto text-black"
                value={email}
                id="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="flex flex-col mb-6">
              <label className="block w-[460px] h-4 text-gray-600 text-lg font-medium mb-6 mx-auto">
                รหัสผ่าน
              </label>
              <input
                type="password"
                className="w-[460px] h-9 bg-white rounded border border-zinc-400 mx-auto text-black"
                value={password}
                id="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className=" text-center">
              <div className="mb-5">
                <input
                  type="checkbox"
                  id="checkbox-agreement"
                  name="checkbox-agreement"
                  className="mr-3 w-5 h-5"
                />
                <label htmlFor="checkbox-agreement" className="text-black">
                  คุณได้ยอมรับ ข้อตกลงและเงื่อนไข และ นโยบายความเป็นส่วนตัว
                </label>
              </div>

              <button
                type="submit"
                className="w-[460px] h-10 bg-blue-600 rounded text-white mb-4 mx-auto"
              >
                ลงทะเบียน
              </button>
              <p className="text-blue-500 text-lg font-medium">เข้าสู่ระบบ</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;