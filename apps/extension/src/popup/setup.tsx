import React from "react";
import axios from "axios";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function Setup() {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function handleSaveKey(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await axios.post("http://localhost:3000/api/validate-customer", {
        customerId: inputValue.trim(),
      });
      if (data.customerId) {
        chrome.runtime.sendMessage({
          action: "setStorageValue",
          key: "customer-id",
          value: data.customerId,
        });
        chrome.runtime.sendMessage({
          action: "setStorageValue",
          key: "user-email",
          value: data.email,
        });
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
    // chrome.runtime.sendMessage({
    //   action: "setStorageValue",
    //   key: "customer-id",
    //   value: inputRef.current?.value,
    // });
  }
  return (
    <div className="w-[400px]">
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Setup</h2>
          <p className="text-foreground/70 text-[13px]">
            Get started with the extension by adding your key. If you don't have a key you can get
            one from your{" "}
            <button
              type="button"
              onClick={() =>
                chrome.tabs.create({ url: "https://dumscroll.com/dashboard/get-started" })
              }
              className="text-foreground underline underline-offset-4"
            >
              Dashboard
            </button>
          </p>
        </div>
        <form onSubmit={handleSaveKey} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-foreground">Paste your key here</label>
            <Input
              placeholder="xxxx-xxxx-xxxx-xxxx"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div>
            <Button className="w-full" type="submit" disabled={!inputValue.trim() || isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
