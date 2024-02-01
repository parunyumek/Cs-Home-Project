"use client";

import { Prompt } from "next/font/google";
import { useState } from "react";
import { supabase } from "../../supabase";
import Link from "next/link";

const prompt = Prompt({
  weight: ["400"],
  subsets: ["latin"],
});

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setHasError(false); // Reset error state when the user makes changes

    // Check for your error condition, for example, if the input is empty
    if (value.trim() === "") {
      setHasError(true);
    }

    // Rest of your handleChange code
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      // ตรวจสอบข้อมูลในแบบฟอร์ม

      const { data } = await supabase.auth.signUp({
        displayName: fullName,
        phone: phoneNumber,
        email,
        password,
      });

      if (data.error) {
        console.error("Error registering user:", res.error.message);
      } else {
        // ลงทะเบียนผู้ใช้สำเร็จ
        console.log("User registered successfully.");

        // ใช้ 'user' จาก authentication ไปบันทึกในตาราง 'users'

        if (data.user.id) {
          const res = await supabase.from("users").insert([
            {
              fullname: fullName,
              phone_no: phoneNumber,
              email,
              password,
              created_at: new Date(),
              auth_id: data.user.id,
            },
          ]);

          console.log("res :>> ", res);
        }

        // if (error) {
        //   console.error("Error adding user data to table:", error.message);
        // } else {
        //   console.log("User data added to table successfully:", data);
        // }
      }
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div
        className={`${prompt.className} flex items-center justify-center   bg-[#f3f4f6]  h-screen `}
      >
        <div className=" w-[600px] h-auto pb-10 bg-white rounded-[5px] shadow border border-zinc-300 flex-col justify-center items-center">
          <div className=" ">
            <h1 className="text-blue-600 text-2xl font-medium mb-3 text-center pt-[41px]">
              ลงทะเบียนผู้ใช้ใหม่
            </h1>

            <div className="flex flex-col mb-3">
              <label
                htmlFor="fullName"
                className="block w-[460px] h-4 text-gray-600 text-lg font-medium mb-6 mx-auto"
              >
                ชื่อ - นามสกุล
              </label>
              <input
                type="text"
                className={`w-[460px] h-11 px-4 py-[10px] bg-white rounded border ${
                  hasError ? "border-rose-700" : "border-zinc-400"
                } mx-auto text-black`}
                placeholder=" กรุณากรอกชื่อ นามสกุล"
                required
                value={fullName}
                id="fullName"
                onChange={(event) => {
                  handleChange(event);
                  setFullName(event.target.value);
                }}
              />
            </div>

            <div className="flex flex-col mb-3">
              <label
                htmlFor="phoneNumber"
                className="block w-[460px] h-4 text-gray-600 text-lg font-medium mb-6 mx-auto"
              >
                เบอร์โทรศัพท์
              </label>
              <input
                type="tel"
                pattern="[0-9]*"
                className="w-[460px] h-11 px-4 py-[10px] bg-white rounded border border-zinc-400 mx-auto text-black"
                placeholder=" กรุณากรอกเบอร์โทรศัพท์"
                required
                value={phoneNumber}
                id="phoneNumber"
                onChange={(event) => {
                  handleChange(event);
                  setPhoneNumber(event.target.value);
                }}
              />
            </div>

            <div className="flex flex-col mb-3">
              <label
                htmlFor="email"
                className="block w-[460px] h-4 text-gray-600 text-lg font-medium mb-6 mx-auto"
              >
                อีเมล
              </label>
              <input
                type="email"
                className="w-[460px] h-11 px-4 py-[10px] bg-white rounded border border-zinc-400 mx-auto text-black"
                placeholder=" กรุณากรอกอีเมล"
                required
                value={email}
                id="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="flex flex-col mb-6">
              <label
                htmlFor="password"
                className="block w-[460px] h-4 text-gray-600 text-lg font-medium mb-6 mx-auto"
              >
                รหัสผ่าน
              </label>
              <input
                type="password"
                className="w-[460px] h-11 px-4 py-[10px] bg-white rounded border border-zinc-400 mx-auto text-black"
                placeholder=" กรุณากรอกรหัสผ่าน"
                required
                value={password}
                id="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className=" text-center">
              <div className="mb-5 flex justify-center">
                <input
                  type="checkbox"
                  id="checkbox-agreement"
                  name="checkbox-agreement"
                  className="mr-3 w-5 h-5"
                />
                <label
                  htmlFor="checkbox-agreement"
                  className="text-black text-sm "
                >
                  คุณได้ยอมรับ{" "}
                  <a
                    href="https://example.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600 "
                  >
                    ข้อตกลงและเงื่อนไข
                  </a>{" "}
                  และ{" "}
                  <a
                    href="https://example.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" underline text-blue-600"
                  >
                    และนโยบายความเป็นส่วนตัว
                  </a>
                </label>
              </div>
              <div className="flex flex-col">
                <button
                  type="submit"
                  className="w-[460px] h-10 bg-blue-600 rounded text-white mb-4 mx-auto"
                >
                  ลงทะเบียน
                </button>

                <p className="text-blue-600 text-base font-semibold underline leading-normal">
                  <Link href={"/login"}>กลับไปหน้าเข้าสู่ระบบ</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
