import React, { useState } from 'react';
import { Button, Layout, theme } from 'antd';
import './Calculator.css';

const { Content } = Layout;

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState('');
  const [previousValue, setPreviousValue] = useState(0);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else if (value === '.' && display.includes('.')) {
      return;
    } else {
      setDisplay(display + value);
    }
    if (!waitingForSecondValue) {
      setPreviousValue(parseFloat(display + value));
    }
  };

  const handleOperationClick = (op) => {
    setOperation(op);
    setPreviousValue(parseFloat(display));
    setDisplay('0');
    setWaitingForSecondValue(true);
  };

  const handleEqualClick = () => {
    if (!operation) return;

    const currentValue = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = previousValue + currentValue;
        break;
      case '-':
        result = previousValue - currentValue;
        break;
      case '×':
        result = previousValue * currentValue;
        break;
      case '÷':
        if (currentValue === 0) {
          setDisplay('Ошибка');
          return;
        }
        result = previousValue / currentValue;
        break;
      default:
        break;
    }

    setDisplay(result.toString());
    setOperation('');
    setPreviousValue(result);
    setWaitingForSecondValue(false);
  };

  const handleClearClick = () => {
    setDisplay('0');
    setOperation('');
    setPreviousValue(0);
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
    <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          width: '100%',
          maxWidth: 400,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="calculator-display">{display}</div>
        <div className="calculator-grid">
          {buttons.map((btn) => (
            <Button
              key={btn}
              type={['÷', '×', '-', '+'].includes(btn) ? 'primary' : 'default'}
              className={`calculator-button ${btn === '=' ? 'equals-button' : ''}`}
              onClick={() => {
                if (btn === 'C') handleClearClick();
                else if (btn === '=') handleEqualClick();
                else if (['÷', '×', '-', '+'].includes(btn)) handleOperationClick(btn);
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
