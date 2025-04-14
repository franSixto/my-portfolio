import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 h-15 text-gray-400 dark:text-gray-300 py-4">
            <div className="container mx-auto flex justify-center space-x-6">
            <Link href="/" className="hover:underline">
                Home
            </Link>
            <Link href="/about" className="hover:underline">
                About
            </Link>
            <Link href="/projects" className="hover:underline">
                Projects
            </Link>
            <Link href="/contact" className="hover:underline">
                Contact
            </Link>
            </div>
        </footer>
    );
};

export default Footer;