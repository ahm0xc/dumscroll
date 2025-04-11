import React from "react";

import type { BlockedWebsite } from "~/shared/config";
import type { Schedule } from "~/shared/types";

import CustomizationSection from "~/components/customization-section";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import useChromeStorage from "~/hooks/use-chrome-storage";
import { cn, isValidUrl } from "~/lib/utils";
import {
  DEFAULT_BLOCKED_WEBSITES,
  FACEBOOK_CUSTOMIZATIONS,
  INSTAGRAM_CUSTOMIZATIONS,
  TWITTER_CUSTOMIZATIONS,
} from "~/shared/config";
import {
  BlushBrushIcon,
  FacebookIcon,
  InstagramIcon,
  PlazaIcon,
  PlusIcon,
  RedoIcon,
  SearchIcon,
  SecurityBlockedIcon,
  TimeQuarterIcon,
  TrashIcon,
  TwitterIcon,
} from "~/shared/icons";

type SettingsTab =
  | "blocked-websites"
  | "schedules"
  | "facebook-customizations"
  | "instagram-customizations"
  | "twitter-customizations";

export default function SettingsView() {
  const [activeTab, setActiveTab]
    = React.useState<SettingsTab>("blocked-websites");

  return (
    <div className="grid grid-cols-[280px_1fr] h-screen">
      <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <SettingsContent activeTab={activeTab} />
    </div>
  );
}

function SettingsSidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: SettingsTab;
  setActiveTab: (tab: SettingsTab) => void;
}) {
  return (
    <aside className="flex flex-col gap-4 p-4 bg-slate-50 border-r h-full dark:bg-neutral-900">
      <div id="sidebar-header" className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Settings</h2>
      </div>
      <div className="flex flex-col gap-2">
        <SidebarGroupHeader title="General" icon={<PlazaIcon />} />
        <div className="flex flex-col gap-1">
          <SidebarItem
            title="Blocked Websites"
            icon={<SecurityBlockedIcon />}
            onClick={() => setActiveTab("blocked-websites")}
            isActive={activeTab === "blocked-websites"}
          />
          <SidebarItem
            title="Schedules"
            icon={<TimeQuarterIcon />}
            onClick={() => setActiveTab("schedules")}
            isActive={activeTab === "schedules"}
          />
        </div>
        <SidebarGroupHeader title="Customizations" icon={<BlushBrushIcon />} />
        <div className="flex flex-col gap-1">
          <SidebarItem
            title="Facebook"
            icon={<FacebookIcon />}
            onClick={() => setActiveTab("facebook-customizations")}
            isActive={activeTab === "facebook-customizations"}
          />
          <SidebarItem
            title="Instagram"
            icon={<InstagramIcon />}
            onClick={() => setActiveTab("instagram-customizations")}
            isActive={activeTab === "instagram-customizations"}
          />
          <SidebarItem
            title="Twitter"
            icon={<TwitterIcon />}
            onClick={() => setActiveTab("twitter-customizations")}
            isActive={activeTab === "twitter-customizations"}
          />
        </div>
      </div>
    </aside>
  );
}

function SidebarGroupHeader({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 [&_svg]:size-4 text-muted-foreground text-[13px] mt-4">
      {icon}
      <h3 className="font-medium">{title}</h3>
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
        "flex items-center gap-2 py-2 px-2 hover:bg-slate-200 dark:hover:bg-neutral-800 rounded-xl [&_svg]:size-4 duration-200 w-full text-sm",
        isActive && "bg-slate-200 dark:bg-neutral-800",
      )}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
}

function SettingsContent({ activeTab }: { activeTab: SettingsTab }) {
  const tabsMap: Record<
    SettingsTab,
    { subtitle: string; title: string; component: React.ReactNode }
  > = {
    "blocked-websites": {
      subtitle: "General",
      title: "Blocked Websites",
      component: <BlockedWebsitesTab />,
    },
    schedules: {
      subtitle: "General",
      title: "Schedules",
      component: <SchedulesTab />,
    },
    "facebook-customizations": {
      subtitle: "Customizations",
      title: "Facebook Customizations",
      component: <FacebookCustomizationsTab />,
    },
    "instagram-customizations": {
      subtitle: "Customizations",
      title: "Instagram Customizations",
      component: <InstagramCustomizationsTab />,
    },
    "twitter-customizations": {
      subtitle: "Customizations",
      title: "Twitter Customizations",
      component: <TwitterCustomizationsTab />,
    },
  };
  return (
    <div>
      <SettingsContentHeader
        subtitle={tabsMap[activeTab].subtitle}
        title={tabsMap[activeTab].title}
      />
      {tabsMap[activeTab].component}
    </div>
  );
}

function SettingsContentHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="h-20 border-b border-border bg-zinc-50 dark:bg-neutral-900 w-full px-6 flex flex-col justify-center gap-0.5">
      <p className="text-sm font-medium text-muted-foreground">{subtitle}</p>
      <h2 className="text-lg font-semibold">{title}</h2>
    </header>
  );
}

function BlockedWebsitesTab() {
  const [blockedWebsites, setBlockedWebsites] = useChromeStorage<
    BlockedWebsite[]
  >("blocked_websites", DEFAULT_BLOCKED_WEBSITES);
  const websiteInputRef = React.useRef<HTMLInputElement>(null);

  const handleAddWebsite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let website = websiteInputRef.current?.value;
    if (!website)
      return;

    // TODO: add toast
    if (!website.includes("."))
      return;
    if (!website.startsWith("http"))
      website = `https://${website}`;

    // TODO: add toast
    const isValid = isValidUrl(website);
    if (!isValid)
      return;

    const myUrl = new URL(website);
    const domain = myUrl.hostname;

    // TODO: add toast
    if (
      blockedWebsites.some(blockedWebsite => blockedWebsite.url === website)
    )
      return;

    setBlockedWebsites([{ url: website, name: domain }, ...blockedWebsites]);
    websiteInputRef.current!.value = "";
  };

  function handleRemoveWebsite(website: BlockedWebsite) {
    setBlockedWebsites(
      blockedWebsites.filter(
        blockedWebsite => blockedWebsite.url !== website.url,
      ),
    );
  }

  function handleClearAll() {
    setBlockedWebsites([]);
  }

  function handleResetDefaults() {
    setBlockedWebsites(DEFAULT_BLOCKED_WEBSITES);
  }

  return (
    <div className="p-8 flex flex-col gap-4 w-[800px] max-w-full">
      <form
        onSubmit={handleAddWebsite}
        className="flex items-center gap-2 pl-4 py-1 pr-1 rounded-xl border border-border bg-zinc-50 dark:bg-neutral-900"
      >
        <SearchIcon className="size-4 text-muted-foreground min-w-4" />
        <input
          ref={websiteInputRef}
          type="text"
          placeholder="Type to search or add a new website"
          className="w-full outline-none bg-transparent text-sm placeholder:text-muted-foreground h-12"
        />
        <Button type="submit" size="sm" className="h-12">
          <PlusIcon className="size-4" />
          Add Website
        </Button>
      </form>
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="outline" onClick={handleResetDefaults}>
          <RedoIcon className="size-4" />
          Reset Defaults
        </Button>
        <Button size="sm" variant="outline" onClick={handleClearAll}>
          <TrashIcon className="size-4" />
          Clear All
        </Button>
      </div>
      <div className="flex flex-col bg-zinc-50 dark:bg-neutral-900 rounded-xl p-4 border border-border max-h-[600px] overflow-y-scroll">
        {blockedWebsites.map((website) => {
          const myUrl = new URL(website.url);
          const domain = myUrl.hostname;

          return (
            <div
              key={website.url}
              className="flex items-center gap-2 py-2 px-2 rounded-xl relative hover:bg-zinc-100 dark:hover:bg-neutral-800 duration-200"
            >
              <img
                src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${website.url}&size=32`}
                alt=""
                className="size-4"
              />
              <span>{domain}</span>
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-destructive/10 h-8 w-8 rounded-full"
                  onClick={() => handleRemoveWebsite(website)}
                >
                  <TrashIcon className="size-4 text-destructive" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SchedulesTab() {
  const [schedules, setSchedules] = useChromeStorage<Schedule[]>("schedules", []);
  const scheduleInputRef = React.useRef<HTMLInputElement>(null);
  const startInputRef = React.useRef<HTMLInputElement>(null);
  const endInputRef = React.useRef<HTMLInputElement>(null);

  const handleAddSchedule = () => {
    let url = scheduleInputRef.current?.value;
    if (!url) {
      // TODO: add toast
      console.log("No URL provided");
      return;
    }

    if (!url.startsWith("http")) {
      console.log("Adding https:// to URL");
      url = `https://${url}`;
    }

    if (!isValidUrl(url)) {
      // TODO: add toast
      console.log("Invalid URL");
      return;
    }

    const start = startInputRef.current?.value;
    if (!start) {
      // TODO: add toast
      console.log("No start time provided");
      return;
    }

    const end = endInputRef.current?.value;
    if (!end) {
      // TODO: add toast
      console.log("No end time provided");
      return;
    }

    const startTime = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);

    if (endTime <= startTime) {
      // TODO: add toast
      console.log("End time is before start time");
      return;
    }

    const myUrl = new URL(url);

    setSchedules([{ url: myUrl.origin, start, end, enabled: true }, ...schedules]);
    scheduleInputRef.current!.value = "";
  };

  function handleRemoveSchedule(schedule: Schedule) {
    setSchedules(schedules.filter(s => s.url !== schedule.url));
  }

  function handleToggleSchedule(schedule: Schedule) {
    setSchedules(schedules.map(s => s.url === schedule.url ? { ...s, enabled: !s.enabled } : s));
  }

  return (
    <div className="p-8">
      <div className="flex items-end gap-4 border rounded-2xl p-2 w-fit bg-neutral-50 dark:bg-neutral-900">
        <div>
          <p className="text-muted-foreground text-sm mb-1">URL</p>
          <div className="h-10 bg-secondary rounded-xl px-2 flex items-center gap-2 border" aria-label="input-container">
            <PlusIcon className="size-4 text-muted-foreground" />
            <input type="text" ref={scheduleInputRef} placeholder="facebook.com" className="bg-transparent outline-none w-[250px]" />
          </div>
        </div>
        <div className="flex gap-1">
          <div>
            <p className="text-muted-foreground text-sm mb-1">Start</p>
            <input
              type="time"
              ref={startInputRef}
              defaultValue="20:00"
              className="bg-secondary rounded-xl px-2 h-10 outline-none border"
            />
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">End</p>
            <input type="time" ref={endInputRef} defaultValue="23:00" className="bg-secondary rounded-xl px-2 h-10 outline-none border" />
          </div>
        </div>
        <Button size="sm" onClick={handleAddSchedule}>
          <PlusIcon className="size-4" />
          Add Schedule
        </Button>
      </div>
      <div>
        <div className="flex flex-col gap-2 mt-10 border rounded-2xl p-2 bg-neutral-50 dark:bg-neutral-900">
          {schedules.length > 0 && schedules.map((schedule, index) => (
            <div key={`schedule-${index}`} className="flex items-center gap-2 bg-secondary rounded-2xl py-2 px-4 justify-between">
              <div className="flex items-center gap-2">
                <img className="size-4" src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${schedule.url}&size=32`} alt="" />
                <p>{schedule.url}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 text-muted-foreground text-sm">
                  <p>{new Date(`2000-01-01T${schedule.start}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</p>
                  <span>-</span>
                  <p>{new Date(`2000-01-01T${schedule.end}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</p>
                </div>
                <div>
                  <Switch id={`schedule-${index}`} checked={schedule.enabled} onCheckedChange={() => handleToggleSchedule(schedule)} />
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" className="hover:bg-destructive/10 h-8 w-8 rounded-full" onClick={() => handleRemoveSchedule(schedule)}>
                    <TrashIcon className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {schedules.length === 0 && (
            <div className="flex items-center justify-center h-[300px]">
              <p className="text-muted-foreground text-sm">No schedules found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FacebookCustomizationsTab() {
  return (
    <div className="p-8">
      <CustomizationSection customizations={FACEBOOK_CUSTOMIZATIONS} />
    </div>
  );
}

function InstagramCustomizationsTab() {
  return (
    <div className="p-8">
      <CustomizationSection customizations={INSTAGRAM_CUSTOMIZATIONS} />
    </div>
  );
}

function TwitterCustomizationsTab() {
  return (
    <div className="p-8">
      <CustomizationSection customizations={TWITTER_CUSTOMIZATIONS} />
    </div>
  );
}
