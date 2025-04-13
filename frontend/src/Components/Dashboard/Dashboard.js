import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    // Fetch income and expense data when the component mounts
    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    // Handle empty arrays for min/max calculations
    const getMinIncome = () => {
        if (incomes.length === 0) return 0;
        return Math.min(...incomes.map(item => item.amount));
    };

    const getMaxIncome = () => {
        if (incomes.length === 0) return 0;
        return Math.max(...incomes.map(item => item.amount));
    };

    const getMinExpense = () => {
        if (expenses.length === 0) return 0;
        return Math.min(...expenses.map(item => item.amount));
    };

    const getMaxExpense = () => {
        if (expenses.length === 0) return 0;
        return Math.max(...expenses.map(item => item.amount));
    };

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart /> {/* Display the chart component */}
                        <div className="amount-con">
                            {/* Display total income, expenses, and balance */}
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>{dollar} {totalIncome()}</p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>{dollar} {totalExpenses()}</p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>{dollar} {totalBalance()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Display transaction history and min/max salary & expense */}
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span> Max</h2>
                        <div className="salary-item">
                            <p>₹{getMinIncome()}</p>
                            <p>₹{getMaxIncome()}</p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span> Max</h2>
                        <div className="salary-item">
                            <p>₹{getMinExpense()}</p>
                            <p>₹{getMaxExpense()}</p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

// Styled components for dashboard layout
const DashboardStyled = styled.div`
    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;

        .chart-con {
            grid-column: 1 / 4;
            height: 400px;
            
            .amount-con {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;

                .income, .expense {
                    grid-column: span 2;
                }

                .income, .expense, .balance {
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    
                    p {
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }

                .balance {
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    
                    p {
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4.5rem;
                    }
                }
            }
        }

        .history-con {
            grid-column: 4 / -1;

            h2 {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .salary-title {
                font-size: 1.2rem;

                span {
                    font-size: 1.8rem;
                }
            }

            .salary-item {
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                p {
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Dashboard
