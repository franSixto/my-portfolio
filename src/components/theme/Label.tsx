import React from "react";

interface LabelProps {
  text: string;
  htmlFor?: string;
}

const Label: React.FC<LabelProps> = ({ text, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-meta font-medium text-ink">
      {text}
    </label>
  );
};

export default Label;
