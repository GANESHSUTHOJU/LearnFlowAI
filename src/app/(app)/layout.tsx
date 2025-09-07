"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar, SidebarItemProps } from "@/components/ui/app-sidebar";
import { LayoutDashboard, Book, BrainCircuit, Bot, FolderKanban } from "lucide-react";
import { Logo } from "@/components/logo";

const sidebarItems: SidebarItemProps[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "skills", label: "Skills", icon: Book, href: "/skills" },
  { id: "roadmap", label: "Roadmap Generator", icon: BrainCircuit, href: "/roadmap" },
  { id: "tutor", label: "AI Tutor", icon: Bot, href: "/tutor" },
  { id: "projects", label: "Projects", icon: FolderKanban, href: "/projects" },
];


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
    if (isClient && !loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router, isClient]);

  if (loading || !user) {
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
