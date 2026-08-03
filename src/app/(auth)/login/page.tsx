import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-[420px] space-y-8">
        
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center">
          {/* Removed border, rounded, bg-card, and fixed size classes */}
          <div className="mb-4 flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="PaperCraft Logo" 
              width={80} 
              height={80} 
              priority
              className="object-contain" 
            />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            PaperCraft
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Professional Question Paper Builder
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border bg-card p-6 sm:p-8">
          <div className="mb-6 flex flex-col space-y-2 text-center sm:text-left">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Welcome Back
            </h2>
            <p className="text-sm text-muted-foreground">
              Sign in to continue to PaperCraft.
            </p>
          </div>

          <LoginForm />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          © 2026 PaperCraft
        </p>
        
      </div>
    </main>
  );
}