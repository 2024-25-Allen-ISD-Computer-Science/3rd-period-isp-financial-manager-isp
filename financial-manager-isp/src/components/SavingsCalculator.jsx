import React, { useState } from "react";

const SavingsCalculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [savingsPercentage, setSavingsPercentage] = useState("");
  const [savingsResult, setSavingsResult] = useState(0);

  const calculateSavings = () => {
    if (monthlyIncome && savingsPercentage) {
      const savings = (monthlyIncome * savingsPercentage) / 100;
      setSavingsResult(savings.toFixed(2));
    } else {
      setSavingsResult(0);
    }
  };

  return (
    <>
      <div className="calculator-content">
        <input
          type="number"
          placeholder="Monthly Income"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
          className="calculator-input"
        />
        <input
          type="number"
          placeholder="Savings Percentage"
          value={savingsPercentage}
          onChange={(e) => setSavingsPercentage(e.target.value)}
          max="100"
          className="calculator-input"
        />
        <button onClick={calculateSavings} className="calculator-button">
          Calculate
        </button>
        <div className="calculator-result">
          Your potential monthly savings: ${savingsResult}
        </div>
      </div>
    </>
  );
};

export default SavingsCalculator;