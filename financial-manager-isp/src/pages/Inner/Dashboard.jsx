import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase.jsx'; // Ensure path is correct
import SavingsCalculator from '../../components/SavingsCalculator.jsx';
import '../../css/roneystyles.css'; // Your provided CSS

// --- Helper Functions ---
const formatCurrency = (number) => {
    const num = parseFloat(number);
    if (isNaN(num)) {
        return '$?.??'; // Or return an empty string or placeholder
    }
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(num);
};

const calculateMinPayment = (balance, apr) => {
    if (balance <= 0) return 0;
    const monthlyInterest = (balance * (apr / 100)) / 12;
    // Simplified minimum: 1% of balance + interest, or $25, whichever is higher
    const minCalc = balance * 0.01 + monthlyInterest;
    return Math.max(25, minCalc);
};

const calculateRecommendedPayment = (balance, apr) => {
    if (balance <= 0) return 0;
    const monthlyInterest = (balance * (apr / 100)) / 12;
    // Simplified recommendation: 3% of balance + interest (aims for faster payoff)
    const recommendedCalc = balance * 0.03 + monthlyInterest;
    // Ensure recommended is at least the minimum (or slightly more)
    return Math.max(calculateMinPayment(balance, apr) + 0.01, recommendedCalc);
};

const calculateRecommendedContribution = (goal) => {
    if (!goal || goal.cost <= 0) return 0;
    // Simple recommendation: 10% of the total goal cost
    // More complex logic could consider remaining amount / time etc.
    return goal.cost * 0.10;
};


