import { useState, useEffect } from "react";

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Cambia el tiempo según sea necesario (en milisegundos)

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-950 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
    </div>
  );
};

export default SplashScreen;