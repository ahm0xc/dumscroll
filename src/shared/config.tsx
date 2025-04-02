import { IconProps, WatchStarIcon } from "./icons";

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
  defaultEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  icon?: (props: IconProps) => React.ReactNode;
  info?: string;
}

export const FACEBOOK_CUSTOMIZATIONS: Customization[] = [
  {
    id: "facebook-remove-watch",
    name: "Remove Watch",
    description: "Remove the Watch section from Facebook",
    defaultEnabled: true,
    onToggle: () => {},
    icon: WatchStarIcon,
  },
];
