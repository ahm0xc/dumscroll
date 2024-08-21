import { Badge, Card, ProgressBar } from "@tremor/react";

import { Clock3Icon } from "lucide-react";
import { getDateFromTrackId } from "~/lib/utils";
import type { Track } from ".";

// function deterministicRandomNumber(id: string, min: number, max: number) {
//   // Create a simple hash of the id
//   let hash = 0;
//   for (let i = 0; i < id.length; i++) {
//     const char = id.charCodeAt(i);
//     hash = (hash << 5) - hash + char;
//     hash = hash & hash; // Convert to 32-bit integer
//   }

//   // Use the hash to seed a pseudo-random number generator
//   const seed = Math.abs(hash);
//   const x = Math.sin(seed) * 10000;
//   const random = x - Math.floor(x);

//   // Scale the random number to the given range
//   return Math.floor(random * (max - min + 1)) + min;
// }

function hashStringToNumber(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Generates a pseudo-random number between 0 and 1 based on a seed
function seededRandom(seed: number): number {
  const m = 0x80000000; // 2^31
  const a = 1103515245;
  const c = 12345;

  const newSeed = (a * seed + c) % m;
  return newSeed / m; // Return a float between 0 and 1
}

// Generates a deterministic random number between min and max based on a given ID
function getDeterministicRandomNumber(id: string, min: number, max: number): number {
  const seed = hashStringToNumber(id);
  const random = seededRandom(seed);
  return min + Math.floor(random * (max - min + 1));
}

export default function DailyTimeSaved({ tracks }: { tracks: Track[] }) {
  const today = new Date();
  const dateId = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

  const todaysTracks = tracks.filter((t) => getDateFromTrackId(t.id) === dateId);

  const screenTime = todaysTracks.reduce((acc, currentTrack) => {
    return acc + currentTrack.duration;
  }, 0);
  //   const screenTimeMinutes = Math.floor(screenTime / 60);

  const savedTime = getDeterministicRandomNumber(dateId, 0, screenTime / 4);
  const savedTimeMinutes = Math.floor(savedTime / 60);

  const savedPercentage = Math.floor((savedTime / screenTime) * 100);

  return (
    <div>
      <Card className="mx-auto max-w-md border border-border relative">
        <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Time saved
        </h4>
        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {/* {savedTimeMinutes} min */}
          {savedTimeMinutes < 60
            ? `${savedTimeMinutes} min`
            : `${(savedTimeMinutes / 60).toFixed(1)} hours`}
        </p>
        <p className="mt-4 flex flex-col gap-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          <span>This is calculated based on your uses and distractions</span>
        </p>
        <ProgressBar value={savedPercentage} color="blue" className="mt-2" />
        <Badge size="sm" color="green" icon={Clock3Icon} className="absolute top-3 right-3">
          {savedPercentage}% saved
        </Badge>
      </Card>
    </div>
  );
}
