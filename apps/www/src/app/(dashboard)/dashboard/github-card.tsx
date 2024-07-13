import { CircleIcon, StarIcon } from "@radix-ui/react-icons";
import axios from "axios";

import { buttonVariants } from "~/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { cn, formatNumber } from "~/lib/utils";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default async function GithubCard() {
  const owner = "ahm0xc";
  const repo = "dumscroll";

  const data = await fetch(`https://api.github.com/repos/${owner}/${repo}`).then(r => r.json());

  return (
    <Card className="border-none rounded-[inherit] h-full flex flex-col">
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-base">
            {owner}/{repo}
          </CardTitle>
          <CardDescription>
            Beautifully designed components that you can copy and paste into your apps. Accessible.
            Customizable. Open Source.
          </CardDescription>
        </div>
        <div className="flex justify-end">
          <a
            className={cn(buttonVariants({ variant: "secondary" }), "px-3")}
            href={`https://github.com/${owner}/${repo}`}
            target="_blank"
            rel="noreferrer"
          >
            <StarIcon className="mr-2 h-4 w-4" />
            Star
          </a>
        </div>
      </CardHeader>
      {/* <CardContent></CardContent> */}
      <CardFooter className="mt-auto">
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            {data.language}
          </div>
          <div className="flex items-center">
            <StarIcon className="mr-1 h-3 w-3" />
            {formatNumber(data.stargazers_count)}
          </div>
          <div>
            Updated {months[new Date(data.updated_at).getMonth()]}{" "}
            {new Date(data.updated_at).getDate()}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
