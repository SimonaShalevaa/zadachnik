import { supabase } from "../supabase";

export async function getProfile(id) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).maybeSingle();

  if (error) {
    throw new Error("Профилът не можа да се зареди.");
  }
  return data;
}

export async function getTopProfiles() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, grade, points")
    .order("points", { ascending: false })
    .limit(20);

  if (error) {
    throw new Error("Класацията не можа да се зареди.");
  }
  return data;
}
