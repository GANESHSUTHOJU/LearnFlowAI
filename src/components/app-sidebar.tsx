
"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  GitMerge,
  HelpCircle,
  BookOpen,
  Bot,
  User,
  LogOut,
  Sparkles,
  Settings,
} from "lucide-react";
import Logo from "./logo";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";


const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/roadmap", icon: GitMerge, label: "Roadmap" },
  { href: "/quiz", icon: HelpCircle, label: "Quiz" },
  { href: "/skills", icon: BookOpen, label: "Skills" },
  { href: "/tutor", icon: Bot, label: "Tutor" },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <span className="font-headline text-xl font-bold">LearnFlowAI</span>
          <div className="flex-1" />
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2 flex-1 flex flex-col justify-between">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <a href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div>
           <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Log Out">
                    <LogOut />
                    <span>Log Out</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
           </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Separator className="my-2" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start p-2 h-auto">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.photoURL ?? "https://placehold.co/100x100.png"} alt={user?.displayName ?? "user"} data-ai-hint="user avatar" />
                  <AvatarFallback>{user?.email?.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
                </Avatar>
                <div className="text-left truncate">
                  <p className="text-sm font-medium truncate">{user?.displayName ?? 'User'}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email ?? 'user@email.com'}
                  </p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2" side="top" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
