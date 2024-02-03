"use server";

import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";

const cookieStore = cookies();

const supabase = createClient(cookieStore);

export const checkEmailDatabase = async (email) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    if (error) {
      console.error("Error checking email:", error.message);
      return false;
    }
    return data.length > 0;
  } catch (error) {
    console.error("Error checking email:", error.message);
    return false;
  }
};

export const checkPasswordDatabase = async (password) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("password", password);

    if (error) {
      console.error("Error checking password:", error.message);
      return false;
    }

    return data.length > 0;
  } catch (error) {
    console.error("Error checking password:", error.message);
    return false;
  }
};

export const handleLogin = async (formData) => {
  const { email, password } = formData;
  // const email = formData.get("email");
  // const password = formData.get("password");

  const emailInDatabase = await checkEmailDatabase(email);
  console.log("Is email exist:", emailInDatabase);
  if (!emailInDatabase) {
    console.error("User not found");
    return;
  }

  const validationPassword = await checkPasswordDatabase(password);
  console.log("Is password exist:", validationPassword);
  if (!validationPassword) {
    console.error("Invalid password");
    return;
  }

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
