
import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-calculator-main bg-clip-text text-transparent bg-gradient-to-r from-calculator-main to-calculator-secondary">
            Sleek Calculator
          </h1>
          <p className="text-gray-600 text-center max-w-md">
            A modern, responsive calculator with beautiful animations and a clean interface.
          </p>
        </div>
        
        <Calculator />
      </div>
    </div>
  );
};

export default Index;
