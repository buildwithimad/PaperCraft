import LoginForm from "@/components/auth/LoginForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BookOpenText } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4 py-12 sm:px-6 lg:px-8">
      {/* Decorative subtle background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

      <div className="w-full max-w-md space-y-6">
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border bg-background shadow-xs text-primary">
            <BookOpenText className="size-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            PaperCraft
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Professional Question Paper Builder
          </p>
        </div>

        {/* Login Card */}
        <Card className="border bg-card/50 backdrop-blur-xs shadow-sm">
          <CardHeader className="space-y-1 text-center sm:text-left">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} PaperCraft. All rights reserved.
        </p>
      </div>
    </main>
  );
}