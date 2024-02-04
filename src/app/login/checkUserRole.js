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
      console.log("data :>> ", data);
      const userRole = data.role;

      console.log("userRole :>> ", userRole);

      return userRole;
    }
  } catch (error) {
    console.error("Check user role error:", error.message);
  }
};

export default checkUserRole;
