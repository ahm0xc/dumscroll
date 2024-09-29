"use client";

import type React from "react";

interface CopyButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, ...props }) => {
  function handleCopy() {
    window.navigator.clipboard.writeText(text);
  }
  return <button type="button" onClick={handleCopy} {...props} />;
};

export default CopyButton;
