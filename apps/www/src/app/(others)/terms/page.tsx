import React from "react";

import { Footer, Header } from "~/app/(landing)/home/page";
import { appConfig } from "~/config/general";

export default function TermsPage() {
  const effectiveDate = "2028-10-12";
  const jurisdiction =
    "This refund policy is governed by the laws of US. Any disputes related to refunds will be resolved in the courts of US.";

  return (
    <div>
      <Header />
      <div className="prose mx-auto max-w-3xl pb-20 pt-32 dark:prose-invert">
        <div aria-label="terms and condition">
          <h1>Terms and Conditions</h1>
          <p>
            <strong>Effective Date:</strong> {effectiveDate}
          </p>

          <h3>1. Introduction</h3>
          <p>
            Welcome to {appConfig.name}! By using our services, you agree to these terms and
            conditions. {appConfig.name} is committed to helping users manage their online habits by
            tracking their time on various websites.
          </p>

          <h3>2. Service Description</h3>
          <p>
            {appConfig.name} provides a tool that tracks the time users spend on specific websites.
            This data is used solely for generating reports that offer insights into your online
            browsing habits.
          </p>

          <h3>3. Data Collection</h3>
          <p>
            {appConfig.name} does not collect personal information such as IP addresses, device
            details, or browser information. The only data collected is the time spent on specific
            websites.
          </p>

          <h3>4. Data Usage</h3>
          <p>
            The data collected is used to generate reports to help you understand your browsing
            behavior. This data is not shared with third parties.
          </p>

          <h3>5. User Responsibilities</h3>
          <p>
            Users are responsible for their account security and for ensuring the accuracy of the
            data they provide. Misuse of the service, including attempts to manipulate the data, is
            prohibited.
          </p>

          <h3>6. Data Retention and Deletion</h3>
          <p>
            {appConfig.name} retains data for a maximum of three months. After this period, data is
            automatically deleted from our servers. Users have the option to download their monthly
            or three-monthly reports before deletion.
          </p>

          <h3>7. Service Availability</h3>
          <p>
            While {appConfig.name} strives to provide uninterrupted service, there may be occasions
            when the service is temporarily unavailable due to maintenance or other factors beyond
            our control.
          </p>

          <h3>8. Liability</h3>
          <p>
            {appConfig.name} is not liable for any losses or damages resulting from using the
            service, including any data loss. Users are responsible for maintaining backups of any
            data they wish to retain.
          </p>

          <h3>9. Amendments to Terms</h3>
          <p>
            {appConfig.name} may update these Terms and Conditions from time to time. We encourage
            users to review them periodically to stay informed of any changes.
          </p>

          <h3>10. Governing Law</h3>
          <p>
            These Terms and Conditions are governed by and construed by the laws of {jurisdiction}.
            Any disputes arising from these terms will be resolved in the courts of {jurisdiction}.
          </p>

          <h3>11. Contact Information</h3>
          <p>
            If you have any questions or concerns about these Terms and Conditions, please contact
            us at {appConfig.contact}.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
