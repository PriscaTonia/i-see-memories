import PreFooter from "@/components/pre-footer";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="font-hagrid">
      <div className="container p-6 md:py-[60px] lg:max-w-[90%] md:px-6 flex flex-col gap-4">
        <h3 className="text-xl font-bold mt-6">
          Privacy Policy Summary for I see memories
        </h3>
        <p className="text-gray-700">
          This Privacy Policy explains how I see memories (&rdquo;we,&rdquo;
          &rdquo;us,&rdquo; or &rdquo;our&rdquo;) collects, uses, and shares
          your personal information when you visit or interact with
          iseememoriesng.com (the “Site”) or use our services.
        </p>

        <h3 className="text-xl font-bold mt-6">
          Changes to This Privacy Policy
        </h3>
        <p className="text-gray-700">
          We may update this Privacy Policy to reflect changes in our practices,
          laws, or regulations. The revised version will be posted on the Site
          with a new &rdquo;Last updated&rdquo; date.
        </p>

        <h3 className="text-xl font-bold mt-6">
          Information We Collect and How It’s Used
        </h3>

        <h4 className="text-lg font-semibold mt-4">
          Types of Personal Information Collected
        </h4>
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            <strong>Directly from You:</strong> Name, address, email, phone
            number, order details, account information, and customer support
            messages.
          </li>
          <li>
            <strong>Automatically (Usage Data):</strong> Device details, IP
            address, browser information, and interactions with the Site (via
            cookies and similar technologies).
          </li>
          <li>
            <strong>From Third Parties:</strong> Information from vendors and
            service providers supporting our Site and services (such as payment
            processors and Shopware).
          </li>
        </ul>

        <h4 className="text-lg font-semibold mt-4">Purpose of Use</h4>
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            <strong>Service Delivery:</strong> To fulfill orders, process
            payments, manage accounts, and communicate about purchases.
          </li>
          <li>
            <strong>Marketing:</strong> To send promotional materials or
            personalized advertisements.
          </li>
          <li>
            <strong>Security:</strong> To detect and prevent fraud or illegal
            activities.
          </li>
          <li>
            <strong>Customer Support:</strong> To improve services and respond
            to queries.
          </li>
          <li>
            <strong>Analytics:</strong> To understand and improve user
            interactions with our Site.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mt-4">Cookies</h4>
        <p className="text-gray-700">
          We use cookies to enhance Site functionality and track interactions.
          You can control cookie settings through your browser, though blocking
          cookies may impact your experience.
        </p>

        <h3 className="text-xl font-bold mt-6">
          Disclosure of Personal Information
        </h3>
        <p className="text-gray-700">We may disclose information to:</p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            <strong>Vendors and Third Parties:</strong> For services like
            payment processing, fulfillment, and data analytics.
          </li>
          <li>
            <strong>Business Partners:</strong> For marketing or service
            delivery purposes.
          </li>
          <li>
            <strong>Affiliates:</strong> Within our corporate group.
          </li>
          <li>
            <strong>In Legal Cases:</strong> For compliance, to enforce our
            Terms, or protect rights and users.
          </li>
        </ul>

        <h3 className="text-xl font-bold mt-6">User-Generated Content</h3>
        <p className="text-gray-700">
          If you post reviews or other content on public parts of our Site, it
          becomes publicly accessible. We do not control the privacy of
          information shared by users.
        </p>

        <h3 className="text-xl font-bold mt-6">Third-Party Links</h3>
        <p className="text-gray-700">
          Our Site may include links to third-party websites with their own
          privacy policies. We are not responsible for the privacy practices of
          these sites.
        </p>

        <h3 className="text-xl font-bold mt-6">Children’s Data</h3>
        <p className="text-gray-700">
          Our services are not intended for children, and we do not knowingly
          collect information from children under 16. Parents may contact us to
          request deletion of such information.
        </p>

        <h3 className="text-xl font-bold mt-6">Security and Data Retention</h3>
        <p className="text-gray-700">
          We use security measures to protect data but cannot guarantee absolute
          security. Retention periods vary based on legal, operational, and
          contractual requirements.
        </p>

        <h3 className="text-xl font-bold mt-6">User Rights</h3>
        <p className="text-gray-700">
          Depending on your location, you may have the following rights:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            <strong>Access:</strong> View personal information we hold about
            you.
          </li>
          <li>
            <strong>Delete:</strong> Request deletion of personal data.
          </li>
          <li>
            <strong>Correct:</strong> Update inaccurate information.
          </li>
          <li>
            <strong>Portability:</strong> Request a transfer of data.
          </li>
          <li>
            <strong>Restrict Processing:</strong> Limit how we use your
            information.
          </li>
          <li>
            <strong>Withdraw Consent:</strong> If we process data based on
            consent.
          </li>
          <li>
            <strong>Appeal:</strong> If your request is denied.
          </li>
        </ul>
        <p className="text-gray-700">
          To exercise these rights, use the contact information below. We do not
          discriminate against you for exercising your privacy rights.
        </p>

        <h3 className="text-xl font-bold mt-6">Complaints</h3>
        <p className="text-gray-700">
          For complaints about data processing, contact us using the details
          below. EEA residents can file complaints with their local data
          protection authority.
        </p>
      </div>

      <PreFooter />
    </section>
  );
};

export default PrivacyPolicy;
