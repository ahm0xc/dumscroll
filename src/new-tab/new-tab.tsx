import { CogIcon } from "lucide-react";

import "./new-tab.css";

import React from "react";

import type { WeatherDataType } from "~/shared/types";

import ThemeSwitcher from "~/components/theme-switcher";
import ThemedImage from "~/components/themed-image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import useLocalStorage from "~/hooks/use-local-storage";
import { cn } from "~/lib/utils";
import { BingIcon, DuckDuckGoIcon, GoogleIcon, SearchIcon, YahooIcon } from "~/shared/icons";
import { convertToCelsius, getSearchUrl } from "~/shared/utils";

export default function NewTab() {
  return (
    <React.Fragment>
      <main className="text-black dark:text-white">
        <div className="relative h-screen w-full">
          <ThemedImage
            src={{
              light: "https://images.unsplash.com/photo-1743191771058-d06e793dda2d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              dark: "https://images.unsplash.com/photo-1493673272479-a20888bcee10?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            className="absolute inset-0 w-full h-full object-cover object-center -z-10"
            alt="logo"
          />
          <div className="blur-vignette" />
          <ThemeSwitcher />
          <div aria-label="center" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <SearchBar />
          </div>
          <div aria-label="bottom-center" className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <QuoteWidget />
          </div>
          <div aria-label="top-right-corner" className="absolute top-6 right-6">
            <div className="flex items-start gap-4">
              <ClockWidget />
              <WeatherWidget />
            </div>
          </div>
          <div aria-label="bottom-right-corner" className="absolute bottom-6 right-6">
            <div className="flex items-center gap-2">
              <SettingsButton />
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

type IconButtonProps = {
  icon: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function IconButton({ icon, className, ...props }: IconButtonProps) {
  return (
    <button type="button" className={cn("w-10 h-10 min-w-10 min-h-10 flex items-center justify-center rounded-full hover:bg-black/5 hover:dark:bg-white/5 transition-colors duration-200 [&_svg]:size-6", className)} {...props}>
      {icon}
    </button>
  );
}

function WeatherWidget() {
  const [weatherCache, setWeatherCache] = useLocalStorage<{
    data: WeatherDataType;
    timestamp: number;
  } | null>("weather-cache", null);

  const [weather, setWeather] = React.useState<WeatherDataType | null>(weatherCache?.data || null);

  React.useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch("https://api.momentumdash.com/weather/current");
        const data = await response.json();
        setWeather(data);
        setWeatherCache({
          data,
          timestamp: Date.now(),
        });
      }
      catch (error) {
        console.error(error);
      }
    }

    const currentTime = Date.now();
    const oneHour = 60 * 60 * 1000;

    if (!weatherCache || currentTime - weatherCache.timestamp > oneHour) {
      fetchWeather();
    }
  }, [weatherCache, setWeatherCache]);

  if (!weather)
    return null;

  return (
    <div className="flex items-start gap-2 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 hover:backdrop-blur-md transition-colors duration-200">
      <div>
        <img src={`https://cdn.discover.swiss/icons/weather/ds-weather-${36}.svg`} className="size-8" alt="" />
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-semibold font-mono">
          {Math.round(convertToCelsius(weather.now.temperature))}
          °
        </p>
        <p className="text-sm font-medium">{weather.location.locationName}</p>
      </div>
    </div>
  );
}

function ClockWidget() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-col gap-2 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 hover:backdrop-blur-md transition-colors duration-200">
      <p className="text-2xl font-semibold font-mono">
        {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }).replace(/\s([AP]M)/i, "")}
        <span className="text-xs opacity-80 ml-1">{time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }).match(/[AP]M/i)?.[0]}</span>
      </p>
      <p className="text-sm font-medium">
        {time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
      </p>
    </div>
  );
}

function QuoteWidget() {
  const [quoteCache, setQuoteCache] = useLocalStorage<{
    data: {
      id: string;
      quote: string;
      author: string;
    };
    timestamp: number;
  } | null>("quote-cache", null);

  const [quoteData, setQuoteData] = React.useState<{
    id: string;
    quote: string;
    author: string;
  } | null>(quoteCache?.data || null);

  React.useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://dummyjson.com/quotes/random");
        const data = await response.json();
        setQuoteData(data);
        setQuoteCache({
          data,
          timestamp: Date.now(),
        });
      }
      catch (error) {
        console.error(error);
      }
    };

    const currentTime = Date.now();
    const oneHour = 60 * 60 * 1000;

    if (!quoteCache || currentTime - quoteCache.timestamp > oneHour) {
      fetchQuote();
    }
  }, [quoteCache, setQuoteCache]);

  if (!quoteData)
    return null;

  return (
    <div className="max-w-lg text-sm">
      <p className="text-center text-balance">{quoteData.quote}</p>
      <p className="text-[12px] font-medium text-center opacity-80">
        —
        {quoteData.author}
      </p>
    </div>
  );
}