const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('Accounts');

    // State for Contribution Modal
    const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
    const [selectedGoalIndex, setSelectedGoalIndex] = useState(null); // Index of the goal being contributed to
    const [contributionAmount, setContributionAmount] = useState(''); // Input value for custom amount
    const [isSavingContribution, setIsSavingContribution] = useState(false); // Loading state for contribution save
    const [contributionError, setContributionError] = useState(''); // Error specific to contribution


    useEffect(() => {
        const fetchUserProfile = async () => {
            setIsLoading(true);
            setError(null);
            setUserData(null);

            // 1. Get the authenticated user
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError) {
                console.error('Error fetching user session:', userError);
                setError('Could not get user session. Please refresh or log in again.');
                setIsLoading(false);
                return;
            }

            if (!user) {
                setError('No user logged in.'); // Or redirect to login
                setIsLoading(false);
                return;
            }

            // 2. Fetch the corresponding data from user_data table
            try {
                const { data, error: profileError } = await supabase
                    .from('user_data')
                    // Select all the columns you need
                    .select('id, username, first_name, last_name, bank_accounts, budget_goals, savings_goal_percentage, lines_of_credit') // Added ID here, might need it
                    .eq('id', user.id)
                    .single(); // Assuming one row per user ID

                if (profileError) {
                    // Handle cases like profile not existing yet if needed
                    if (profileError.code === 'PGRST116') { // PostgREST code for "Not found"
                         console.warn("User profile data not found.");
                         setError("User profile data not found. Please complete onboarding.");
                         // Maybe set default data or redirect to onboarding?
                         setUserData({
                            id: user.id, // Include ID in default data
                            username: 'user',
                            bank_accounts: [],
                            budget_goals: [], // Ensure structure matches if providing defaults
                            lines_of_credit: [],
                            savings_goal_percentage: null
                         });
                    } else {
                        throw profileError; // Throw other errors
                    }
                } else if (data) {
                    // Ensure goals have current_amount (for older data potentially)
                     const sanitizedData = {
                         ...data,
                         budget_goals: data.budget_goals?.map(g => ({ ...g, current_amount: g.current_amount || 0 })) || [],
                         bank_accounts: data.bank_accounts || [],
                         lines_of_credit: data.lines_of_credit || []
                     };
                    setUserData(sanitizedData);
                }
            } catch (err) {
                 console.error('Error fetching user profile data:', err);
                 setError(`Failed to load dashboard data: ${err.message}`);
            } finally {
                 setIsLoading(false); // Stop loading indicator
            }
        };
        fetchUserProfile();
    }, []); // Runs once on component mount


    // --- Contribution Modal Logic ---
    const openContributeModal = (index) => {
        setSelectedGoalIndex(index);
        setContributionAmount(''); // Clear previous amount
        setContributionError('');
        setIsContributeModalOpen(true);
    };

    const closeContributeModal = () => {
        setIsContributeModalOpen(false);
        setSelectedGoalIndex(null);
    };

    const handleContribution = async (amountToContribute) => {
        // Ensure we have the user ID, either from initial fetch or state
        const currentUserId = userData?.id;
        if (!currentUserId){
            setContributionError("User ID not available. Cannot save.");
            return;
        }
        if (selectedGoalIndex === null || !userData?.budget_goals) return;


        const goal = userData.budget_goals[selectedGoalIndex];
        const currentAmount = goal.current_amount || 0;
        const cost = goal.cost;
        const remaining = cost - currentAmount;

        const parsedAmount = parseFloat(amountToContribute);

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setContributionError("Please enter a valid positive amount.");
            return;
        }
        if (parsedAmount > remaining + 0.001) { // Add small tolerance for float issues
            setContributionError(`Amount cannot exceed the remaining goal balance of ${formatCurrency(remaining)}.`);
            return;
        }

        setIsSavingContribution(true);
        setContributionError('');

        // 1. Create updated goals array for local state & Supabase
        const updatedGoals = userData.budget_goals.map((g, index) => {
            if (index === selectedGoalIndex) {
                // Ensure precision
                const newAmount = parseFloat((currentAmount + parsedAmount).toFixed(2));
                return { ...g, current_amount: newAmount };
            }
            return g;
        });

        // 2. Update Supabase
        try {
            const { error: updateError } = await supabase
                .from('user_data')
                .update({ budget_goals: updatedGoals }) // Update the entire array
                .eq('id', currentUserId); // Use the fetched/stored user ID

            if (updateError) throw updateError;

            // 3. Update local state on success
            setUserData(prevData => ({
                ...prevData,
                budget_goals: updatedGoals
            }));

            closeContributeModal(); // Close modal on success

        } catch (err) {
            console.error("Error saving contribution:", err);
            setContributionError(`Failed to save: ${err.message}`);
        } finally {
            setIsSavingContribution(false);
        }
    };


    // --- Render Logic ---
    if (isLoading) {
         return <div className="loading-message">Loading Dashboard...</div>;
    }
    if (error) {
         return <div className="error-message">Error: {error}</div>;
    }
    if (!userData) { // Handle case where data might still be null after loading/error check
        return <div>No user data available or error occurred.</div>;
    }


    const selectedGoal = selectedGoalIndex !== null && userData.budget_goals ? userData.budget_goals[selectedGoalIndex] : null;
    const recommendedContribution = selectedGoal ? calculateRecommendedContribution(selectedGoal) : 0;


    return (
        <>
            <main>
                 {/* Header Section */}
                 <section className="hero-animation dashheader">
                     <h2>Welcome back, {userData?.first_name || userData?.username || 'user'}!</h2>
                     <p>Smart tracking, powerful insights, financial freedom.</p>
                 </section>

                <div className="dashboard">
                     <div className="welcome-card">
                         <p>still do not know what to put here</p>
                     </div>

                    <div className="info-card">
                        <div className="header">Budget Goals</div>
                        <div className="info-text budget-info">
                            {userData?.budget_goals && userData.budget_goals.length > 0 ? (
                                <>
                                    <ul className="goal-list">
                                        {userData.budget_goals.map((goal, index) => {
                                            const current = goal.current_amount || 0;
                                            const target = goal.cost;
                                            const progress = target > 0 ? (current / target) * 100 : 0;
                                            const isComplete = current >= target;
                                            return (
                                                <li key={index} className={`goal-item ${isComplete ? 'complete' : ''}`}>
                                                    <div className="goal-details">
                                                        <span>{goal.name}: {formatCurrency(current)} / {formatCurrency(target)}</span>
                                                        <div className="progress-bar-container">
                                                            <div className="progress-bar" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => openContributeModal(index)}
                                                        className="contribute-button"
                                                        disabled={isSavingContribution || isComplete}
                                                    >
                                                        {isComplete ? 'Complete!' : 'Contribute'}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </>
                            ) : (
                                <p>No budget goals set yet.</p>
                            )}
                            {userData?.savings_goal_percentage !== null && userData?.savings_goal_percentage !== undefined && (
                                 <p className="savings-rate">Target Savings Rate: {userData.savings_goal_percentage}%</p>
                             )}
                        </div>
                    </div>


                     {/* Calculator Card */}
                      <div className="calculator-card">
                          <div className="header">Savings Calculator</div>
                          <div className="column-container">
                              <SavingsCalculator />
                          </div>
                      </div>


                    {/* Menu Card */}
                    <div className="menu-card">
                        {/* Tabs */}
                        <div className="tabs">
                             <button className={activeTab === 'Accounts' ? 'active' : ''} onClick={() => setActiveTab('Accounts')}>Accounts</button>
                             <button className={activeTab === 'Credit' ? 'active' : ''} onClick={() => setActiveTab('Credit')}>Credit</button>
                             <button className={activeTab === 'Stocks' ? 'active' : ''} onClick={() => setActiveTab('Stocks')} disabled>Stocks</button>
                         </div>


                         {/* Accounts Tab Content */}
                         {activeTab === 'Accounts' && (
                              <>
                                 <div className="miniheader">Your Bank Accounts</div>
                                 <div className="accountscontainer list-container">
                                     {userData?.bank_accounts && userData.bank_accounts.length > 0 ? (
                                         userData.bank_accounts.map((account, index) => (
                                             <div key={index} className="list-item">
                                                 <div className="menu-text item-name">{account.name}</div>
                                                 <div className="header item-value">{formatCurrency(account.balance)}</div>
                                             </div>
                                         ))
                                     ) : (
                                         <p className="menu-text">No bank accounts added.</p>
                                     )}
                                 </div>
                              </>
                         )}

                         {/* Credit Tab Content (UPDATED) */}
                        {activeTab === 'Credit' && (
                             <>
                                <div className="miniheader">Your Lines of Credit</div>
                                <div className="creditcontainer list-container">
                                    {userData?.lines_of_credit && userData.lines_of_credit.length > 0 ? (
                                        userData.lines_of_credit.map((line, index) => {
                                            const minPayment = calculateMinPayment(line.balance, line.apr);
                                            const recPayment = calculateRecommendedPayment(line.balance, line.apr);
                                            return (
                                                <div key={index} className="list-item credit-item">
                                                    <div className="item-primary">
                                                        <div className="menu-text item-name">{line.name}</div>
                                                        <div className="header item-value">{formatCurrency(line.balance)}</div>
                                                        <div className="menu-text item-detail">APR: {line.apr}%</div>
                                                    </div>
                                                    <div className="item-secondary payment-info">
                                                         <div className="menu-text item-detail">Est. Min Payment: {formatCurrency(minPayment)}</div>
                                                         <div className="menu-text item-detail">Rec. Payment: {formatCurrency(recPayment)}</div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="menu-text">No lines of credit added.</p>
                                    )}
                                </div>
                             </>
                        )}

                         {/* Stocks Tab Content */}
                          {activeTab === 'Stocks' && (
                               <>
                                  <div className="miniheader">Your Stocks</div>
                                  <div className="stockscontainer list-container">
                                      <p className="menu-text">Stock tracking coming soon!</p>
                                  </div>
                               </>
                          )}
                    </div>

                     {/* Quick Links */}
                     <div className="quick-links">
                         <div className="header">Quick Links</div>
                         <div className="links">
                             <button>Add Transaction</button>
                             <button>View Reports</button>
                         </div>
                     </div>

                </div>
            </main>

             {/* Footer */}
             <footer>
                 <div className="footerdiv">
                     <p>&copy; Ported by Nathan Charles</p>
                 </div>
             </footer>

            {/* --- Contribution Modal --- */}
            {isContributeModalOpen && selectedGoal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Contribute to: {selectedGoal.name}</h3>
                        <p>Goal: {formatCurrency(selectedGoal.cost)}</p>
                        <p>Current: {formatCurrency(selectedGoal.current_amount || 0)}</p>
                        <p>Remaining: {formatCurrency(selectedGoal.cost - (selectedGoal.current_amount || 0))}</p>
                        <hr/>

                        <p>Recommended Contribution: {formatCurrency(recommendedContribution)}</p>
                        <button
                            onClick={() => handleContribution(recommendedContribution)}
                            disabled={isSavingContribution || recommendedContribution <= 0 || recommendedContribution > (selectedGoal.cost - (selectedGoal.current_amount || 0))}
                            className="modal-button"
                        >
                            Contribute Recommended
                        </button>

                        <hr/>
                        <label htmlFor="customAmount">Custom Amount:</label>
                        <input
                            type="number"
                            id="customAmount"
                            value={contributionAmount}
                            onChange={(e) => {
                                setContributionAmount(e.target.value);
                                setContributionError('');
                            }}
                            placeholder="Enter amount"
                            className="modal-input"
                            step="0.01"
                            min="0.01"
                        />
                         <button
                            onClick={() => handleContribution(contributionAmount)}
                            disabled={isSavingContribution}
                            className="modal-button"
                        >
                           {isSavingContribution ? 'Saving...' : 'Contribute Custom Amount'}
                        </button>

                        {contributionError && <p className="error-message">{contributionError}</p>}

                        <button onClick={closeContributeModal} disabled={isSavingContribution} className="modal-button close">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;