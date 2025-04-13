import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/authContext';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const [formError, setFormError] = useState('');
    const { register, error, setError } = useAuth();
    const navigate = useNavigate();

    const { username, email, password, confirmPassword } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear previous errors
        setFormError('');
        setError(null);
        
        // Validate form
        if (!username || !email || !password || !confirmPassword) {
            setFormError('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            setFormError('Passwords do not match');
            return;
        }
        
        try {
            const userData = {
                username,
                email,
                password
            };
            
            await register(userData);
            navigate('/dashboard', { replace: true });
        } catch (err) {
            console.log('Registration error:', err);
            // Error is set in the auth context
        }
    };

    return (
        <RegisterStyled>
            <div className="register-content">
                <h2>Create an Account</h2>
                
                {(formError || error) && (
                    <div className="error-message">
                        {formError || error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            placeholder="Enter your username"
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Create a password"
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm your password"
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="submit-btn">
                        <button type="submit">Register</button>
                    </div>
                </form>
                
                <div className="login-link">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </RegisterStyled>
    );
}

const RegisterStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    
    .register-content {
        background: rgba(252, 246, 249, 0.78);
        border: 3px solid #FFFFFF;
        backdrop-filter: blur(4.5px);
        border-radius: 32px;
        padding: 2rem;
        width: 380px;
        
        h2 {
            text-align: center;
            margin-bottom: 2rem;
            color: var(--primary-color);
        }
        
        .error-message {
            background-color: rgba(255, 0, 0, 0.1);
            color: red;
            padding: 0.5rem;
            border-radius: 10px;
            margin-bottom: 1rem;
            text-align: center;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
            
            label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 500;
            }
            
            input {
                width: 100%;
                padding: 0.8rem;
                border-radius: 10px;
                border: 2px solid #fff;
                outline: none;
                background: transparent;
                
                &:focus {
                    border: 2px solid var(--primary-color);
                }
            }
        }
        
        .submit-btn {
            button {
                width: 100%;
                padding: 0.8rem;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 10px;
                font-size: 1.2rem;
                cursor: pointer;
                transition: all .4s ease-in-out;
                
                &:hover {
                    background: var(--color-green);
                }
            }
        }
        
        .login-link {
            text-align: center;
            margin-top: 1.5rem;
            
            a {
                color: var(--primary-color);
                text-decoration: none;
                font-weight: 600;
                
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
`;

export default Register; 