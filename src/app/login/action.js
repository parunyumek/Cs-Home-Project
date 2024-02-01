"use server";

import { createClient } from "@/supabase/server";
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

    console.log("user :>> ", data.user);

    if (data.user) {
      console.log("Login success:", data.user);
    }
  } catch (error) {
    console.error("Login error:", error.message);
  }
};
