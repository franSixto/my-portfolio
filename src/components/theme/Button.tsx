import Link from "next/link";

interface ButtonProps {
    to: string;
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "outlined";
    target?: "_self" | "_blank" | "_parent" | "_top";
}

const Button: React.FC<ButtonProps> = ({ to, children, className = '', variant = "default", target = "_self" }) => {
    const baseStyles = "flex items-center px-4 py-3 rounded-lg transition transform duration-300 hover:scale-105 active:scale-95 ease-in-out";
    const defaultStyles = "text-gray-800 dark:text-gray-200 bg-red-100 hover:bg-red-200 dark:bg-red-500/10 dark:hover:bg-red-500/20";
    const outlinedStyles = "text-gray-800 dark:text-gray-200 bg-red-100 hover:bg-red-200 dark:bg-red-500/10 dark:hover:bg-red-500/20";

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