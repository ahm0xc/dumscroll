import React from "react";

import ThemeSwitcher from "~/components/theme-switcher";
import { Button } from "~/components/ui/button";

export default function Popup() {
  return (
    <div className="w-[464px] p-4">
      <Button>Hello</Button>
      <ThemeSwitcher />
    </div>
  );
}
