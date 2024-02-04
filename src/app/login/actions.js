"use server";

import { createClient } from "@/supabase/server";
import { cookies } from "next/headers";
import checkUserRole from "./checkUserRole";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

const cookieStore = cookies();

const supabase = createClient(cookieStore);

export const handleLogin = async (formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

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
      console.log("Redirecting to admin page...");

      cookies().set("user", JSON.stringify({ ...user, role: userRole }));

      redirect("/admin-page");
    } else {
      // Redirect or handle non-admin user logic here
      console.log("Redirecting to regular user page...");

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
