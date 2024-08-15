import React from "react";
import { Footer, Header } from "~/app/(landing)/home/page";
import { appConfig } from "~/config/general";

export default function Privacy() {
  const effectiveDate = "2028-10-12";
  const jurisdiction = "This refund policy is governed by the laws of US. Any disputes related to refunds will be resolved in the courts of US."

  return (
    <div>
      <Header />
      <div className="prose mx-auto max-w-3xl pb-20 pt-32 dark:prose-invert">
        <div aria-label="privacy-policy">
          <h2>Privacy Policy</h2>
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
        <div aria-label="terms and condition" className="pt-12">
          <h2>Terms and Conditions</h2>
          <p>
            <strong>Effective Date:</strong> {effectiveDate}
          </p>

          <h3>1. Introduction</h3>
          <p>
            Welcome to {appConfig.name}! By using our services, you agree to
            these terms and conditions. {appConfig.name} is committed to helping
            users manage their online habits by tracking their time on various
            websites.
          </p>

          <h3>2. Service Description</h3>
          <p>
            {appConfig.name} provides a tool that tracks the time users spend on
            specific websites. This data is used solely for generating reports
            that offer insights into your online browsing habits.
          </p>

          <h3>3. Data Collection</h3>
          <p>
            {appConfig.name} does not collect personal information such as IP
            addresses, device details, or browser information. The only data
            collected is the time spent on specific websites.
          </p>

          <h3>4. Data Usage</h3>
          <p>
            The data collected is used to generate reports to help you
            understand your browsing behavior. This data is not shared with
            third parties.
          </p>

          <h3>5. User Responsibilities</h3>
          <p>
            Users are responsible for their account security and for ensuring
            the accuracy of the data they provide. Misuse of the service,
            including attempts to manipulate the data, is prohibited.
          </p>

          <h3>6. Data Retention and Deletion</h3>
          <p>
            {appConfig.name} retains data for a maximum of three months. After
            this period, data is automatically deleted from our servers. Users
            have the option to download their monthly or three-monthly reports
            before deletion.
          </p>

          <h3>7. Service Availability</h3>
          <p>
            While {appConfig.name} strives to provide uninterrupted service,
            there may be occasions when the service is temporarily unavailable
            due to maintenance or other factors beyond our control.
          </p>

          <h3>8. Liability</h3>
          <p>
            {appConfig.name} is not liable for any losses or damages resulting
            from using the service, including any data loss. Users are
            responsible for maintaining backups of any data they wish to retain.
          </p>

          <h3>9. Amendments to Terms</h3>
          <p>
            {appConfig.name} may update these Terms and Conditions from time to
            time. We encourage users to review them periodically to stay
            informed of any changes.
          </p>

          <h3>10. Governing Law</h3>
          <p>
            These Terms and Conditions are governed by and construed by the laws
            of {jurisdiction}. Any disputes arising from these terms will
            be resolved in the courts of {jurisdiction}.
          </p>

          <h3>11. Contact Information</h3>
          <p>
            If you have any questions or concerns about these Terms and
            Conditions, please contact us at {appConfig.contact}.
          </p>
        </div>
        <div aria-label="refund policy" className="pt-12">
          <h2>Refund Policy for {appConfig.name}</h2>
          <p>
            <strong>Effective Date:</strong> {effectiveDate}
          </p>

          <h3>Introduction</h3>
          <p>
            At {appConfig.name}, we aim to provide a reliable service to help
            manage your online habits.
          </p>

          <h3>Refund Policy</h3>
          <ul>
            <li>
              <strong>Eligibility for Refund:</strong> We will process a refund
              within 7 days if you encounter an unsolvable issue, and your
              account is non-functional or severely broken.
            </li>
            <li>
              <strong>Refund Process:</strong> To request a refund, contact our
              support team with details of the issue. We will assess the
              situation and confirm the eligibility for a refund.
            </li>
            <li>
              <strong>No Guaranteed Refunds:</strong> Outside of the scenarios
              described, we do not offer any money-back guarantees or refunds.
            </li>
          </ul>

          <h3>Contact Information</h3>
          <p>
            For any refund requests or support issues, please reach out to us at
            {appConfig.contact}.
          </p>

          <h3>Amendments to Refund Policy</h3>
          <p>
            We may update this refund policy from time to time. Please review it
            periodically to stay informed of any changes.
          </p>

          {/* <h3>Governing Law</h3>
          <p>
            This refund policy is governed by the laws of {jurisdiction}.
            Any disputes related to refunds will be resolved in the courts of
            {jurisdiction}.
          </p> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
