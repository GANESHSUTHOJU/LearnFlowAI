
"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/glass-card";
import { Loader2, MailCheck } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/logo";
import { FirebaseError } from "firebase/app";
import AnimatedError from "@/components/ui/animated-error";
import AuthBackground from "@/components/ui/auth-background";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { sendPasswordResetEmail } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      await sendPasswordResetEmail(email);
      setIsSuccess(true);
    } catch (err) {
      if (err instanceof FirebaseError) {
          if (err.code === 'auth/user-not-found') {
              setError("No account found with this email address.");
          } else if (err.code === 'auth/network-request-failed') {
              setError("A network error occurred. Please check your connection and try again.");
          } else {
              setError("An unexpected error occurred. Please try again.");
          }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="signin">
        <AuthBackground />
        <div className="z-10 w-full max-w-md p-4">
             {error ? (
              <AnimatedError message={error} onReset={() => setError(null)} />
            ) : isSuccess ? (
                <GlassCard>
                     <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                        <div className="p-3 bg-green-500/20 rounded-full text-green-400 mb-4">
                            <MailCheck className="w-12 h-12" />
                        </div>
                        <h3 className="text-xl font-headline font-bold">Check Your Email</h3>
                        <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
                            We've sent a password reset link to <span className="font-bold text-primary">{email}</span>. Please check your inbox (and spam folder) to continue.
                        </p>
                        <Button asChild>
                            <Link href="/login">Back to Log In</Link>
                        </Button>
                    </CardContent>
                </GlassCard>
            ) : (
                <form onSubmit={handleSubmit}>
                    <GlassCard className="animate-float">
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">
                                <Logo className="w-12 h-12 text-primary" />
                            </div>
                            <CardTitle>Forgot Password?</CardTitle>
                            <CardDescription>No problem! Enter your email and we'll send you a reset link.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Send Reset Link
                            </Button>
                             <p className="text-sm text-muted-foreground">
                                Remember your password?{" "}
                                <Link href="/login" className="text-primary hover:underline">
                                    Log In
                                </Link>
                            </p>
                        </CardFooter>
                    </GlassCard>
                </form>
            )}
        </div>
    </div>
  );
}
