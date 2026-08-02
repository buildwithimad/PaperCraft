"use server";

import { deletePaper } from "@/services/paperServices";
import { createClient } from "@/utils/supabase/server";
import { PaperValues, paperSchema } from "@/validations/paper";
import { revalidatePath } from "next/cache";


export async function savePaperAction(data: PaperValues) {
  try {
    const parsedData = paperSchema.parse(data);
    const supabase = await createClient();

    const { data: insertedData, error } = await supabase
      .from("papers")
      .insert({
        school_name: parsedData.schoolName,
        exam_name: parsedData.examName,
        class_name: parsedData.className,
        subject: parsedData.subject,
        exam_date: parsedData.date,
        time_allowed: parsedData.time || "",
        total_marks: parsedData.totalMarks,
        general_instructions: parsedData.instructions || null,
        
        // The entire object (including the sections) still goes in here
        // so you can easily reload the whole form state later.
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