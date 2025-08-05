import React, { useState } from 'react';
import { Button, Input, Card, Typography, Space, Divider } from 'antd';
import './Calculator.css';

const { Title, Text } = Typography;

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      if (value === '.' && display.includes('.')) {
        return;
      }
      setDisplay(display + value);
    }
    if (waitingForSecondValue) {
      setWaitingForSecondValue(false);
    }
  };

  const handleOperationClick = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondValue(true);
    setDisplay('0');
  };

  const calculateResult = () => {
    if (!previousValue || !operation) return;

    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = previousValue + current;
        break;
      case '-':
        result = previousValue - current;
        break;
      case '*':
        result = previousValue * current;
        break;
      case '/':
        if (current === 0) {
          setDisplay('Ошибка');
          return;
        }
        result = previousValue / current;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  return (
    <Card className="calculator-card" bordered={false}>
      <Title level={3} style={{ textAlign: 'center' }}>Калькулятор</Title>
      <Divider />
      <Input
        value={display}
        disabled
        style={{ marginBottom: 16, textAlign: 'right', fontSize: '24px', height: '50px' }}
      />
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Space wrap>
          <Button className="calc-button" onClick={() => handleNumberClick('7')}>7</Button>
          <Button className="calc-button" onClick={() => handleNumberClick('8')}>8</Button>
          <Button className="calc-button" onClick={() => handleNumberClick('9')}>9</Button>
          <Button className="calc-button operation" onClick={() => handleOperationClick('/')}>/</Button>
        </Space>
        <Space wrap>
          <Button className="calc-button" onClick={() => handleNumberClick('4')}>4</Button>
          <Button className="calc-button" onClick={() => handleNumberClick('5')}>5</Button>
          <Button className="calc-button" onClick={() => handleNumberClick('6')}>6</Button>
          <Button className="calc-button operation" onClick={() => handleOperationClick('*')}>×</Button>
        </Space>
        <Space wrap>
          <Button className="calc-button" onClick={() => handleNumberClick('1')}>1</Button>
          <Button className="calc-button" onClick={() => handleNumberClick('2')}>2</Button>
          <Button className="calc-button" onClick={() => handleNumberClick('3')}>3</Button>
          <Button className="calc-button operation" onClick={() => handleOperationClick('-')}>-</Button>
        </Space>
        <Space wrap>
          <Button className="calc-button" onClick={() => handleNumberClick('0')}>0</Button>
          <Button className="calc-button" onClick={() => handleNumberClick('.')}>.</Button>
          <Button className="calc-button clear" onClick={handleClear}>C</Button>
          <Button className="calc-button operation" onClick={() => handleOperationClick('+')}>+</Button>
        </Space>
        <Space wrap style={{ justifyContent: 'center' }}>
          <Button className="calc-button equal" onClick={calculateResult} type="primary">=</Button>
        </Space>
      </Space>
    </Card>
  );
};

export default Calculator;
