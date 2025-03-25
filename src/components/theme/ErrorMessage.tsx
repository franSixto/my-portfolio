import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="text-red-500/70 bg-red-500/10 px-2 inline-flex rounded-2xl text-sm">
            {message}
        </div>
    );
};

export default ErrorMessage;