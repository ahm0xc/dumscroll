import { BoxesIcon, ListMusicIcon } from "lucide-react";

import type { IconProps } from "./icons";

import { ColorsIcon, ExploreIcon, EyeSlashIcon, NewsIcon, ReelIcon, UserStoryIcon, WatchStarIcon } from "./icons";

export type BlockedWebsite = {
  url: string;
  name: string;
};

export const DEFAULT_BLOCKED_WEBSITES: BlockedWebsite[] = [
  { url: "https://facebook.com", name: "Facebook" },
  { url: "https://instagram.com", name: "Instagram" },
  { url: "https://twitter.com", name: "Twitter" },
];

export type Customization = {
  id: string;
  name: string;
  description: string;
  defaultEnabled: boolean;
  icon?: (props: IconProps) => React.ReactNode;
  info?: string;
};

export const FACEBOOK_CUSTOMIZATIONS: Customization[] = [
  {
    id: "facebook-remove-watch",
    name: "Remove Watch",
    description: "Remove the Watch section from everywhere",
    defaultEnabled: true,
    icon: WatchStarIcon,
  },
  {
    id: "facebook-remove-stories",
    name: "Remove Stories",
    description: "Remove stories section",
    defaultEnabled: false,
    icon: UserStoryIcon,
  },
  {
    id: "facebook-remove-feed",
    name: "Remove Feed",
    description: "Remove the feed section",
    defaultEnabled: false,
    icon: NewsIcon,
  },
  {
    id: "facebook-remove-reels",
    name: "Remove Reels",
    description: "Completely remove the all reels",
    defaultEnabled: true,
    icon: ReelIcon,
  },
] as const;

export const TWITTER_CUSTOMIZATIONS: Customization[] = [
  {
    id: "twitter-remove-feed",
    name: "Remove Feed",
    description: "Completely remove the feed",
    defaultEnabled: true,
    icon: NewsIcon,
  },
] as const;

export const INSTAGRAM_CUSTOMIZATIONS: Customization[] = [
  {
    id: "instagram-remove-feed",
    name: "Remove Feed",
    description: "Completely remove the feed",
    defaultEnabled: false,
    icon: NewsIcon,
  },
  {
    id: "instagram-remove-stories",
    name: "Remove Stories",
    description: "Remove the stories section",
    defaultEnabled: false,
    icon: UserStoryIcon,
  },
  {
    id: "instagram-filter-grayscale",
    name: "Filter Grayscale",
    description: "Filter the images in grayscale",
    defaultEnabled: false,
    icon: ColorsIcon,
  },
  {
    id: "instagram-block-reels",
    name: "Block Reels",
    description: "Completely remove reels page",
    defaultEnabled: true,
    icon: ReelIcon,
  },
  {
    id: "instagram-block-explore",
    name: "Block Explore",
    description: "Completely remove explore page",
    defaultEnabled: true,
    icon: ExploreIcon,
  },
] as const;

export const YOUTUBE_CUSTOMIZATIONS: Customization[] = [
  {
    id: "youtube-home-page-hide-suggestions-category",
    name: "Hide Suggestions Category",
    description: "Hide the suggestions category on the home page",
    defaultEnabled: false,
    icon: BoxesIcon,
  },
  {
    id: "youtube-home-page-hide-watched-videos",
    name: "Hide Watched Videos",
    description: "Hide the watched videos on the home page",
    defaultEnabled: false,
    icon: EyeSlashIcon,
  },
  {
    id: "youtube-home-page-hide-playlist-and-mixes",
    name: "Hide Playlist and Mixes",
    description: "Hide the playlist and mixes on the home page",
    defaultEnabled: false,
    icon: ListMusicIcon,
  },

] as const;

export const ALL_CUSTOMIZATIONS = [
  ...FACEBOOK_CUSTOMIZATIONS,
  ...TWITTER_CUSTOMIZATIONS,
  ...INSTAGRAM_CUSTOMIZATIONS,
  ...YOUTUBE_CUSTOMIZATIONS,
] as const;

type Platform = {
  id: string;
  name: string;
  url: string | string[];
};

