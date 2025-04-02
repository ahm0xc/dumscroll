import React from "react";
import { Customization } from "~/shared/config";

interface CustomizationSectionProps {
  customizations: Customization[];
}

export default function CustomizationSection({
  customizations,
}: CustomizationSectionProps) {
  return (
    <div>
      <div></div>
      <section>
        <div className="w-full grid grid-cols-2 xl:grid-cols-3 gap-4">
          {customizations.map((customization) => (
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
  return (
    <div className="bg-zinc-50 dark:bg-neutral-900 rounded-xl p-4 border">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2 [&_svg]:size-4">
          {customization.icon && <customization.icon />}
          <h3 className="text-base font-medium">{customization.name}</h3>
        </div>
        <div>swi</div>
      </div>
    </div>
  );
}
