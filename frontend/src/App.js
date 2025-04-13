import React, { useState, useMemo } from 'react'
import styled from "styled-components";
import bg from './img/bg.png'
import { MainLayout } from './styles/Layouts'
import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income'
import Expenses from './Components/Expenses/Expenses';
import { GlobalProvider, useGlobalContext } from './context/globalContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './Components/Auth/ProtectedRoute';

function App() {
  // State to manage active menu selection
  const [active, setActive] = useState(1)

  // Function to render components based on active menu selection
  const displayData = () => {
    switch(active) {
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Income />
      case 4: 
        return <Expenses />
      default: 
        return <Dashboard />
    }
  }

  // Memoized Orb component for performance optimization
  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])

  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <AppStyled bg={bg} className="App">
            {orbMemo} {/* Background animated orb */}
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Navigation active={active} setActive={setActive} />
                      <main>
                        {displayData()} {/* Renders the selected component */}
                      </main>
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />
              
              {/* Redirect root path to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Redirect any unknown routes to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </AppStyled>
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

// Styled component for App layout
const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
