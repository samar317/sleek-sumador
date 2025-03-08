
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Calculator as CalculatorIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import CalculatorButton from './CalculatorButton';
import CalculatorHistory from './CalculatorHistory';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operation, setOperation] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const { toast } = useToast();

  const clearAll = () => {
    setDisplayValue('0');
    setOperation(null);
    setPreviousValue(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
    } else if (displayValue.indexOf('.') === -1) {
      setDisplayValue(displayValue + '.');
    }
  };

  const toggleSign = () => {
    setDisplayValue(displayValue.charAt(0) === '-' ? displayValue.substring(1) : '-' + displayValue);
  };

  const inputPercent = () => {
    const value = parseFloat(displayValue) / 100;
    setDisplayValue(String(value));
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(displayValue);
      setWaitingForOperand(true);
      setOperation(nextOperation);
      return;
    }

    const currentValue = parseFloat(previousValue);
    let newValue = 0;

    switch (operation) {
      case '+':
        newValue = currentValue + inputValue;
        break;
      case '-':
        newValue = currentValue - inputValue;
        break;
      case '×':
        newValue = currentValue * inputValue;
        break;
      case '÷':
        if (inputValue === 0) {
          toast({
            title: "Error",
            description: "Cannot divide by zero",
            variant: "destructive"
          });
          clearAll();
          return;
        }
        newValue = currentValue / inputValue;
        break;
      default:
        newValue = inputValue;
    }

    const calculation = `${previousValue} ${operation} ${displayValue} = ${newValue}`;
    setHistory([calculation, ...history.slice(0, 9)]);
    
    setDisplayValue(String(newValue));
    setPreviousValue(String(newValue));
    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    let { key } = event;

    if (key === 'Enter') key = '=';
    if (key === '*') key = '×';
    if (key === '/') key = '÷';

    if (/\d/.test(key)) {
      event.preventDefault();
      inputDigit(key);
    } else if (key === '.') {
      event.preventDefault();
      inputDecimal();
    } else if (key === '+' || key === '-' || key === '×' || key === '÷') {
      event.preventDefault();
      performOperation(key);
    } else if (key === '=') {
      event.preventDefault();
      if (operation) performOperation('=');
    } else if (key === 'Backspace') {
      event.preventDefault();
      if (displayValue !== '0') {
        setDisplayValue(displayValue.length === 1 ? '0' : displayValue.slice(0, -1));
      }
    } else if (key === 'Escape') {
      event.preventDefault();
      clearAll();
    } else if (key === '%') {
      event.preventDefault();
      inputPercent();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [displayValue, operation, previousValue, waitingForOperand]);

  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 w-full max-w-3xl mx-auto h-full p-4">
      <div className="calculator-container w-full md:w-96 p-4 animate-scale-in">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <CalculatorIcon className="h-5 w-5 text-calculator-main" />
            <h1 className="text-lg font-semibold text-calculator-main">Sleek Calculator</h1>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm text-calculator-operator flex items-center gap-1 transition-colors hover:text-calculator-main"
          >
            {showHistory ? "Hide History" : "Show History"}
          </button>
        </div>
        
        <div className="calculator-display h-24 mb-6 flex flex-col justify-end">
          {operation && previousValue && (
            <div className="calculator-input">
              {previousValue} {operation}
            </div>
          )}
          <div className="calculator-result">{displayValue}</div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <CalculatorButton 
            onClick={clearAll} 
            variant="secondary" 
            className="text-calculator-secondary"
          >
            AC
          </CalculatorButton>
          <CalculatorButton 
            onClick={toggleSign} 
            variant="secondary" 
            className="text-calculator-secondary"
          >
            +/-
          </CalculatorButton>
          <CalculatorButton 
            onClick={inputPercent} 
            variant="secondary" 
            className="text-calculator-secondary"
          >
            %
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => performOperation('÷')} 
            variant="operator" 
            active={operation === '÷'}
          >
            ÷
          </CalculatorButton>
          
          <CalculatorButton onClick={() => inputDigit('7')}>7</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit('8')}>8</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit('9')}>9</CalculatorButton>
          <CalculatorButton 
            onClick={() => performOperation('×')} 
            variant="operator" 
            active={operation === '×'}
          >
            ×
          </CalculatorButton>
          
          <CalculatorButton onClick={() => inputDigit('4')}>4</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit('5')}>5</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit('6')}>6</CalculatorButton>
          <CalculatorButton 
            onClick={() => performOperation('-')} 
            variant="operator" 
            active={operation === '-'}
          >
            -
          </CalculatorButton>
          
          <CalculatorButton onClick={() => inputDigit('1')}>1</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit('2')}>2</CalculatorButton>
          <CalculatorButton onClick={() => inputDigit('3')}>3</CalculatorButton>
          <CalculatorButton 
            onClick={() => performOperation('+')} 
            variant="operator" 
            active={operation === '+'}
          >
            +
          </CalculatorButton>
          
          <CalculatorButton 
            onClick={() => inputDigit('0')} 
            className="col-span-2"
          >
            0
          </CalculatorButton>
          <CalculatorButton onClick={inputDecimal}>.</CalculatorButton>
          <CalculatorButton 
            onClick={() => performOperation('=')} 
            variant="equals"
          >
            =
          </CalculatorButton>
        </div>
      </div>
      
      {showHistory && (
        <div className={cn(
          "calculator-container w-full md:w-64 p-4 animate-fade-in",
        )}>
          <CalculatorHistory history={history} onClear={() => setHistory([])} />
        </div>
      )}
    </div>
  );
};

export default Calculator;
