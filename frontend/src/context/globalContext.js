import React, { useContext, useState, useEffect } from "react"
import axios from 'axios'
import { useAuth } from './authContext'

// Base URL for API requests
const BASE_URL = "http://localhost:5000/api/v1/";

// Create a global context
const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const { user, getAuthHeader } = useAuth()

    // Clear data when user changes or logs out
    useEffect(() => {
        setIncomes([])
        setExpenses([])
        
        // If user is logged in, fetch their data
        if (user) {
            getIncomes()
            getExpenses()
        }
    }, [user])

    // Function to get auth headers
    const getHeaders = () => {
        return {
            headers: getAuthHeader()
        }
    }

    // Function to add an income
    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income, getHeaders())
            getIncomes() // Refresh incomes after adding
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding income')
        }
    }

    // Function to fetch all incomes
    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`, getHeaders())
            setIncomes(response.data)
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching incomes')
            setIncomes([])
        }
    }

    // Function to delete an income
    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`, getHeaders())
            getIncomes() // Refresh incomes after deleting
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting income')
        }
    }

    // Function to calculate total income
    const totalIncome = () => {
        return incomes.reduce((acc, income) => acc + income.amount, 0)
    }

    // Function to add an expense
    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense, getHeaders())
            getExpenses() // Refresh expenses after adding
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding expense')
        }
    }

    // Function to fetch all expenses
    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`, getHeaders())
            setExpenses(response.data)
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching expenses')
            setExpenses([])
        }
    }

    // Function to delete an expense
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`, getHeaders())
            getExpenses() // Refresh expenses after deleting
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting expense')
        }
    }

    // Function to calculate total expenses
    const totalExpenses = () => {
        return expenses.reduce((acc, expense) => acc + expense.amount, 0)
    }

    // Function to calculate total balance (income - expenses)
    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    // Function to get transaction history (latest 3 transactions)
    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        return history.slice(0, 3)
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

// Custom hook to use global context
export const useGlobalContext = () => {
    return useContext(GlobalContext)
}