const SEARCH_ENGINES = [
  {
    id: "google",
    name: "Google",
    icon: <GoogleIcon />,
  },
  {
    id: "duckduckgo",
    name: "DuckDuckGo",
    icon: <DuckDuckGoIcon />,
  },
  {
    id: "bing",
    name: "Bing",
    icon: <BingIcon />,
  },
  {
    id: "yahoo",
    name: "Yahoo",
    icon: <YahooIcon />,
  },
];

function SearchBar() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [searchEngineId, setSearchEngineId] = useLocalStorage("search-engine", SEARCH_ENGINES[0].id);

  function handleSearchEngineChange(value: string) {
    setSearchEngineId(value);
    inputRef.current?.focus();
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const query = inputRef.current?.value;

    if (!query)
      return;

    const searchEngine = SEARCH_ENGINES.find(engine => engine.id === searchEngineId) ?? SEARCH_ENGINES[0];

    if (searchEngine) {
      const searchUrl = getSearchUrl(query, searchEngine.id as any);
      const a = document.createElement("a");
      a.setAttribute("href", searchUrl);
      a.click();
      setTimeout(() => {
        a.remove();
      }, 100);
      inputRef.current.value = "";
    }
  }

  return (
    <form className="bg-background dark:bg-background/10 dark:backdrop-blur-lg dark:backdrop-saturate-150 rounded-full border p-1 flex items-center gap-2 max-w-full w-ful" onSubmit={handleSearch}>
      <Select defaultValue={searchEngineId} onValueChange={handleSearchEngineChange}>
        <SelectTrigger className="w-[150px] rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200">
          <SelectValue placeholder="search-engine" />
        </SelectTrigger>
        <SelectContent className="dark:bg-background/10 dark:backdrop-blur-lg dark:backdrop-saturate-150">
          {SEARCH_ENGINES.map(engine => (
            <SelectItem key={engine.id} value={engine.id} className="dark:hover:bg-white/20 dark:hover:backdrop-blur-lg dark:hover:backdrop-saturate-150">
              <div className="flex items-center gap-2">
                <span className="[&_svg]:size-4">
                  {engine.icon}
                </span>
                <p>
                  {engine.name}
                </p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input ref={inputRef} type="text" placeholder={`Search ${SEARCH_ENGINES.find(engine => engine.id === searchEngineId)?.name}`} className="w-[300px] max-w-full h-10 px-2 bg-transparent border-none outline-none" />
      <button type="submit" className="w-10 h-10 min-w-10 min-h-10 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200 [&_svg]:size-5 text-muted-foreground">
        <SearchIcon />
      </button>
    </form>
  );
}

function SettingsButton() {
  return (
    <SettingsDialog>
      <IconButton icon={<CogIcon />} />
    </SettingsDialog>
  );
}

type SettingsView = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

const views = [
  {
    id: "general",
    name: "General",
    icon: <CogIcon />,
  },
  {
    id: "dummy",
    name: "Dummy",
    icon: <CogIcon />,
  },
];

function SettingsDialog({ children }: { children: React.ReactNode }) {
  const [activeViewId, setActiveViewId] = React.useState(views[0].id);

  const activeView = views.find(view => view.id === activeViewId) ?? views[0];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="border-none shadow-none max-w-3xl p-0" overlayClassName="bg-black/10 backdrop-blur-sm">
        <div className="grid grid-cols-[250px_1fr] gap-4 rounded-[inherit] h-[70vh]">
          <SettingsSidebar views={views} activeView={activeView} setActiveViewId={setActiveViewId} />
          <SettingsContent activeView={activeView} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SettingsSidebar({ views, activeView, setActiveViewId }: { views: SettingsView[]; activeView: SettingsView; setActiveViewId: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <aside className="h-full bg-neutral-100 dark:bg-neutral-800 p-6 rounded-l-[inherit] border-r">
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>
          Manage your settings
        </DialogDescription>
      </DialogHeader>
      <div className="mt-4 space-y-1">
        {views.map(view => (
          <button type="button" key={view.id} className={cn("flex items-center gap-2 h-8 px-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200 w-full opacity-80", activeView.id === view.id && "bg-neutral-200 dark:bg-neutral-700 opacity-100")} onClick={() => setActiveViewId(view.id)}>
            <span className="[&_svg]:size-4">
              {view.icon}
            </span>
            <p>
              {view.name}
            </p>
          </button>
        ))}
      </div>
    </aside>
  );
}

function SettingsContent({ activeView }: { activeView: SettingsView }) {
  const settingsContentMap: Record<string, React.ReactNode> = {
    general: <GeneralSettings />,
    dummy: <DummySettings />,
  };

  return (
    <div className="p-4">
      <div>
        <h2 className="text-lg font-semibold">{activeView.name}</h2>
        <hr className="my-2" />
      </div>
      <div>
        {settingsContentMap[activeView.id]}
      </div>
    </div>
  );
}

function GeneralSettings() {
  return (
    <div>
      <h1>General Settings</h1>
    </div>
  );
}

function DummySettings() {
  return (
    <div>
      <h1>Dummy Settings</h1>
    </div>
  );
}
