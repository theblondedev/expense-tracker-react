import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { GlobalProvider } from './context/GlobalState';
import Confetti from 'react-confetti';

import './App.css';

function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handlePositiveTransaction = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <GlobalProvider>
      <div className={`app-wrapper ${loaded ? 'fade-in' : ''}`}>
        {/* Portfolio Link (top-left) */}
        <a href="http://sarshaparisdigital.tech" className="portfolio-link">
          ← Back to Portfolio
        </a>

        <Header />
        <div className='container'>
          <Balance />
          <IncomeExpenses />
          <TransactionList />
          <AddTransaction onPositiveTransaction={handlePositiveTransaction} />
        </div>

        {/* GitHub Link */}
        <div className="github-logo">
          <a href="https://github.com/theblondedev" target="_blank" rel="noopener noreferrer">
            <img src="/github.png" alt="GitHub" />
          </a>
        </div>

        {showConfetti && <Confetti />}
      </div>
    </GlobalProvider>
  );
}

export default App;
