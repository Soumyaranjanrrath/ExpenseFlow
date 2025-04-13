import React from 'react'
import { Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

// Register necessary Chart.js components for rendering
ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const { incomes, expenses } = useGlobalContext() // Get income & expense data from global context

    // Preparing data for the chart
    const data = {
        labels: incomes.map((inc) => dateFormat(inc.date)), // Format and use income dates as labels
        datasets: [
            {
                label: 'Income',
                data: incomes.map((income) => income.amount), // Extract income amounts
                backgroundColor: 'green', // Set income line color
                tension: .2 // Smoother line curve
            },
            {
                label: 'Expenses',
                data: expenses.map((expense) => expense.amount), // Extract expense amounts
                backgroundColor: 'red', // Set expense line color
                tension: .2
            }
        ]
    }

    return (
        <ChartStyled>
            <Line data={data} /> {/* Render Line Chart */}
        </ChartStyled>
    )
}

// Styled container for the chart
const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart
