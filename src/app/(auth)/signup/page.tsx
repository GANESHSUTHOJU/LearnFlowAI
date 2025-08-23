
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/glass-card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/logo";
import { FirebaseError } from "firebase/app";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signup, user, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters long, and include at least one uppercase letter, one lowercase letter, and one special symbol.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await signup(email, password);
      router.push("/dashboard");
    } catch (err) {
        if (err instanceof FirebaseError) {
            // Display a more specific error message from Firebase
            if (err.code === 'auth/weak-password') {
                 setError('Password is too weak. Please choose a stronger password.');
            } else if (err.code === 'auth/email-already-in-use') {
                setError('This email is already associated with an account.');
            } else {
                setError(`Could not create an account: ${err.message}`);
            }
        } else {
             setError("An unexpected error occurred. Please try again.");
        }
        setIsLoading(false);
    }
  };

  if (!isClient || loading) {
      return (
          <div className="flex min-h-screen items-center justify-center p-8 bg-background relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent to-70% -z-0"></div>
          </div>
      )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-8 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent to-70% -z-0"></div>
        <div className="z-10 w-full max-w-md">
            <form onSubmit={handleSubmit}>
                <GlassCard className="animate-float">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <Logo className="w-12 h-12 text-primary" />
                        </div>
                        <CardTitle>Create an Account</CardTitle>
                        <CardDescription>Start your personalized learning path today.</CardDescription>
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
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign Up
                        </Button>
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary hover:underline">
                                Log In
                            </Link>
                        </p>
                    </CardFooter>
                </GlassCard>
            </form>
        </div>
    </div>
  );
}
