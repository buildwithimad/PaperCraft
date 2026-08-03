import { requireApiUser } from "@/services/authService";
import { PaperValues } from "@/validations/paper";

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


export async function getPaperById(id: string) {
  const { supabase, user } = await requireApiUser();

  const { data, error } = await supabase
    .from("papers")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch paper.");
  }

  return data;
}

export async function updatePaper(id: string, data: PaperValues) {
  const { supabase, user } = await requireApiUser();

  const { error } = await supabase
    .from("papers")
    .update({
      school_name: data.schoolName,
      exam_name: data.examName,
      class_name: data.className,
      subject: data.subject,
      exam_date: data.date,
      time_allowed: data.time || "",
      total_marks: data.totalMarks,
      general_instructions: data.instructions || null,
      paper_data: data,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error(error);
    throw new Error("Failed to update paper.");
  }

  return true;
}
