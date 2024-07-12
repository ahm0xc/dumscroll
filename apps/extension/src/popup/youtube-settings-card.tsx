import React from "react";
import useLocalStorage from "use-local-storage";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

export default function YoutubeSettingsCard() {
  const [isYoutubeShortsBlocked, setIsYoutubeShortsBlocked] = useLocalStorage<boolean>(
    "is-yt-shorts-blocked",
    true,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Youtube Settings</CardTitle>
        <CardDescription>Manage your youtube settings here.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <Label htmlFor="yt-block-shorts" className="flex flex-col space-y-1">
            <span>Block shorts</span>
            <span className="text-xs font-normal leading-snug text-muted-foreground">
              Shorts will be removed from everywhere. But if a short is visited it's redirected to
              the video.
            </span>
          </Label>
          <Switch
            id="yt-block-shorts"
            checked={isYoutubeShortsBlocked}
            onCheckedChange={setIsYoutubeShortsBlocked}
            aria-label="yt-block-shorts"
          />
        </div>
      </CardContent>
    </Card>
  );
}
