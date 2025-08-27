
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
import AnimatedError from "@/components/ui/animated-error";
import { Google, Github } from "@/components/icons";
import AuthBackground from "@/components/ui/auth-background";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signup, user, loading, signInWithGoogle, signInWithGitHub } = useAuth();
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
            if (err.code === 'auth/weak-password') {
                 setError('Password is too weak. Please choose a stronger password.');
            } else if (err.code === 'auth/email-already-in-use') {
                setError('This email is already associated with an account.');
            } else if (err.code === 'auth/network-request-failed') {
                setError("A network error occurred. Please check your connection and try again.");
            } else {
                setError(`Could not create an account: ${err.message}`);
            }
        } else {
             setError("An unexpected error occurred. Please try again.");
        }
        setIsLoading(false);
    }
  };
  
    const handleSocialLogin = async (provider: 'google' | 'github') => {
        setIsLoading(true);
        setError(null);
        try {
            if (provider === 'google') {
                await signInWithGoogle();
            } else {
                await signInWithGitHub();
            }
            router.push('/dashboard');
        } catch (err) {
            if (err instanceof FirebaseError) {
                if (err.code === 'auth/account-exists-with-different-credential') {
                    setError('An account already exists with the same email address but different sign-in credentials.');
                } else {
                    setError('Could not sign in. Please try again.');
                }
            } else {
                setError('An unexpected error occurred.');
            }
            setIsLoading(false);
        }
    }


  if (!isClient || loading) {
      return (
          <div className="flex min-h-screen items-center justify-center p-8">
          </div>
      )
  }

  return (
    <div className="signin">
        <AuthBackground />
        <div className="z-10 w-full max-w-md p-4">
            {error ? (
              <AnimatedError message={error} onReset={() => setError(null)} />
            ) : (
                <GlassCard className="animate-float">
                    <form onSubmit={handleSubmit}>
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
                                    disabled={isLoading}
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
                                    disabled={isLoading}
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
                                    disabled={isLoading}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Sign Up
                            </Button>
                        </CardFooter>
                    </form>
                    <div className="p-6 pt-0">
                         <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                             <Button variant="outline" onClick={() => handleSocialLogin('google')} disabled={isLoading}>
                                <Google className="mr-2 h-4 w-4" /> Google
                            </Button>
                            <Button variant="outline" onClick={() => handleSocialLogin('github')} disabled={isLoading}>
                                <Github className="mr-2 h-4 w-4" /> GitHub
                            </Button>
                        </div>
                    </div>
                     <CardFooter className="flex-col gap-4 pt-0">
                         <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary hover:underline">
                                Log In
                            </Link>
                        </p>
                    </CardFooter>
                </GlassCard>
            )}
        </div>
    </div>
  );
}
