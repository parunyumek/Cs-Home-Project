"use server";

import { createClient } from "@/supabase/server";
import { data } from "autoprefixer";
import { cookies } from "next/headers";

const cookieStore = cookies();

const supabase = createClient(cookieStore);

export const handleLogin = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // console.log("user :>> ", data.user);

    if (data.user) {
      console.log("Login success:", data.user);
    }
  } catch (error) {
    console.error("Login error:", error.message);
  }
};

export const getUser = async () => {
  try {
    //จะ get user ใน table user (ใน auth)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // เราต้องการข้อมูล users ที่อยู่ใน table users (ใน public) ออกมา จึงต้อง
    // นำ email ใน table auth มาหา ใน table public
    const { data: users } = await supabase
      .from("users")
      .select("*")
      .eq("email", user?.email);

    return users[0];
  } catch (error) {
    console.log("Get user error", error.message);
  }
};

export const logoutUser = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.log("Logout error", error.message);
  }
};
