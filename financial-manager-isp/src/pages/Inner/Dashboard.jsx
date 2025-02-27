import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase.jsx';
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
                <section className="hero-animation text-center">
                    <h2 className="header">Welcome, {username ? username : 'user'}</h2>
                    <p className="subheader">Smart tracking, powerful insights, financial freedom.</p>
                    <a href="AboutUs/" className="stupidbutton">Get Started</a>
                </section>

                <section className="primarysection">
                    <div className="card card-hover">
                        <svg className="blue" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                        </svg>
                        <h3>Budget Tracking</h3>
                        <p>Automatically categorize and track your spending in real-time.</p>
                    </div>

                    <div className="card card-hover">
                        <svg className="green" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3a1 1 0 102 0V8z" clipRule="evenodd"/>
                        </svg>
                        <h3>Investment Insights</h3>
                        <p>Gain detailed analysis of your investment portfolio performance.</p>
                    </div>

                    <div className="card card-hover">
                        <svg className="purple" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                        </svg>
                        <h3>Smart Reports</h3>
                        <p>Generate comprehensive financial reports with actionable insights.</p>
                    </div>
                </section>
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