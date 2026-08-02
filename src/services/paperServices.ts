import { requireApiUser } from "@/services/authService";

export async function getAllPapers() {
  const { supabase, user } = await requireApiUser();

  const { data, error } = await supabase
    .from("papers")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch papers.");
  }

  return data;
}

export async function deletePaper(id: string) {
  const { supabase, user } = await requireApiUser();

  const { error } = await supabase
    .from("papers")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete paper.");
  }

  return true;
}