export const SOCIAL_MEDIA_PLATFORMS: Platform[] = [
  {
    id: "facebook",
    name: "Facebook",
    url: "https://facebook.com",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com",
  },
  {
    id: "twitter",
    name: "Twitter",
    url: "https://twitter.com",
  },
  {
    id: "snapchat",
    name: "Snapchat",
    url: "https://snapchat.com",
  },
  {
    id: "tiktok",
    name: "TikTok",
    url: "https://tiktok.com",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com",
  },
  {
    id: "angellist",
    name: "AngelList",
    url: "https://angellist.com",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com",
  },
  {
    id: "medium",
    name: "Medium",
    url: "https://medium.com",
  },
  {
    id: "discord",
    name: "Discord",
    url: "https://discord.com",
  },
  {
    id: "vrchat",
    name: "VRChat",
    url: "https://vrchat.com",
  },
  {
    id: "roblox",
    name: "Roblox",
    url: "https://roblox.com",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    url: "https://pinterest.com",
  },
  {
    id: "reddit",
    name: "Reddit",
    url: "https://reddit.com",
  },
  {
    id: "steam",
    name: "Steam",
    url: "https://steam.com",
  },
  {
    id: "deviantart",
    name: "DeviantArt",
    url: "https://deviantart.com",
  },
  {
    id: "rumble",
    name: "Rumble",
    url: "https://rumble.com",
  },
  {
    id: "behance",
    name: "Behance",
    url: "https://behance.net",
  },
  {
    id: "dribbble",
    name: "Dribbble",
    url: "https://dribbble.com",
  },
  {
    id: "vimeo",
    name: "Vimeo",
    url: "https://vimeo.com",
  },
  {
    id: "telegram",
    name: "Telegram",
    url: ["https://telegram.com", "https://web.telegram.com"],
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    url: ["https://web.whatsapp.com", "https://whatsapp.com"],
  },
  {
    id: "wechat",
    name: "WeChat",
    url: ["https://web.wechat.com", "https://wechat.com"],
  },
  {
    id: "kakao",
    name: "Kakao",
    url: ["https://web.kakao.com", "https://kakao.com"],
  },
] as const;

export const STREAMING_PLATFORMS: Platform[] = [
  {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com",
  },
  {
    id: "twitch",
    name: "Twitch",
    url: "https://twitch.com",
  },
  {
    id: "netflix",
    name: "Netflix",
    url: "https://netflix.com",
  },
  {
    id: "disney",
    name: "Disney+",
    url: "https://disneyplus.com",
  },
  {
    id: "hulu",
    name: "Hulu",
    url: "https://hulu.com",
  },
  {
    id: "amazon-prime",
    name: "Amazon Prime",
    url: "https://amazonprime.com",
  },
  {
    id: "apple-tv",
    name: "Apple TV",
    url: "https://appletv.com",
  },
  {
    id: "apple-music",
    name: "Apple Music",
    url: "https://applemusic.com",
  },
  {
    id: "peacock",
    name: "Peacock",
    url: "https://peacock.com",
  },
  {
    id: "sony-liv",
    name: "Sony Liv",
    url: "https://sonyliv.com",
  },
  {
    id: "tubi",
    name: "Tubi",
    url: "https://tubi.com",
  },
  {
    id: "fubo",
    name: "Fubo",
    url: "https://fubo.com",
  },
  {
    id: "viaplay",
    name: "Viaplay",
    url: "https://viaplay.com",
  },
  {
    id: "hotstar",
    name: "Hotstar",
    url: "https://hotstar.com",
  },
  {
    id: "spotify",
    name: "Spotify",
    url: "https://spotify.com",
  },
  {
    id: "youtube-music",
    name: "YouTube Music",
    url: "https://youtube.com/music",
  },
  {
    id: "masterclass",
    name: "Masterclass",
    url: "https://masterclass.com",
  },
  {
    id: "curiositystream",
    name: "CuriosityStream",
    url: "https://curiositystream.com",
  },
  {
    id: "nebulabox",
    name: "NebulaBox",
    url: "https://nebula.tv",
  },
  {
    id: "khan-academy",
    name: "Khan Academy",
    url: ["https://khanacademy.org", "https://*.khanacademy.org"],
  },
  {
    id: "coursera",
    name: "Coursera",
    url: "https://coursera.org",
  },
  {
    id: "udemy",
    name: "Udemy",
    url: "https://udemy.com",
  },
  {
    id: "skillshare",
    name: "Skillshare",
    url: "https://skillshare.com",
  },
] as const;

export const ALL_PLATFORMS = [
  ...SOCIAL_MEDIA_PLATFORMS,
  ...STREAMING_PLATFORMS,
] as const;
