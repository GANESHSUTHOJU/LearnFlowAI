
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar, SidebarItemProps } from "@/components/ui/app-sidebar";
import { LayoutDashboard, Book, BrainCircuit, Bot, FolderKanban, FileQuestion } from "lucide-react";
import { Logo } from "@/components/logo";
import { useProgressStore } from "@/store/progress-store";

const sidebarItems: SidebarItemProps[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "skills", label: "Skills", icon: Book, href: "/skills" },
  { id: "roadmap", label: "Roadmap Generator", icon: BrainCircuit, href: "/roadmap" },
  { id: "tutor", label: "AI Tutor", icon: Bot, href: "/tutor" },
  { id: "projects", label: "Projects", icon: FolderKanban, href: "/projects" },
  { id: "quiz", label: "Quiz", icon: FileQuestion, href: "/quiz" },
];


export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading: authLoading } = useAuth();
  const { listenForProgress } = useProgressStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState<(() => void) | null>(null);


  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router, isClient]);

  useEffect(() => {
    if (user && !unsubscribe) {
      const unsub = listenForProgress(user.uid);
      setUnsubscribe(() => unsub);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, listenForProgress, unsubscribe]);


  if (authLoading || !user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Logo className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar items={sidebarItems} user={user} />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-4 md:p-8">
            {children}
        </div>
      </main>
    </div>
  );
}
