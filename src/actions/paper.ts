"use server";

import { deletePaper, updatePaper } from "@/services/paperServices";
import { createClient } from "@/utils/supabase/server";
import { PaperValues, paperSchema } from "@/validations/paper";
import { revalidatePath } from "next/cache";


export async function savePaperAction(data: PaperValues) {
  try {
    const parsedData = paperSchema.parse(data);
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { data: insertedData, error } = await supabase
      .from("papers")
      .insert({
        user_id: user.id,
        school_name: parsedData.schoolName,
        exam_name: parsedData.examName,
        class_name: parsedData.className,
        subject: parsedData.subject,
        exam_date: parsedData.date,
        time_allowed: parsedData.time || "",
        total_marks: parsedData.totalMarks,
        general_instructions: parsedData.instructions || null,
        paper_data: parsedData,
      })
      .select("id")
      .single();

    if (error) throw error;

    return { success: true, paperId: insertedData.id };
  } catch (error) {
    console.error("Error saving paper:", error);
    return { success: false, error: "Failed to save paper." };
  }
}



export async function deletePaperAction(
  id: string,
  lang: "en" | "ur"
) {
  try {
    await deletePaper(id);

    revalidatePath(`/${lang}/papers`);
    revalidatePath(`/${lang}`);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete paper.",
    };
  }
}

export async function updatePaperAction(id: string, data: PaperValues) {
  try {
    const parsedData = paperSchema.parse(data);
    await updatePaper(id, parsedData);

    revalidatePath("/en/papers");
    revalidatePath("/ur/papers");
    revalidatePath(`/en/paper/${id}`);
    revalidatePath(`/ur/paper/${id}`);

    return { success: true, paperId: id };
  } catch (error) {
    console.error("Error updating paper:", error);
    return { success: false, error: "Failed to update paper." };
  }
}