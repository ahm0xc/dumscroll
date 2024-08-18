import { z } from "zod";

export const APP_URL = "https://dumscroll.vercel.app";

export const settings = {
  "uses-tracking": {
    key: "uses-tracking",
    default: true,
  },
  schedule: {
    isEnabledKey: "is-schedule-enabled",
    isEnabledDefault: false,
    key: "schedules",
    default: [],
    defaultWeeks: [1, 2, 3, 4, 5, 6],
  },
  "productivity-mode": {
    key: "productivity-mode",
    default: true,
  },
  "take-a-break": {
    key: "take-a-break",
    default: true,
  },
  "bed-time-reminder": {
    key: "bed-time-reminder",
    default: true,
  },
  activation: {
    license: {
      key: "license-key",
    },
  },
  platformDefaults: {
    youtube: {
      blockShorts: {
        key: "yt_block-shorts",
        default: true,
      },
      grayScaleThumbnails: {
        key: "yt_grayscale-thumbnails",
        default: true,
      },
      blackThumbnails: {
        key: "yt_black-thumbnails",
        default: false,
      },
    },
    facebook: {
      blockReels: {
        key: "fb_block-reels",
        default: true,
      },
    },
    instagram: {
      blockReels: {
        key: "insta_block-reels",
        default: true,
      },
    },
  },
};

export const blockSchema = z.object({
  url: z.string(),
  blockType: z.enum(["total", "admit"]),
  startingTime: z.string().optional().default("00:00"),
  endingTime: z.string().optional().default("23:59"),
});

export type BlockType = z.infer<typeof blockSchema>;

export const defaultBlocks = z.array(blockSchema).parse([
  {
    url: "youtube.com/shorts/",
    blockType: "admit",
  },
  {
    url: "tiktok.com",
    blockType: "total",
  },
  {
    url: "facebook.com/reel/",
    blockType: "admit",
  },
  {
    url: "facebook.com/reel/",
    blockType: "admit",
  },
  {
    url: "instagram.com/reels/",
    blockType: "admit",
  },
]);

export const socialMediaPlatforms = [
  {
    name: "Facebook",
    url: "https://facebook.com",
    color: "#1877F2",
    colorName: "blue",
  },
  {
    name: "Youtube",
    url: "https://youtube.com",
    color: "#FF0000",
    colorName: "red",
  },
  {
    name: "Linkedin",
    url: "https://linkedin.com",
    color: "#0A66C2",
    colorName: "indigo",
  },
  {
    name: "Twitter",
    url: "https://twitter.com",
    color: "#1DA1F2",
    colorName: "sky",
  },
  {
    name: "Instagram",
    url: "https://instagram.com",
    color: "#833AB4",
    colorName: "purple",
  },
  {
    name: "Tiktok",
    url: "https://tiktok.com",
    color: "#25F4EE",
    colorName: "cyan",
  },
];
