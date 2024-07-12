import React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

export default function TiktokSettingsCard() {
  const [isTiktokBlocked, setIsTiktokBlocked] = React.useState<boolean | null>(
    // "is-tiktok-blocked",
    null,
  );

  React.useEffect(() => {
    if (isTiktokBlocked === null) {
      return;
    }

    chrome.runtime.sendMessage(
      {
        action: "setStorageValue",
        key: "is-tiktok-blocked",
        value: isTiktokBlocked,
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
  }, [isTiktokBlocked]);

  React.useEffect(() => {
    chrome.runtime.sendMessage({ action: "getStorageValue", key: "is-tiktok-blocked" }, (res) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        setIsTiktokBlocked(res.value);
      }
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tiktok Settings</CardTitle>
        <CardDescription>Manage your tiktok settings here.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <Label htmlFor="tiktok-block" className="flex flex-col space-y-1">
            <span>Ban Tiktok</span>
            <span className="text-xs font-normal leading-snug text-muted-foreground">
              Removes tiktok completely.
            </span>
          </Label>
          <Switch
            id="tiktok-block"
            checked={!!isTiktokBlocked}
            onCheckedChange={setIsTiktokBlocked}
            aria-label="tiktok-block"
          />
        </div>
      </CardContent>
    </Card>
  );
}
