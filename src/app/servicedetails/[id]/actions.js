import { supabase } from "../../../../supabase";

export const fetchData = async (id) => {
  console.log("id :>> ", id);
  try {
    const { data: service, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", id)
      .single();

    console.log("service :>> ", service);

    return service;
  } catch (error) {
    console.error("Error checking email:", error.message);
    return false;
  }
};
