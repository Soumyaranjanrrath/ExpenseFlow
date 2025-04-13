import React from 'react'
import styled from 'styled-components'

// Reusable Button Component
// Accepts props like name (text), icon, onClick event, background color, padding, text color, and border-radius
function Button({name, icon, onClick, bg, bPad, color, bRad}) {
    return (
        <ButtonStyled style={{
            background: bg, // Sets background color
            padding: bPad, // Adjusts padding
            borderRadius: bRad, // Controls border radius
            color: color, // Sets text color
        }} onClick={onClick}>
            {icon} {/* Displays an optional icon */}
            {name} {/* Button text */}
        </ButtonStyled>
    )
}

// Styled button component with essential styles
const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .4s ease-in-out;
`;

export default Button
