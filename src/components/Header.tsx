import ThemeSelect from "./theme/ThemeSelect";

export default function Header() {
    return (
        <header className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 py-4">
            <nav className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-6">
                <h1 className="text-xl font-bold">Fran Sixto</h1>
                <ul className="flex space-x-6">
                    <li><a href="/" className="hover:text-gray-500 dark:hover:text-gray-300">Home</a></li>
                    <li><a href="/about" className="hover:text-gray-500 dark:hover:text-gray-300">About</a></li>
                    <li><a href="/projects" className="hover:text-gray-500 dark:hover:text-gray-300">Projects</a></li>
                    <li><a href="/contact" className="hover:text-gray-500 dark:hover:text-gray-300">Contact</a></li>
                </ul>
                <ThemeSelect />
            </nav>
        </header>
    );
};