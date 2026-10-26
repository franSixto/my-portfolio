import React from "react";

interface ErrorMessageProps {
  message: string;
  id?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, id }) => {
  return (
    <p id={id} className="motion-enter mt-2 text-meta font-medium text-danger">
      {message}
    </p>
  );
};

export default ErrorMessage;
