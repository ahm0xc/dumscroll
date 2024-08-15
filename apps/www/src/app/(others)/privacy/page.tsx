import React from "react";

import { Footer, Header } from "~/app/(landing)/home/page";
import { appConfig } from "~/config/general";

export default function PrivacyPage() {
  const effectiveDate = "2028-10-12";

  return (
    <div>
      <Header />
      <div className="prose mx-auto max-w-3xl pb-20 pt-32 dark:prose-invert">
        <div aria-label="privacy-policy">
          <h1>Privacy Policy</h1>
          <p>
            <strong>Effective Date:</strong> {effectiveDate}
          </p>
          <h3>1. Introduction</h3>
          <p>
            Welcome to {appConfig.name}! We are committed to helping users
            manage their online habits by tracking their time on various
            websites. Your privacy and data security are important to us. This
            Privacy Policy explains what data we collect, how we use it, and the
            steps we take to ensure your information remains secure.
          </p>
          <h3>2. Data We Collect</h3>
          <p>
            {appConfig.name} does not collect any personal information such as
            IP addresses, device details, or browser information. The only data
            we collect is the time you spend on specific websites. This data is
            solely to provide you with insights into your browsing habits.
          </p>
          <h3>3. Data Usage</h3>
          <p>
            The data we collect is used to generate reports that help you
            understand where you spend your time online. These reports are
            designed to assist you in managing your online activities and
            avoiding distractions. We do not share this data with any third
            parties.
          </p>
          <h3>4. Data Storage and Security</h3>
          <p>
            We store your data in a secure database using SHA-256 encryption.
            This ensures that your information is protected from unauthorized
            access. We are committed to maintaining the highest standards of
            data security.
          </p>
          <h3>5. User Access and Control</h3>
          <p>
            You have full control over your data. {appConfig.name} allows you to
            download monthly and three-monthly reports of your browsing
            activity. To protect your privacy, we automatically delete data
            older than three months from our servers.
          </p>
          <h3>6. Data Retention and Deletion</h3>
          <p>
            We retain your data for a maximum of three months. After this
            period, the data is permanently deleted from our servers. We do not
            keep any backups or records of this deleted data.
          </p>
          <h3>7. Changes to This Privacy Policy</h3>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We encourage you to review this policy
            periodically.
          </p>
          <h3>8. Contact Us</h3>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please get in touch with us at{" "}
            <a href={`mailto:${appConfig.contact}`}>{appConfig.contact}</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
