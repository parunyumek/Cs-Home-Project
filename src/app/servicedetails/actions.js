import { supabase } from "../../../supabase";

export const fetchData = async (id) => {
  try {
    const { data: services, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", 140)
      .single();

    return services;
  } catch (error) {
    console.error("Error checking email:", error.message);
    return false;
  }
};

export const fetchAddress = async () => {
  try {
    const { data: tambons, error } = await supabase.from("tambons").select("*");

    return tambons;
  } catch (error) {
    console.error("Error checking email:", error.message);
    return false;
  }
};
