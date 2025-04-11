import React, { useEffect } from "react";

import logo from "~/assets/logo-128.png";
import { useBlockedWebsiteModalStore } from "~/components/modals/blocked-website-modal.store";
import ThemeSwitcher from "~/components/theme-switcher";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import {
  CommandIcon,
  HelpIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  UserCircleSparkleIcon,
} from "~/shared/icons";

import type { View } from "./options.store";

import { useOptionsStore } from "./options.store";
import HomeView from "./views/home";
import SettingsView from "./views/settings";

export default function Options() {
  return (
    <div>
      <div className="grid grid-cols-[280px_1fr] h-screen">
        <Sidebar />
        <Main />
      </div>
      <BlockedWebsiteModalHandler />
    </div>
  );
}

function Sidebar() {
  const { view, setView } = useOptionsStore();

  return (
    <aside className="flex flex-col gap-4 p-4 bg-slate-50 border-r h-full dark:bg-neutral-900">
      <div id="sidebar-header" className="flex items-center justify-between">
        <img src={logo} className="h-8 w-8 rounded-xl" alt="logo" />
        <div>
          <ThemeSwitcher />
        </div>
      </div>
      <SidebarSearch />
      <div className="flex flex-col gap-1">
        <SidebarItem
          title="Home"
          icon={<HomeIcon />}
          onClick={() => setView("home")}
          isActive={view === "home"}
        />
        <SidebarItem
          title="Settings"
          icon={<SettingsIcon />}
          onClick={() => setView("settings")}
          isActive={view === "settings"}
        />
      </div>
      <footer
        id="sidebar-footer"
        className="mt-auto w-full flex flex-col gap-2"
      >
        <div className="flex flex-col gap-1">
          <SidebarItem
            title="Invite Friends"
            icon={<UserCircleSparkleIcon />}
            onClick={() => {}}
            isActive={false}
          />
          <SidebarItem
            title="Help"
            icon={<HelpIcon />}
            onClick={() => {}}
            isActive={false}
          />
        </div>
        <SidebarFooter />
      </footer>
    </aside>
  );
}

function SidebarSearch({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-background outline-none rounded-full h-10 border pl-8 pr-9"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
        <CommandIcon className="text-muted-foreground size-3" />
        <span className="text-muted-foreground text-xs">K</span>
      </span>
    </div>
  );
}

function SidebarItem({
  title,
  icon,
  onClick,
  isActive,
}: {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 py-2 px-2 hover:bg-slate-200 dark:hover:bg-neutral-800 rounded-xl [&_svg]:size-5 duration-200 w-full",
        isActive && "bg-slate-200 dark:bg-neutral-800",
      )}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
}

function SidebarFooter() {
  return (
    <div
      id="sidebar-footer-pro"
      className="bg-white dark:bg-neutral-800 rounded-xl p-4 flex flex-col gap-2 border-2"
    >
      <div className="flex flex-col gap-1">
        <h4 className="text-base font-semibold">Hey Buddy 👋</h4>
        <p className="text-sm text-muted-foreground">
          Get the pro version of the app to unlock all features
        </p>
      </div>
      <Button variant="brand" size="sm" className="w-full rounded-full">
        Upgrade to Pro
      </Button>
    </div>
  );
}

function Main() {
  const { view } = useOptionsStore();

  const viewsMap: Record<View, React.ReactNode> = {
    home: <HomeView />,
    settings: <SettingsView />,
  };

  return <main>{viewsMap[view]}</main>;
}

function BlockedWebsiteModalHandler() {
  const { data, isOpen, open } = useBlockedWebsiteModalStore();

  React.useEffect(() => {
    // Check for URL parameters when component mounts
    const params = new URLSearchParams(window.location.search);
    const blockedSite = params.get("blockedSite");

    if (blockedSite && !isOpen) {
      open({ url: blockedSite });
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      console.log(data);
    }
  }, [isOpen, data]);

  return null;
}
