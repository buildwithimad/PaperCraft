"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

interface LoginInput {
  email: string;
  password: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
}

export async function loginAction({
  email,
  password,
}: LoginInput): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
  };
}

export async function logoutAction() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}

export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return user;
}