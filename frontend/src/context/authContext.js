import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Base URL for API requests
const BASE_URL = "http://localhost:5000/api/v1/";

// Create an auth context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load user from localStorage on initial render
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Register user
    const register = async (userData) => {
        try {
            setLoading(true);
            const response = await axios.post(`${BASE_URL}auth/register`, userData);
            
            // Save user to localStorage
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            setError(null);
            
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Login user
    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await axios.post(`${BASE_URL}auth/login`, { email, password });
            
            // Save user to localStorage
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            setError(null);
            
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Logout user
    const logout = () => {
        // Remove user from localStorage
        localStorage.removeItem('user');
        setUser(null);
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        return !!user;
    };

    // Get auth token for API requests
    const getAuthHeader = () => {
        if (user?.token) {
            return { Authorization: `Bearer ${user.token}` };
        }
        return {};
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            register,
            login,
            logout,
            isAuthenticated,
            getAuthHeader,
            setError
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    return useContext(AuthContext);
}; 