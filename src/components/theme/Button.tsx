import Link from "next/link";

interface ButtonProps {
    to: string;
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "outlined";
    target?: "_self" | "_blank" | "_parent" | "_top";
}

const Button: React.FC<ButtonProps> = ({ to, children, className = '', variant = "default", target = "_self" }) => {
    const baseStyles = "flex items-center px-6 py-3 rounded-lg shadow-md transition transform duration-300 hover:scale-105 ease-in-out";
    const defaultStyles = "text-white bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600";
    const outlinedStyles = "text-red-500 border border-red-500 hover:bg-red-500 hover:text-white dark:text-red-500 dark:border-red-500 dark:hover:bg-red-500 dark:hover:text-white";

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