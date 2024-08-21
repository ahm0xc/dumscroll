import { Switch } from "~/components/ui/switch";
import { cn } from "~/lib/utils";

export default function SwitchCard({
  title,
  description,
  checked,
  onCheckedChange,
  comingSoon = false,
}: {
  title?: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  comingSoon?: boolean;
}) {
  return (
    <div
      className={cn(
        "p-5 border rounded-lg flex items-center gap-8 justify-between bg-neutral-100",
        comingSoon && "pointer-events-none opacity-50",
      )}
    >
      <div>
        {comingSoon && <p className="text-[11px] uppercase text-foreground/80">coming soon</p>}
        {title && <p className="text-neutral-900 text-lg font-medium">{title}</p>}
        {description && <p className="text-sm mt-1 text-neutral-700">{description}</p>}
      </div>
      <div>
        <Switch id={title} checked={checked} onCheckedChange={onCheckedChange} />
      </div>
    </div>
  );
}
