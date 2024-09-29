import type React from "react";

import { Button } from "~/components/ui/button";
import { Header } from "../home/page";
import CopyLicenseButton from "./copy-license-buttont";

const GetStartedPage: React.FC = () => {
  return (
    <div className="flex">
      <div>
        <Header />
      </div>
      <div className="grid h-screen w-full place-content-center">
        <Card />
      </div>
    </div>
  );
};

export default GetStartedPage;

const Step = ({ number, title, description, link, linkText, actionButton }: any) => {
  return (
    <div className="mb-4 flex items-start space-x-3">
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
        {number}
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-foreground/50">
          {description}
          {link && (
            <a href={link} className="ml-1 text-blue-500 hover:underline">
              {linkText}
            </a>
          )}
        </p>
        <div>{}</div>
      </div>
    </div>
  );
};

const Card = () => {
  const steps = [
    {
      number: 1,
      title: "Install the extension",
      description: "Download the extension from the google chrome web store.",
      actionButton: (
        <Button asChild>
          <a href="/">Get Extension</a>
        </Button>
      ),
    },
    {
      number: 2,
      title: "Configure URLs",
      description: "Configure redirect URLs coming from WorkOS back to your application.",
      link: "#",
      linkText: "Configure redirect URLs",
    },
    {
      number: 3,
      title: "Create an Organization",
      description: "Create an organization and add connections or directories for your customers.",
      link: "#",
      linkText: "Create an organization",
    },
  ];

  return (
    <div className="mx-auto max-w-md rounded-lg border bg-secondary/20 p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Setup your extension</h2>
      <div className="mb-4">
        <div className="mb-2">
          <label className="text-sm text-foreground/80">License Key</label>
          <div className="flex items-center rounded-md border p-2">
            <input
              type="text"
              value="client_01H98CAFNF94JA..."
              className="flex-grow bg-transparent outline-none"
              readOnly
            />
            <CopyLicenseButton license="" />
          </div>
        </div>
      </div>
      <div>
        {steps.map((step) => (
          <Step key={step.number} {...step} />
        ))}
      </div>
    </div>
  );
};
