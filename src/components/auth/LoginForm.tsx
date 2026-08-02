"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { loginAction } from "@/actions/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginValues) {
    startTransition(async () => {
      const result = await loginAction(values);

      if (!result.success) {
        toast.error(result.error ?? "Invalid email or password.");

        return;
      }

      toast.success("Welcome back!");

      router.replace("/en");

      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Email */}

      <div className="space-y-2">
        <Label htmlFor="email">
          Email Address
        </Label>

        <Input
          id="email"
          type="email"
          placeholder="teacher@school.com"
          autoComplete="email"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}

      <div className="space-y-2">
        <Label htmlFor="password">
          Password
        </Label>

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            {...register("password")}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit */}

      <Button
        type="submit"
        className="w-full"
        loading={isPending}
        loadingText="Signing in..."
      >
        {!isPending && "Login"}
      </Button>
    </form>
  );
}