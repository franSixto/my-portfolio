import Link from "next/link";
import { useColorContext, COLOR_CLASS_MAP } from './ColorContext';

interface ButtonProps {
    to: string;
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "outlined";
    target?: "_self" | "_blank" | "_parent" | "_top";
}

const Button: React.FC<ButtonProps> = ({ to, children, className = '', variant = "default", target = "_self" }) => {
    const { mainColor } = useColorContext();
    const baseStyles = "flex items-center px-4 py-3 rounded-lg transition transform duration-300 hover:scale-105 active:scale-95 ease-in-out";
    const textStyles = "text-gray-800 dark:text-gray-200";
    const colorStyles = COLOR_CLASS_MAP[mainColor];
    const defaultStyles = `${textStyles} ${colorStyles}`;
    const outlinedStyles = `${textStyles} ${colorStyles}`;
    const variantStyles = variant === "outlined" ? outlinedStyles : defaultStyles;

    return (
        <Link
            href={to}
            target={target}
            className={`${baseStyles} ${variantStyles} ${className}`}
        >
            {children}
        </Link>
    );
};

export default Button;