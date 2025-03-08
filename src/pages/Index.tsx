
import { useState, useEffect } from "react";
import Calculator from "@/components/Calculator";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Palette } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const colorThemes = [
  { name: "Purple (Default)", main: "#8B5CF6", secondary: "#D946EF" },
  { name: "Blue", main: "#3B82F6", secondary: "#60A5FA" },
  { name: "Green", main: "#10B981", secondary: "#34D399" },
  { name: "Red", main: "#EF4444", secondary: "#F87171" },
  { name: "Orange", main: "#F59E0B", secondary: "#FBBF24" },
  { name: "Pink", main: "#EC4899", secondary: "#F472B6" },
  { name: "Teal", main: "#14B8A6", secondary: "#2DD4BF" },
  { name: "Indigo", main: "#6366F1", secondary: "#818CF8" },
]

const Index = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [calculatorColor, setCalculatorColor] = useState({ 
    main: "#8B5CF6", 
    secondary: "#D946EF" 
  });

  useEffect(() => {
    // Apply theme to document body
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Apply calculator colors
    document.documentElement.style.setProperty('--calculator-main', calculatorColor.main);
    document.documentElement.style.setProperty('--calculator-secondary', calculatorColor.secondary);
  }, [theme, calculatorColor]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const changeCalculatorColor = (main: string, secondary: string) => {
    setCalculatorColor({ main, secondary });
  };

  return (
    <div className="min-h-screen py-4 sm:py-8 px-2 sm:px-4 transition-colors duration-300 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto">
        <div className="flex justify-end gap-2 mb-2 sm:mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
                aria-label="Change calculator color"
              >
                <Palette className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2">
              <h3 className="font-medium mb-2">Calculator Color</h3>
              <div className="grid grid-cols-2 gap-2">
                {colorThemes.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => changeCalculatorColor(color.main, color.secondary)}
                    className="p-2 rounded-md text-xs hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${color.main}, ${color.secondary})`
                        }}
                      />
                      <span>{color.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
        </div>
        
        <div className="flex flex-col items-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-calculator-main bg-clip-text text-transparent bg-gradient-to-r from-calculator-main to-calculator-secondary">
            Sleek Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm sm:text-base max-w-md">
            A modern, responsive calculator with beautiful animations and a clean interface.
          </p>
        </div>
        
        <Calculator />
        
        <footer className="mt-6 sm:mt-10 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Created by Samar</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
