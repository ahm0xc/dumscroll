import { IconProps, UserStoryIcon, WatchStarIcon } from "./icons";

export type BlockedWebsite = {
  url: string;
  name: string;
};

export const DEFAULT_BLOCKED_WEBSITES: BlockedWebsite[] = [
  { url: "https://facebook.com", name: "Facebook" },
  { url: "https://instagram.com", name: "Instagram" },
  { url: "https://twitter.com", name: "Twitter" },
];

export interface Customization {
  id: string;
  name: string;
  description: string;
  icon?: (props: IconProps) => React.ReactNode;
  info?: string;
}

export const FACEBOOK_CUSTOMIZATIONS: Customization[] = [
  {
    id: "facebook-remove-watch-links",
    name: "Remove Watch",
    description: "Remove the Watch links from everywhere",
    icon: WatchStarIcon,
  },
  {
    id: "facebook-remove-stories",
    name: "Remove Stories",
    description: "Remove stories section",
    icon: UserStoryIcon,
  },
] as const;
