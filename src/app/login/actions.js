"use server";

import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";
import checkUserRole from "./checkUserRole";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

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
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const { user } = data;

    if (error) {
      console.error("Login error:", error.message);
      return { error: `Login error: ${error.message}` };
    }

    // console.log("Login success:", user);

    // Check user role after successful login
    const userRole = await checkUserRole(email);

    if (userRole === "admin") {
      // Redirect or handle admin-specific logic here
      cookies().set("user", JSON.stringify({ ...user, role: userRole }));

      redirect("/");
    } else {
      // Redirect or handle non-admin user logic here
      cookies().set("user", JSON.stringify(user));

      redirect("/");
    }

    // return { user, userRole };
  } catch (error) {
    console.error("Login check:", error.message);
    if (isRedirectError(error)) {
      throw error;
    }
  }
};

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    cookies().delete("user");
    redirect("/login");
  }
};

export default handleLogout;
