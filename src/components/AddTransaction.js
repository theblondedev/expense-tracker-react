import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import confetti from 'canvas-confetti';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [buttonText, setButtonText] = useState('Add Transaction');
  const [showAnimation, setShowAnimation] = useState(false);
  const [isIncome, setIsIncome] = useState(true);

  const { addTransaction } = useContext(GlobalContext);

  const fireConfetti = () => {
    confetti({
      particleCount: 200,
      startVelocity: 40,
      spread: 360,
      origin: { y: 1 }, 
      gravity: 0.5,       

      ticks: 150
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (text.trim() === '' || amount === 0) return;

    const numericAmount = +amount;

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: numericAmount
    };

    addTransaction(newTransaction);

    // Set income/expense
    setIsIncome(numericAmount > 0);

    if (numericAmount > 0) {
      //  Trigger confetti if income
      fireConfetti();
    }
    if (isIncome === true) {


    setButtonText('Get That Bag, Queen!');
    setShowAnimation(true);
    }
    // Reset after 2 seconds
    setTimeout(() => {
      setButtonText('Add Transaction');
      setShowAnimation(false);
    }, 4000);

    // Reset form
    setText('');
    setAmount(0);
  };

  return (
    <>
      <h4>Add new transaction</h4>
      <form onSubmit={onSubmit}>
        <div className='form-control'>
          <label htmlFor="text">Item description</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter description..."
          />
        </div>
        <div className='form-control'>
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className='btn'>{buttonText}</button>
      </form>
      </>
 
   
  );
};
