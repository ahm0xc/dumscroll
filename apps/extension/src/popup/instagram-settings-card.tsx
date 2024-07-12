import React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

export default function InstagramSettingsCard() {
  const [isFacebookWatchBlocked, setIsFacebookWatchBlocked] = React.useState<boolean | null>(
    // "is-ig-reels-blocked",
    null,
  );

  React.useEffect(() => {
    if (isFacebookWatchBlocked === null) {
      return;
    }

    chrome.runtime.sendMessage(
      {
        action: "setStorageValue",
        key: "is-ig-reels-blocked",
        value: isFacebookWatchBlocked,
      },
      (_res) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          // console.log("Value from extension storage:", response.value);
          // Use the retrieved value here
        }
      },
    );
  }, [isFacebookWatchBlocked]);

  React.useEffect(() => {
    chrome.runtime.sendMessage({ action: "getStorageValue", key: "is-ig-reels-blocked" }, (res) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        setIsFacebookWatchBlocked(res.value);
      }
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Instagram Settings</CardTitle>
        <CardDescription>Manage your instagram settings here.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <Label htmlFor="ig-reels-block" className="flex flex-col space-y-1">
            <span>Remove Reels</span>
            <span className="text-xs font-normal leading-snug text-muted-foreground">
              Removes instagram reels.
            </span>
          </Label>
          <Switch
            id="ig-reels-block"
            checked={!!isFacebookWatchBlocked}
            onCheckedChange={setIsFacebookWatchBlocked}
            aria-label="ig-reels-block"
          />
        </div>
      </CardContent>
    </Card>
  );
}
