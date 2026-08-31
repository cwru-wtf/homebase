"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowLeft, LoaderCircle, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Wordmark from "@/components/wordmark";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setAuthError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setAuthError("Those credentials did not match an admin account.");
        toast.error("Invalid credentials. Please try again.");
      } else {
        toast.success("Logged in successfully.");
        router.push("/admin");
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      setAuthError("We could not sign you in right now. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100svh] bg-background text-foreground">
      <a
        href="#login-main"
        className="focus-ring sr-only z-50 rounded-lg bg-primary px-4 py-3 text-primary-foreground focus:fixed focus:left-4 focus:top-4 focus:not-sr-only"
      >
        Skip to content
      </a>
      <div className="mx-auto flex min-h-[100svh] w-full max-w-[1160px] flex-col px-6">
        <header className="screen-line-after flex min-h-20 items-center justify-between gap-4 py-4">
          <Link
            href="/"
            className="focus-ring inline-flex min-h-11 items-center gap-3 rounded-lg text-foreground"
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4 text-muted-foreground"
            />
            <span className="font-brand text-lg font-semibold">
              <Wordmark />
            </span>
          </Link>
          <span className="rounded-md bg-muted px-2 py-1 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Admin access
          </span>
        </header>

        <main
          id="login-main"
          className="flex flex-1 items-center justify-center py-14 md:py-20"
        >
          <section
            aria-labelledby="sign-in-heading"
            className="w-full max-w-md rounded-xl border border-border bg-card p-6 sm:p-8"
          >
            <h1
              id="sign-in-heading"
              className="font-brand text-2xl font-semibold tracking-[-0.02em] text-card-foreground"
            >
              Sign in to admin
            </h1>
            <p className="mt-2 text-body-sm text-muted-foreground">
              Enter your admin credentials to continue.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
              aria-describedby={authError ? "sign-in-error" : undefined}
            >
              {authError ? (
                <p
                  id="sign-in-error"
                  role="alert"
                  className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-body-sm text-destructive"
                >
                  {authError}
                </p>
              ) : null}

              <div>
                <Label htmlFor="email" className="mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setAuthError("");
                  }}
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  placeholder="admin@cwru.wtf"
                  className="h-12"
                />
              </div>

              <div>
                <Label htmlFor="password" className="mb-2">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setAuthError("");
                  }}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                size="xl"
                disabled={isLoading}
                aria-busy={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <LoaderCircle
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin"
                  />
                ) : (
                  <Lock aria-hidden="true" className="h-4 w-4" />
                )}
                {isLoading ? "Signing in…" : "Enter admin dashboard"}
              </Button>
            </form>
          </section>
        </main>

        <footer className="screen-line-before flex flex-col items-center gap-2 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <span className="font-brand text-lg font-semibold text-foreground">
            <Wordmark />
          </span>
          <span className="font-mono text-caption text-muted-foreground">
            We Tinker Fearlessly
          </span>
        </footer>
      </div>
    </div>
  );
}
