import React from "react";
import useLocalStorage from "use-local-storage";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

export default function FacebookSettingsCard() {
  const [isFacebookWatchSuggestionRemoved, setIsFacebookWatchSuggestionRemoved] =
    useLocalStorage<boolean>("is-fb-watch-suggestion-removed", true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Facebook Settings</CardTitle>
        <CardDescription>Manage your facebook settings here.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <Label htmlFor="yt-block-shorts" className="flex flex-col space-y-1">
            <span>Remove Watch suggestions</span>
            <span className="text-xs font-normal leading-snug text-muted-foreground">
              Removes the suggestion from the watch feed.
            </span>
          </Label>
          <Switch
            id="yt-block-shorts"
            checked={isFacebookWatchSuggestionRemoved}
            onCheckedChange={setIsFacebookWatchSuggestionRemoved}
            aria-label="yt-block-shorts"
          />
        </div>
      </CardContent>
    </Card>
  );
}
