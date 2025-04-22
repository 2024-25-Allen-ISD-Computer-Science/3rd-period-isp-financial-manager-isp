import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase.jsx';
import '../../css/roneystyles.css';

const Onboarding = () => {
    // --- State ---
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        bankAccounts: [],
        budgetGoals: [],
        savingsGoalPercentage: '',
        linesOfCredit: [],
    });
    const [currentCard, setCurrentCard] = useState(0);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSavingComplete, setIsSavingComplete] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError) {
                console.error("Error fetching user:", userError);
                setError("Could not verify user session. Please log in again.");
            } else if (user) {
                setUserId(user.id);
                // const { data: existingData, error: fetchError } = await supabase
                //      .from('user_data')
                //      .select('*')
                //      .eq('id', user.id)
                //      .single();
                // if (existingData) setUserData(transformSupabaseDataToState(existingData));
            } else {
                setError("No user logged in. Redirecting...");
            }
        };
        fetchUser();
    }, [navigate]);

    const handleInputChange = (e, field) => {
        setUserData({ ...userData, [field]: e.target.value });
    };

    const formatCurrency = (number) => {
        // Handle potential non-numeric input safely
        const num = parseFloat(number);
        if (isNaN(num)) {
            return '$?.??';
        }
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(num);
    };

    // Keep addBankAccount, addBudgetGoal, addLineOfCredit functions

    const addBankAccount = () => {
        const accountName = prompt("Account name:");
        if (!accountName) return; // Exit if user cancels name prompt

        let initialBalance = prompt("Initial balance:");
        if (initialBalance === null) return; // Exit if user cancels balance prompt

        initialBalance = initialBalance.replace(/[^0-9.-]+/g, '');
        const parsedBalance = parseFloat(initialBalance);

        if (!isNaN(parsedBalance)) {
            setUserData(prevData => ({ // Use functional update
                ...prevData,
                bankAccounts: [...prevData.bankAccounts, { name: accountName, balance: parsedBalance }],
            }));
        } else {
            alert("Please enter a valid number for the balance.");
        }
    };

    const addBudgetGoal = () => {
        const goalName = prompt("Budget goal name:");
         if (!goalName) return;

        let goalCost = prompt("Target amount:");
         if (goalCost === null) return;

        goalCost = goalCost.replace(/[^0-9.-]+/g, '');
        const parsedCost = parseFloat(goalCost);

        if (!isNaN(parsedCost)) {
            setUserData(prevData => ({
                ...prevData,
                budgetGoals: [...prevData.budgetGoals, { name: goalName, cost: parsedCost }],
            }));
        } else {
            alert("Please enter a valid number for the amount.");
        }
    };

     const addLineOfCredit = () => {
        const lineName = prompt("Credit line name (e.g., Visa Card):");
         if (!lineName) return;

        let balance = prompt("Current balance:");
         if (balance === null) return;

        let apr = prompt("Interest rate (APR %):");
         if (apr === null) return;

        balance = balance.replace(/[^0-9.-]+/g, '');
        apr = apr.replace(/[^0-9.-]+/g, '');

        const parsedBalance = parseFloat(balance);
        const parsedApr = parseFloat(apr);

        if (!isNaN(parsedBalance) && !isNaN(parsedApr)) {
            setUserData(prevData => ({
                ...prevData,
                linesOfCredit: [...prevData.linesOfCredit, { name: lineName, balance: parsedBalance, apr: parsedApr }],
            }));
        } else {
            alert("Please enter valid numbers for balance and APR.");
        }
    };


    // --- Navigation ---
    const totalCards = 5; // Welcome, User Info, Banks, Budget, Credit

    const handleNext = () => {
        if (currentCard < totalCards - 1) {
            setCurrentCard(currentCard + 1);
        } else if (currentCard === totalCards - 1) {
            // If on the last card, trigger save instead of going next
            handleSaveData();
        }
    };

    const handlePrevious = () => {
        if (currentCard > 0) {
            setCurrentCard(currentCard - 1);
        }
    };

    // --- Save Data Function ---
    const handleSaveData = async () => {
        if (!userId) {
            setError("User ID not found. Cannot save data.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setIsSavingComplete(false);

        // Prepare data for Supabase (ensure correct types)
        const dataToSave = {
            first_name: userData.firstName || null, // Use null if empty string isn't desired
            last_name: userData.lastName || null,
            bank_accounts: userData.bankAccounts, // Already array of objects
            budget_goals: userData.budgetGoals.map(goal => ({ ...goal, current_amount: 0 })),
            savings_goal_percentage: parseFloat(userData.savingsGoalPercentage) || null, // Parse to float, use null if invalid/empty
            lines_of_credit: userData.linesOfCredit, // Already array of objects
            // Add any other fields from user_data you might want to update
            // e.g., onboarding_complete: true
        };

        try {
            const { data, error: updateError } = await supabase
                .from('user_data')
                .update(dataToSave)
                .eq('id', userId) // Match the logged-in user
                .select() // Optionally get the updated row back
                .single(); // Expect only one row

            if (updateError) {
                throw updateError; // Throw error to be caught below
            }

            // Success!
            console.log("Data saved successfully:", data);
            setIsSavingComplete(true);
            setTimeout(() => {
                navigate('/Inner/Dashboard');
            }, 1500);

        } catch (err) {
            console.error("Error saving onboarding data:", err);
            setError(`Failed to save data: ${err.message || err.error_description || 'Unknown error'}`);
        } finally {
            setIsLoading(false); // Stop loading indicator regardless of outcome
        }
    };


    // --- Render Logic ---
    const renderCard = (cardIndex) => {
        // Prevent rendering if user ID hasn't loaded yet
        // if (!userId && cardIndex > 0) { // Allow welcome card maybe
        //     return <div>Loading user data...</div>;
        // }

        switch (cardIndex) {
            // Keep cases 0-4 as they were, but maybe adjust the last card
            case 0:
                return (
                    <div className="onboarding-card">
                        <h2>Welcome to Financial Manager ISP!</h2>
                        {/* Replace with your actual image path or remove */}
                        {/* <img src="your-image.jpg" alt="Welcome" style={{ width: '200px', margin: '20px auto' }} /> */}
                        <p>Let's get your financial details set up.</p>
                    </div>
                );
            case 1:
                return (
                    <div className="onboarding-card">
                        <h2>Your Information</h2>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={userData.firstName}
                            onChange={(e) => handleInputChange(e, 'firstName')}
                            className="onboarding-input" // Add consistent class for styling
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={userData.lastName}
                            onChange={(e) => handleInputChange(e, 'lastName')}
                            className="onboarding-input"
                        />
                    </div>
                );
            case 2:
                return (
                    <div className="onboarding-card">
                        <h2>Bank Accounts</h2>
                        <p>Add accounts you want to track.</p>
                        <button className="onboarding-button" onClick={addBankAccount}>Add Bank Account</button>
                        <ul className="onboarding-list">
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
                         <p>What are you saving for? Set a savings goal percentage.</p>
                        <button className="onboarding-button" onClick={addBudgetGoal}>Add Budget Goal</button>
                        <ul className="onboarding-list">
                            {userData.budgetGoals.map((goal, index) => (
                                <li key={index}>{goal.name}: {formatCurrency(goal.cost)}</li>
                            ))}
                        </ul>
                        <input
                            type="number" // Use number input
                            placeholder="Savings Goal Percentage (%)"
                            value={userData.savingsGoalPercentage}
                            onChange={(e) => handleInputChange(e, 'savingsGoalPercentage')}
                            className="onboarding-input"
                            min="0" // Optional: Set min/max
                            max="100"
                            step="1" // Optional: Set step
                        />
                         <label>% of income to save</label>
                    </div>
                );
            case 4: // Last Card
                return (
                    <div className="onboarding-card">
                        <h2>Lines of Credit</h2>
                        <p>Add credit cards or loans you manage.</p>
                        <button className="onboarding-button" onClick={addLineOfCredit}>Add Line of Credit</button>
                        <ul className="onboarding-list">
                            {userData.linesOfCredit.map((line, index) => (
                                <li key={index}>{line.name}: Balance {formatCurrency(line.balance)}, APR {line.apr}%</li>
                            ))}
                        </ul>
                        {/* Display feedback on the last card */}
                         {isLoading && <p className="onboarding-message">Saving data...</p>}
                         {isSavingComplete && <p className="onboarding-message success">Data saved successfully! Redirecting...</p>}
                         {error && <p className="onboarding-message error">{error}</p>}

                        {/* Optionally change the "Next" button to "Finish" visually */}
                        {/* The handleNext function already handles saving on this card */}
                    </div>
                );
            default:
                return null;
        }
    };

    // --- Main Return ---
    return (
        <div className="onboarding-container">
            {/* Render card content */}
            {renderCard(currentCard)}

            {/* Navigation Controls */}
            <div className="onboarding-navigation">
                <button
                    onClick={handlePrevious}
                    disabled={currentCard === 0 || isLoading} // Disable if loading
                    className="onboarding-button nav-button"
                >
                    Previous
                </button>
                <div className="dots">
                    {Array.from({ length: totalCards }).map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${currentCard === index ? 'active' : ''}`}
                            // Disable clicking dots while saving?
                            onClick={() => !isLoading && setCurrentCard(index)}
                        ></span>
                    ))}
                </div>
                <button
                    onClick={handleNext}
                    // Disable button if loading, or if already complete
                    disabled={isLoading || isSavingComplete}
                    className="onboarding-button nav-button"
                >
                    {/* Change button text on last step */}
                    {currentCard === totalCards - 1 ? (isLoading ? 'Saving...' : 'Finish & Save') : 'Next'}
                </button>
            </div>

            {/* Optional: Keep for debugging */}
            {/* <pre style={{ marginTop: '20px', fontSize: '10px', background: '#eee', padding: '10px' }}>
                {JSON.stringify({ userId, userData }, null, 2)}
            </pre> */}
        </div>
    );
};

export default Onboarding;