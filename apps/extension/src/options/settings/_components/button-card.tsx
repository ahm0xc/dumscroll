import type { ReactNode } from "react";

import { Button, type ButtonProps } from "~/components/ui/button";

export default function ButtonCard({
  title,
  description,
  children,
  buttonProps,
}: {
  title: string;
  description: string;
  children: ReactNode;
  buttonProps?: ButtonProps;
}) {
  return (
    <div className="p-5 border rounded-lg flex gap-6 bg-neutral-100 flex-col">
      <div>
        <p className="text-neutral-900 text-lg font-medium">{title}</p>
        <p className="text-sm mt-1 text-neutral-700">{description}</p>
      </div>
      <div>
        <Button {...buttonProps}>{children}</Button>
      </div>
    </div>
  );
}
