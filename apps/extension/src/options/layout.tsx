import type React from "react";
import Sidebar from "./sidebar";

export default function OptionsLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="w-full grid grid-cols-[300px_1fr] text-[16px]">
      <div className="h-screen">
        <Sidebar />
      </div>
      <div>{children}</div>
    </div>
  );
}
