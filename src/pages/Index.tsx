
import { useState, useEffect } from "react";
import Calculator from "@/components/Calculator";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const Index = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Apply theme to document body
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen py-8 px-4 transition-colors duration-300 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto">
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full h-10 w-10"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-calculator-main bg-clip-text text-transparent bg-gradient-to-r from-calculator-main to-calculator-secondary">
            Sleek Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
            A modern, responsive calculator with beautiful animations and a clean interface.
          </p>
        </div>
        
        <Calculator />
        
        <footer className="mt-10 text-center">
          <p className="text-gray-600 dark:text-gray-400">Created by Samar</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
