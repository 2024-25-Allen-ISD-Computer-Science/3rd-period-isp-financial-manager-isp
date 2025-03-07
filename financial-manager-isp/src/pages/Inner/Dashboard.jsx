import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase.jsx';
import SavingsCalculator from '../../components/SavingsCalculator.jsx';
import '../../css/roneystyles.css'

const Dashboard = () => {
    const [username, setUsername] = useState('');
    useEffect(() => {
        const fetchUserProfile = async () => {
          const {
            data: { user },
            error: userError,
          } = await supabase.auth.getUser();
    
          if (userError) {
            console.error('damn they dont wanna give you that user', userError);
            return;
          }
  
          if (user) {
            const { data, error: profileError } = await supabase
              .from('user_data')
              .select('username')
              .eq('id', user.id)
              .single();
    
            if (profileError) {
              console.error('damn they dont wanna give you that profile', profileError);
            } else if (data) {
              setUsername(data.username);
            }
          }
        };
    
        fetchUserProfile();
    }, []);

    return (
        <>
            <main>
              <section className="hero-animation">
                  <h2>Welcome back, {username ? username : 'user'}</h2>
                  <p>Smart tracking, powerful insights, financial freedom.</p>
              </section>
                <div className="dashboard">
                    <div className="welcome-card">Pfffppsoofpf</div>
                    
                    <div className="info-card">
                        <div className="header">Budget Goals</div>
                        <div className="pie-chart"></div>
                        <div className="info-text">[blah blah blah long placeholder that'll include percentages and stuff]</div>
                    </div>
                    
                    <div className="calculator-card">
                        <div className="header">Savings Calculator</div>
                        <div className="column-container">
                            <SavingsCalculator />
                        </div>
                    </div>
                    
                    <div className="menu-card">
                        <div className="tabs">
                        <button className="active">Accounts</button>
                        <button>Stocks</button>
                        <button>Credit</button>
                        </div>
                        <div className="header">Your Accounts</div>
                        <div className="menu-text">[Placeholder text]</div>
                    </div>
                    
                    <div className="quick-links">
                        <div className="header">Quick Links</div>
                        <div className="links">
                            <button>link to go somewhere</button>
                            <button>link to go somewhere else</button>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <div className="footerdiv">
                    <p>&copy; Ported by Nathan Charles</p>
                </div>
            </footer>
        </>
    );
};

export default Dashboard;