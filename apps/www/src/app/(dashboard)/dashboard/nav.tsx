import Link from "next/link";

import { cn } from "~/lib/utils";

export default function Nav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-5", className)} {...props}>
      <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link
        href="/knowledge"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Knowledge
      </Link>
    </nav>
  );
}
