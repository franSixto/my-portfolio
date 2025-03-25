import React from 'react';

interface LabelProps {
    text: string;
    htmlFor?: string;
}

const Label: React.FC<LabelProps> = ({ text, htmlFor }) => {
    return (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-900 dark:text-gray-200">
            {text}
        </label>
    );
};

export default Label;