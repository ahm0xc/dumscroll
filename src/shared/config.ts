
export type BlockedWebsite = {
    url: string;
    name: string;
};

export const DEFAULT_BLOCKED_WEBSITES: BlockedWebsite[] = [
    { url: "https://facebook.com", name: "Facebook" },
    { url: "https://instagram.com", name: "Instagram" },
    { url: "https://twitter.com", name: "Twitter" },
];

