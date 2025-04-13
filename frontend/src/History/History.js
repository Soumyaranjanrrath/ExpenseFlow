import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';

function History() {
    const { transactionHistory } = useGlobalContext() // Get transaction history from global context

    const [...history] = transactionHistory() // Destructure history data

    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.map((item) => {
                const { _id, title, amount, type } = item
                
                return (
                    <div key={_id} className="history-item">
                        {/* Display transaction title with color based on type */}
                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {title}
                        </p>

                        {/* Display transaction amount with +/- sign based on type */}
                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0 : amount}`}
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

// Styled component for history list
const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .history-item {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default History
