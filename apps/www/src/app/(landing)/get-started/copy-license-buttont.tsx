"use client";

import { CopyCheckIcon, CopyIcon } from "lucide-react";
import React from "react";

import CopyButton from "~/components/copy-button";

interface CopyLicenseButtonProps {
  license: string;
}

const CopyLicenseButton: React.FC<CopyLicenseButtonProps> = ({ license }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        window.navigator.clipboard.writeText(license);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      }}
    >
      {isCopied ? <CopyCheckIcon size={15} className="text-green-600" /> : <CopyIcon size={15} />}
    </button>
  );
};

export default CopyLicenseButton;
