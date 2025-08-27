
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/glass-card";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/logo";
import { FirebaseError } from "firebase/app";
import AnimatedError from "@/components/ui/animated-error";
import { Separator } from "@/components/ui/separator";
import { Github, Google } from "@/components/icons";
import AuthBackground from "@/components/ui/auth-background";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, user, loading, signInWithGoogle, signInWithGitHub } = useAuth();
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
    setIsLoading(true);
    setError(null);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof FirebaseError) {
          if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
              setError("Invalid email or password. Please try again.");
          } else if (err.code === 'auth/network-request-failed') {
              setError("A network error occurred. Please check your connection and try again.");
          } else {
              setError("An unexpected error occurred. Please try again.");
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
                            <CardTitle>Welcome Back</CardTitle>
                            <CardDescription>Sign in to continue your learning journey.</CardDescription>
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
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="/forgot-password" passHref className="text-xs text-primary hover:underline">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="pr-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-1/2 right-0 -translate-y-1/2 h-full px-3 text-muted-foreground hover:text-foreground"
                                        onClick={() => setShowPassword(prev => !prev)}
                                        disabled={isLoading}
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Log In
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
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-primary hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </CardFooter>
                </GlassCard>
            )}
        </div>
    </div>
  );
}
