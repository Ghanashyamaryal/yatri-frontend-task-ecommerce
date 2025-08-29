"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Github, Mail, Sparkles } from "lucide-react";
import Button from "@/components/ui/atoms/Button";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status, router]);

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-[450px] rounded-lg border border-brand-300 bg-brand-50 p-8 shadow-md flex flex-col items-center gap-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-900">
          <Sparkles className="h-7 w-7 text-brand-400" />
        </div>

        <div className="text-center space-y-1">
          <p className="text-2xl font-bold text-gray-900">Welcome Back</p>
          <p className="text-base text-gray-700">
            Sign in to continue your journey
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          <Button
            text="Continue with Google"
            fullWidth
            size="md"
            theme="secondary"
            leftIcon={<Mail className="h-5 w-5" />}
            onClick={() => signIn("google")}
          />

          <Button
            text="Continue with GitHub"
            fullWidth
            size="md"
            theme="secondary"
            leftIcon={<Github className="h-5 w-5" />}
            onClick={() => signIn("github")}
            className="!bg-black !text-white"
          />
        </div>
        <p className="text-sm text-gray-700 text-center mt-2">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-brand-900 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-brand-900 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </main>
  );
}
