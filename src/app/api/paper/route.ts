import { NextResponse } from "next/server";

import { requireApiUser, UnauthorizedError } from "@/services/authService";
import { paperSchema } from "@/validations/paper";

export async function POST(request: Request) {
  try {
    const { supabase, user } = await requireApiUser();

    // Parse request body
    const body = await request.json();

    // Validate request
    const validation = paperSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid paper data.",
          details: validation.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const paperData = validation.data;

    // Save paper
    const { data, error } = await supabase
      .from("papers")
      .insert({
        user_id: user.id,

        school_name: paperData.schoolName,
        exam_name: paperData.examName,
        class_name: paperData.className,
        subject: paperData.subject,
        exam_date: paperData.date,
        time_allowed: paperData.time || "N/A",
        total_marks: paperData.totalMarks,
        general_instructions:
          paperData.instructions || null,

        paper_data: paperData,
      })
      .select("id")
      .single();

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          error: "Failed to save paper.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        paperId: data.id,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}