import React from 'react';
import { useColorContext, COLOR_CLASS_MAP } from './ColorContext';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    const { mainColor } = useColorContext();
    // Para el texto y fondo, usamos clases estáticas para cada color
    const textClass = `text-${mainColor}-500/70`;
    const bgClass = `bg-${mainColor}-500/10`;
    // Alternativamente, podrías mapear también estos valores si necesitas más control
    return (
        <div className={`${textClass} ${bgClass} px-2 inline-flex rounded-2xl text-sm`}>
            {message}
        </div>
    );
};

export default ErrorMessage;