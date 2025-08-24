
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && !user && isClient) {
      router.push('/login');
    }
  }, [user, loading, router, isClient]);

  if (!isClient || loading || !user) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <div className="w-full max-w-7xl p-8 space-y-4">
                 <div className="flex gap-4">
                    <Skeleton className="h-screen w-16 hidden md:block" />
                    <div className="flex-1 space-y-4">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-8 w-3/4" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Skeleton className="h-48 w-full col-span-1 md:col-span-2" />
                            <Skeleton className="h-48 w-full" />
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Skeleton className="h-64 w-full" />
                            <Skeleton className="h-64 w-full" />
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="app-background flex flex-col min-h-screen">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        <footer className="text-center p-4 text-xs text-muted-foreground">
          © 2025 all rights reserved to Botla Varshini
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
