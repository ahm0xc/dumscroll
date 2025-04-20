import { cn } from "~/lib/utils";

import { useTheme } from "./theme-provider";

type ThemedImageProps = {
  src: {
    light: string;
    dark: string;
  };
  alt: string;
  className?: string;
  id?: string;
};

export default function ThemedImage({
  src,
  alt,
  className,
  ...props
}: ThemedImageProps) {
  const { resolvedTheme } = useTheme();

  return (
    <img
      src={resolvedTheme === "dark" ? src.dark : src.light}
      alt={alt}
      className={cn(className)}
      {...props}
    />
  );
}
