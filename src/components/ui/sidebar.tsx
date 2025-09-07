'use client';
import {
  ChevronsLeft,
  ChevronsRight,
  Menu,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from 'lucide-react';
import React, { ElementRef, useEffect, useRef, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export interface SidebarProps {
  items: SidebarItemProps[];
  user?: {
    name: string;
    email: string;
    avatarUrl: string;
  };
  onCreate?: () => void;
  onSearch?: (query: string) => void;
  onSettings?: () => void;
  onTrash?: () => void;
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

  return (
    <Button
      variant={isActive ? 'secondary' : 'ghost'}
      className="w-full justify-start h-auto py-2 px-3"
      asChild={!onClick}
      onClick={onClick}
    >
      <a href={href}>
        <Icon className="h-5 w-5 mr-3" />
        {!isCollapsed && <span className="truncate">{label}</span>}
      </a>
    </Button>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  user,
  onCreate,
  onSearch,
  onSettings,
  onTrash,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [isResetting, setIsResetting] = useState(false);
  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    let newWidth = event.clientX;
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty('left', `${newWidth}px`);
      navbarRef.current.style.setProperty(
        'width',
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : '240px';
      navbarRef.current.style.setProperty(
        'width',
        isMobile ? '100%' : 'calc(100% - 240px)'
      );
      navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = '0';
      navbarRef.current.style.setProperty('width', '100%');
      navbarRef.current.style.setProperty('left', '0');
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[49]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'w-0'
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            'h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',
            isMobile && 'opacity-100'
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          {user && (
            <div className="flex items-center p-3">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-8 h-8 rounded-full mr-3"
              />
              {!isCollapsed && (
                <div className="flex-grow">
                  <p className="font-semibold text-sm truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-4">
          <div className="px-3">
            <div className="relative">
              <Search className="absolute h-5 w-5 top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            {onCreate && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start mt-2"
                onClick={onCreate}
              >
                <PlusCircle className="h-5 w-5 mr-3" />
                {!isCollapsed && 'New Item'}
              </Button>
            )}
          </div>
          <div className="mt-4 px-3 space-y-1">
            {items.map((item) => (
              <SidebarItem key={item.id} {...item} isCollapsed={isCollapsed} />
            ))}
            {onSettings && (
              <SidebarItem
                id="settings"
                label="Settings"
                icon={Settings}
                onClick={onSettings}
                isCollapsed={isCollapsed}
              />
            )}
            {onTrash && (
              <Popover>
                <PopoverTrigger className="w-full">
                  <SidebarItem
                    id="trash"
                    label="Trash"
                    icon={Trash}
                    onClick={() => {}}
                    isCollapsed={isCollapsed}
                  />
                </PopoverTrigger>
                <PopoverContent
                  className="p-0 w-72"
                  side={isMobile ? 'bottom' : 'right'}
                >
                  <div className="p-2">
                    <p className="text-sm text-muted-foreground">Trash is empty</p>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          'absolute top-0 z-[49] left-60 w-[calc(100%-240px)]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'left-0 w-full'
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <Menu
              onClick={resetWidth}
              role="button"
              className="h-6 w-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  );
};
