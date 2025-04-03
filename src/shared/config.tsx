import type {
  IconProps,
} from "./icons";

import {
  NewsIcon,
  ReelIcon,
  UserStoryIcon,
  WatchStarIcon,
} from "./icons";

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

export const ALL_CUSTOMIZATIONS = [...FACEBOOK_CUSTOMIZATIONS] as const;
