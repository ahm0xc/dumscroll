import React from "react";

import SocialMediaUses from "./_components/social-media-uses";

export default function DashboardPage() {
  return (
    <div className="container mt-8">
      <section className="grid grid-cols-3 gap-4">
        <SocialMediaUses />
      </section>
    </div>
  );
}
