"use client";

import React from "react";

import { ChromeIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";

interface Props {
  customerId: string;
}

export default function GetStarted({ customerId }: Props) {
  function copyKey() {
    window.navigator.clipboard.writeText(customerId);
    toast.success("Copied!");
  }
  return (
    <div>
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Get started</h2>{" "}
        <p className="text-foreground/70">Get going with uses analytics and control.</p>
      </div>
      <div className="mt-10 p-8">
        <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              1
            </span>
            <div className="ml-2">
              <h3 className="font-medium leading-tight text-foreground">Install extension</h3>
              <p className="text-sm">Install extension from chrome webstore.</p>
              <Button
                className="items-center gap-2 mt-4"
                onClick={() =>
                  window.open(
                    "https://chromewebstore.google.com/detail/dark-mode/dmghijelimhndkbmpgbldicpogfkceaj",
                    "_blank",
                  )
                }
              >
                <ChromeIcon size={18} />
                <p>Get chrome extension</p>
              </Button>
            </div>
          </li>
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              2
            </span>
            <div className="ml-2">
              <h3 className="font-medium leading-tight text-foreground">Copy Keys</h3>
              <p className="text-sm">Copy the key bellow for initiating the extension.</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-secondary dark:bg-primary/20 border-gray-300 dark:border-primary/40 border text-secondary-foreground dark:text-primary-foreground w-fit">
                  <p>{customerId}</p>
                </div>
                <Button
                  size="sm"
                  variant="default"
                  className="items-center gap-2 dark:bg-primary/40 dark:border dark:border-primary/50"
                  onClick={copyKey}
                >
                  <CopyIcon size={14} />
                  <p>Copy</p>
                </Button>
              </div>
            </div>
          </li>
          <li className="mb-10 ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              3
            </span>
            <div className="ml-2">
              <h3 className="font-medium leading-tight text-foreground">Paste Keys</h3>
              <p className="text-sm">
                Click on the icon of the extension and paste the key you just copied.
              </p>
              <div className="mt-4">
                <img
                  src="/setup-keys-demo.png"
                  className="w-[500px] max-w-full h-auto rounded-lg border"
                  alt=""
                />
              </div>
            </div>
          </li>
          <li className="ms-6">
            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
              4
            </span>
            <div className="ml-2">
              <h3 className="font-medium leading-tight text-foreground">Get going.</h3>
              <p className="text-sm">Enjoy the extension 🎉</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
