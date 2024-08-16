import React from "react";

import { Footer, Header } from "~/app/(landing)/home/page";
import { appConfig } from "~/config/general";

export default function RefundPrivacyPage() {
  const effectiveDate = "2028-10-12";

  return (
    <div>
      <Header />
      <div className="prose mx-auto max-w-3xl pb-20 pt-32 dark:prose-invert">
        <div aria-label="refund policy">
          <h1>Refund Policy</h1>
          <p>
            <strong>Effective Date:</strong> {effectiveDate}
          </p>

          <h3>Introduction</h3>
          <p>
            At {appConfig.name}, we aim to provide a reliable service to help manage your online
            habits.
          </p>

          <h3>Refund Policy</h3>
          <ul>
            <li>
              <strong>Eligibility for Refund:</strong> We will process a refund within 7 days if you
              encounter an unsolvable issue, and your account is non-functional or severely broken.
            </li>
            <li>
              <strong>Refund Process:</strong> To request a refund, contact our support team with
              details of the issue. We will assess the situation and confirm the eligibility for a
              refund.
            </li>
            <li>
              <strong>No Guaranteed Refunds:</strong> Outside of the scenarios described, we do not
              offer any money-back guarantees or refunds.
            </li>
          </ul>

          <h3>Contact Information</h3>
          <p>
            For any refund requests or support issues, please reach out to us at
            {appConfig.contact}.
          </p>

          <h3>Amendments to Refund Policy</h3>
          <p>
            We may update this refund policy from time to time. Please review it periodically to
            stay informed of any changes.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
