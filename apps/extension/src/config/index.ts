import { z } from "zod";

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
]);
