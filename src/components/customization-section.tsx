import React from "react";

import type { Customization } from "~/shared/config";

import { Switch } from "~/components/ui/switch";
import useChromeStorage from "~/hooks/use-chrome-storage";
import { SearchIcon } from "~/shared/icons";

type CustomizationSectionProps = {
  customizations: Customization[];
};

export default function CustomizationSection({
  customizations,
}: CustomizationSectionProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const sortedCustomizations = customizations.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const filteredCustomizations = sortedCustomizations.filter(
    customization =>
      customization.name.toLowerCase().includes(searchQuery.toLowerCase())
      || customization.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center h-10 rounded-lg bg-zinc-100 dark:bg-neutral-800 px-3 max-w-[300px]">
          <SearchIcon className="size-4 text-zinc-500 dark:text-neutral-400" />
          <input
            type="search"
            className="bg-transparent outline-none rounded-[inherit] w-full px-1 rounded-l-none"
            placeholder="Search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <section>
        <div className="w-full grid grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCustomizations.map(customization => (
            <CustomizationCard
              key={customization.id}
              customization={customization}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function CustomizationCard({
  customization,
}: {
  customization: Customization;
}) {
  const [isEnabled, setIsEnabled] = useChromeStorage(
    `cs-${customization.id}`,
    customization.defaultEnabled,
  );

  async function handleSwitchChange(checked: boolean) {
    setIsEnabled(checked);
  }

  return (
    <div className="bg-zinc-50 dark:bg-neutral-900 rounded-xl p-4 border space-y-2">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2 [&_svg]:size-5">
          {customization.icon && <customization.icon />}
          <h3 className="text-base font-medium">{customization.name}</h3>
        </div>
        <div>
          <Switch checked={isEnabled} onCheckedChange={handleSwitchChange} />
        </div>
      </div>
      <div>
        <p className="text-sm text-zinc-500 dark:text-neutral-400">
          {customization.description}
        </p>
      </div>
    </div>
  );
}
