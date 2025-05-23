import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    
    // Para el texto y fondo, usamos clases estáticas para cada color
    const textClass = `text-red-500/70`;
    const bgClass = `bg-red-500/10`;
    // Alternativamente, podrías mapear también estos valores si necesitas más control
    return (
        <div className={`${textClass} ${bgClass} px-2 inline-flex rounded-2xl text-sm`}>
            {message}
        </div>
    );
};

export default ErrorMessage;