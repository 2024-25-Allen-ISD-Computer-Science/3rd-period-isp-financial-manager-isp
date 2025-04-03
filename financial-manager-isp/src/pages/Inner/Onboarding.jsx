import React, { useState } from 'react';
import '../../css/roneystyles.css'

const Onboarding = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        bankAccounts: [],
        budgetGoals: [],
        savingsGoalPercentage: '',
        linesOfCredit: [],
    });
    const [currentCard, setCurrentCard] = useState(0);

    const handleInputChange = (e, field) => {
        setUserData({ ...userData, [field]: e.target.value });
    };

    const formatCurrency = (number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(number);
    };

    const addBankAccount = () => {
        const accountName = prompt("account name:");
        let initialBalance = prompt("initial balance:");

        initialBalance = initialBalance.replace(/[^0-9.-]+/g, ''); //how the fuck does regex work 
        const parsedBalance = parseFloat(initialBalance);

        if (accountName && !isNaN(parsedBalance)) {
            setUserData({
                ...userData,
                bankAccounts: [...userData.bankAccounts, { name: accountName, balance: parsedBalance }],
            });
        } else {
            alert("enter a real number");
        }
    };

    const addBudgetGoal = () => {
        const goalName = prompt("what are you budgeting for brokie:");
        let goalCost = prompt("how much:");

        goalCost = goalCost.replace(/[^0-9.-]+/g, '');
        const parsedCost = parseFloat(goalCost);

        if (goalName && !isNaN(parsedCost)) {
            setUserData({
                ...userData,
                budgetGoals: [...userData.budgetGoals, { name: goalName, cost: parsedCost }],
            });
        } else {
            alert("enter a real number");
        }
    };

    const addLineOfCredit = () => {
        const lineName = prompt("Enter credit:");
        let balance = prompt("Enter current balance:");
        let apr = prompt("Enter interest rate:");

        balance = balance.replace(/[^0-9.-]+/g, ''); //oh my god i want to die
        apr = apr.replace(/[^0-9.-]+/g, '');

        const parsedBalance = parseFloat(balance);
        const parsedApr = parseFloat(apr);

        if (lineName && !isNaN(parsedBalance) && !isNaN(parsedApr)) {
            setUserData({
                ...userData,
                linesOfCredit: [...userData.linesOfCredit, { name: lineName, balance: parsedBalance, apr: parsedApr }],
            });
        } else {
            alert("please god enter real numbers");
        }
    };

    const totalCards = 5;

    const handleNext = () => {
        if (currentCard < totalCards - 1) {
            setCurrentCard(currentCard + 1);
        }
    };

    const handlePrevious = () => {
        if (currentCard > 0) {
            setCurrentCard(currentCard - 1);
        }
    };

    const renderCard = (cardIndex) => {
        switch (cardIndex) {
            case 0:
                return (
                    <div className="onboarding-card">
                        <h2>welcome message</h2>
                        <img src="your-image.jpg" alt="Welcome" style={{ width: '200px', margin: '20px auto' }} />
                        <p>flowery filler text hooray</p>
                    </div>
                );
            case 1:
                return (
                    <div className="onboarding-card">
                        <h2>User Information</h2>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={userData.firstName}
                            onChange={(e) => handleInputChange(e, 'firstName')}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={userData.lastName}
                            onChange={(e) => handleInputChange(e, 'lastName')}
                        />
                    </div>
                );
            case 2:
                return (
                    <div className="onboarding-card">
                        <h2>Bank Accounts</h2>
                        <button onClick={addBankAccount}>Add Bank Account</button>
                        <ul>
                            {userData.bankAccounts.map((account, index) => (
                                <li key={index}>{account.name}: {formatCurrency(account.balance)}</li>
                            ))}
                        </ul>
                    </div>
                );
            case 3:
                return (
                    <div className="onboarding-card">
                        <h2>Budget & Savings Goals</h2>
                        <button onClick={addBudgetGoal}>Add Budget Goal</button>
                        <ul>
                            {userData.budgetGoals.map((goal, index) => (
                                <li key={index}>{goal.name}: {formatCurrency(goal.cost)}</li>
                            ))}
                        </ul>
                        <input
                            type="number"
                            placeholder="Savings Goal Percentage"
                            value={userData.savingsGoalPercentage}
                            onChange={(e) => handleInputChange(e, 'savingsGoalPercentage')}
                        />
                    </div>
                );
            case 4:
                return (
                    <div className="onboarding-card">
                        <h2>Lines of Credit</h2>
                        <button onClick={addLineOfCredit}>Add Line of Credit</button>
                        <ul>
                            {userData.linesOfCredit.map((line, index) => (
                                <li key={index}>{line.name}: Balance {formatCurrency(line.balance)}, APR {line.apr}%</li>
                            ))}
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="onboarding-container">
            {renderCard(currentCard)}
            <div className="onboarding-navigation">
                <button onClick={handlePrevious} disabled={currentCard === 0}>Previous</button>
                <div className="dots">
                    {Array.from({ length: totalCards }).map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${currentCard === index ? 'active' : ''}`}
                            onClick={() => setCurrentCard(index)}
                        ></span>
                    ))}
                </div>
                <button onClick={handleNext} disabled={currentCard === totalCards - 1}>Next</button>
            </div>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
    );
};

export default Onboarding;
