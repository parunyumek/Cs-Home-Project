"use server";

import { supabase } from "../../../supabase";

// ฟังก์ชันเพื่อทำการตรวจสอบ Role ของผู้ใช้
const checkUserRole = async (email) => {
  try {
    // ทำการ Query ข้อมูลผู้ใช้ที่มีอีเมลเท่ากับ email
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      console.error("Database query error:", error.message);
    }

    if (data) {
      const userRole = data.role;

      console.log("userRole :>> ", userRole);

      return userRole;
    }
  } catch (error) {
    console.error("Check user role error:", error.message);
  }
};

export const checkUserData = async (email) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      console.error("Database query error:", error.message);
    }

    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Check user data error:", error.message);
  }
};

export const checkTagSelect = async (list) => {
  try {
    const { data, error } = await supabase
      .from("mock_service")
      .select("*")
      .eq("list", list)
      .single();

    if (error) {
      console.error("Database query error:", error.message);
    }

    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Check user data error:", error.message);
  }
};

export default checkUserRole;
