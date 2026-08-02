"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
interface PageProps {
  params: Promise<{ lang: "en" | "ur" }>;
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage({ params }: PageProps) {
  const { lang } = use(params);
  const isUrdu = lang === "ur";
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(
          isUrdu ? "ای میل یا پاس ورڈ غلط ہے" : "Invalid email or password"
        );
        setIsSubmitting(false);
        return;
      }

      toast.success(isUrdu ? "کامیابی سے لاگ ان ہو گئے" : "Logged in successfully");
      router.push(`/${lang}/paper`);
      router.refresh();
    } catch (err) {
      toast.error(
        isUrdu ? "غیر متوقع خرابی پیش آئی" : "An unexpected error occurred"
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1200px] items-center justify-center px-4 py-12 sm:px-6"
      dir={isUrdu ? "rtl" : "ltr"}
    >
      <Card className="w-full max-w-sm rounded-lg border shadow-none">
        <CardHeader className="space-y-1.5 text-center">
          <CardTitle className="text-xl font-semibold">
            {isUrdu ? "لاگ ان کریں" : "Log in to your account"}
          </CardTitle>
          <CardDescription>
            {isUrdu
              ? "اپنا ای میل اور پاس ورڈ درج کریں"
              : "Enter your email and password to continue"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                {isUrdu ? "ای میل" : "Email"}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder={isUrdu ? "you@example.com" : "you@example.com"}
                className="rounded-md"
                dir="ltr"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {isUrdu ? "درست ای میل درج کریں" : "Enter a valid email address"}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">
                  {isUrdu ? "پاس ورڈ" : "Password"}{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Link
                  href={`/${lang}/forgot-password`}
                  className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  {isUrdu ? "پاس ورڈ بھول گئے؟" : "Forgot password?"}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="rounded-md"
                dir="ltr"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-destructive">
                  {isUrdu
                    ? "پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے"
                    : "Password must be at least 6 characters"}
                </p>
              )}
            </div>

            <Button
              type="submit"
              loading={isSubmitting}
              loadingText={isUrdu ? "لاگ ان ہو رہا ہے..." : "Logging in..."}
              className="w-full rounded-md"
            >
              {isUrdu ? "لاگ ان کریں" : "Log In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}