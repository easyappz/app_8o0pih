import React, { useState } from 'react';
import { Button, Input, Layout, Typography } from 'antd';
import './Calculator.css';

const { Content } = Layout;
const { Title } = Typography;

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [previousValue, setPreviousValue] = useState('');
  const [operation, setOperation] = useState('');
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
      setCurrentValue(value);
    } else {
      if (value === '.' && display.includes('.')) {
        return;
      }
      setDisplay(display + value);
      setCurrentValue(currentValue + value);
    }
  };

  const handleOperationClick = (op) => {
    setPreviousValue(currentValue);
    setCurrentValue('');
    setOperation(op);
    setWaitingForSecondValue(true);
    setDisplay(op);
  };

  const calculateResult = () => {
    if (!previousValue || !currentValue || !operation) return;

    let result = 0;
    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);

    switch (operation) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '×':
        result = prev * curr;
        break;
      case '÷':
        if (curr === 0) {
          setDisplay('Ошибка');
          return;
        }
        result = prev / curr;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setCurrentValue(result.toString());
    setPreviousValue('');
    setOperation('');
    setWaitingForSecondValue(false);
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue('');
    setPreviousValue('');
    setOperation('');
    setWaitingForSecondValue(false);
  };

  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '='
  ];

  return (
    <Layout className="calculator-layout">
      <Content className="calculator-content">
        <Title level={2} className="calculator-title">Калькулятор</Title>
        <Input
          className="calculator-display"
          value={display}
          disabled
        />
        <div className="calculator-buttons">
          {buttons.map((btn) => (
            <Button
              key={btn}
              className={`calculator-button ${btn === '=' ? 'equals-button' : ''}`}
              onClick={() => {
                if (btn === 'C') handleClear();
                else if (btn === '=') calculateResult();
                else if (['+', '-', '×', '÷'].includes(btn)) handleOperationClick(btn);
                else handleNumberClick(btn);
              }}
            >
              {btn}
            </Button>
          ))}
        </div>
      </Content>
    </Layout>
  );
};

export default Calculator;
