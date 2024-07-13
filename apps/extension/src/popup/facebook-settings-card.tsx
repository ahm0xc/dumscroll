import React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

export default function FacebookSettingsCard() {
  const [isFacebookWatchBlocked, setIsFacebookWatchBlocked] = React.useState<boolean | null>(
    // "is-fb-watch-blocked",
    null,
  );

  React.useEffect(() => {
    if (isFacebookWatchBlocked === null) {
      return;
    }

    chrome.runtime.sendMessage(
      {
        action: "setStorageValue",
        key: "is-fb-watch-blocked",
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
    chrome.runtime.sendMessage({ action: "getStorageValue", key: "is-fb-watch-blocked" }, (res) => {
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
        <CardTitle>Facebook Settings</CardTitle>
        <CardDescription>Manage your facebook settings here.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <Label htmlFor="fb-block-watch" className="flex flex-col space-y-1">
            <span>Remove Watch</span>
            <span className="text-xs font-normal leading-snug text-muted-foreground">
              Removes facebook watch including the go to links.
            </span>
          </Label>
          <Switch
            id="fb-block-watch"
            checked={!!isFacebookWatchBlocked}
            onCheckedChange={setIsFacebookWatchBlocked}
            aria-label="fb-block-watch"
          />
        </div>
      </CardContent>
    </Card>
  );
}
