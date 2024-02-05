"use server";

import { supabase } from "../path/to/supabase";

const handleLogout = async () => {
  const res = await supabase.auth.signOut();
};

export default handleLogout;
