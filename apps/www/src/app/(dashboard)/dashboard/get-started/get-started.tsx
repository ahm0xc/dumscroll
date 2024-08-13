"use client";

import React from "react";

import { ChromeIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";

import Link from "next/link";
import { Button } from "~/components/ui/button";

interface Props {
  licenseKey: string;
}

export default function GetStarted({ licenseKey }: Props) {
  function copyKey() {
    window.navigator.clipboard.writeText(licenseKey);
    toast.success("Copied!");
  }

  return (
    <div>
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Get started</h2>{" "}
        <p className="text-foreground/70">Get going with uses analytics and control.</p>
      </div>
      <div className="mt-10 p-8">
        <ol className="relative border-s border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400">
          <li className="mb-10 ms-6">
            <span className="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
              1
            </span>
            <div className="ml-2">
              <h3 className="font-medium leading-tight text-foreground">Install extension</h3>
              <p className="text-sm">Install extension from chrome webstore.</p>
              <Button
                className="mt-4 items-center gap-2"
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
            <span className="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
              2
            </span>
            <div className="ml-2">
              <h3 className="font-medium leading-tight text-foreground">Copy Keys</h3>
              <p className="text-sm">Copy the key bellow for initiating the extension.</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex w-fit items-center gap-2 rounded-lg border border-gray-300 bg-secondary px-3.5 py-1.5 text-secondary-foreground dark:border-primary/40 dark:bg-primary/20 dark:text-primary-foreground">
                  <p>{licenseKey}</p>
                </div>
                <Button
                  size="sm"
                  variant="default"
                  className="items-center gap-2 dark:border dark:border-primary/50 dark:bg-primary/40"
                  onClick={copyKey}
                >
                  <CopyIcon size={14} />
                  <p>Copy</p>
                </Button>
              </div>
            </div>
          </li>
          <li className="mb-10 ms-6">
            <span className="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
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
                  className="h-auto w-[500px] max-w-full rounded-lg border"
                  alt=""
                />
              </div>
            </div>
          </li>
          <li className="ms-6">
            <span className="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
              4
            </span>
            <div className="ml-2">
              <h3 className="font-medium leading-tight text-foreground">Get going.</h3>
              <p className="text-sm">
                Enjoy the extension 🎉. You can view analytics of you daily social media uses on
                Dashboard.
              </p>
              <div className="mt-4">
                <Button asChild>
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
