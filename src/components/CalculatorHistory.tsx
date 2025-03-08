
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2 } from 'lucide-react';

type CalculatorHistoryProps = {
  history: string[];
  onClear: () => void;
};

const CalculatorHistory = ({ history, onClear }: CalculatorHistoryProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-calculator-main">History</h2>
        {history.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClear}
            className="h-8 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {history.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No calculation history yet
          </div>
        ) : (
          <ul className="space-y-2">
            {history.map((item, index) => (
              <li key={index} className="calculator-history-item" style={{ animationDelay: `${index * 0.05}s` }}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CalculatorHistory;
