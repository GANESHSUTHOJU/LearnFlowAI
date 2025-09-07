"use client";

import {
  ChevronsLeft,
  Menu,
  PlusCircle,
  Search,
  Settings,
  Trash,
  LogOut,
} from "lucide-react";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { getAuth, signOut, User } from "firebase/auth";
import { app } from "@/lib/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { toast } from "sonner";
import { Logo } from "../logo";

export interface SidebarProps {
  items: SidebarItemProps[];
  user: User | null;
}

export interface SidebarItemProps {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps & { isCollapsed: boolean }> = ({
  id,
  label,
  icon: Icon,
  href,
  onClick,
  isCollapsed,
}) => {
  const path = usePathname();
  const isActive = path === href;
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    } else if (href) {
      router.push(href);
    }
  };

  return (
    <a
      href={href || "#"}
      onClick={handleClick}
      className={cn(
        "flex items-center w-full text-sm font-medium p-2 rounded-lg transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "hover:bg-primary/5 text-muted-foreground",
        isCollapsed ? "justify-center" : "justify-start"
      )}
    >
      <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
      {!isCollapsed && <span className="truncate">{label}</span>}
    </a>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ items, user }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [isResetting, setIsResetting] = useState(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const router = useRouter();

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setIsResetting(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    let newWidth = event.clientX;
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    setIsResetting(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty("width", isMobile ? "100%" : "calc(100% - 240px)");
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "0" : "68px";
      navbarRef.current.style.setProperty("width", isMobile ? "100%" : "calc(100% - 68px)");
      navbarRef.current.style.setProperty("left", isMobile ? "0" : "68px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };
  
  const toggleCollapse = isCollapsed ? resetWidth : collapse;

  const handleSignOut = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      toast.success("Signed out successfully.");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to sign out.");
      console.error("Sign out error:", error);
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary/70 backdrop-blur-sm overflow-y-auto relative flex flex-col z-50 border-r",
          !isResetting && "transition-all ease-in-out duration-300",
          isCollapsed ? "w-[68px]" : "w-60"
        )}
      >
        <div className="flex flex-col h-full">
          <div className={cn("p-4 flex items-center", isCollapsed ? 'justify-center' : 'justify-between')}>
            {!isCollapsed && <Logo />}
            <Button
              onClick={toggleCollapse}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              {isCollapsed ? (
                <Menu className="h-5 w-5" />
              ) : (
                <ChevronsLeft className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex-1 p-2 space-y-2">
            {items.map((item) => (
              <SidebarItem key={item.id} {...item} isCollapsed={isCollapsed} />
            ))}
          </div>

          <div className="p-2 border-t">
            <Popover>
              <PopoverTrigger className="w-full">
                <div
                  className={cn(
                    "flex items-center w-full p-2 rounded-lg hover:bg-primary/5",
                    isCollapsed && "justify-center"
                  )}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photoURL || undefined} />
                    <AvatarFallback>
                      {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <div className="ml-3 text-left flex-grow truncate">
                      <p className="text-sm font-semibold truncate">
                        {user?.displayName || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                    </div>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="start" side="right">
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {}}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {!isMobile && (
          <div
            onMouseDown={handleMouseDown}
            onClick={resetWidth}
            className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
          />
        )}
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-40",
          !isResetting && "transition-all ease-in-out duration-300",
          isCollapsed ? "left-[68px] w-[calc(100%-68px)]" : "left-60 w-[calc(100%-240px)]"
        )}
      >
        {isMobile && (
          <nav className="p-2">
            <Button variant="ghost" size="icon" onClick={resetWidth}>
              <Menu className="h-6 w-6 text-muted-foreground" />
            </Button>
          </nav>
        )}
      </div>
    </>
  );
};
