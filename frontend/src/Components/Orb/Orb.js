import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useWindowSize } from '../../utils/useWindowSize';

function Orb() {
    const { width, height } = useWindowSize(); // Get the window width & height dynamically

    // Keyframe animation to move the Orb around
    const moveOrb = keyframes`
        0% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(${width}px, ${height / 2}px);
        }
        100% {
            transform: translate(0, 0);
        }
    `;

    // Styled component for the animated Orb
    const OrbStyled = styled.div`
        width: 70vh;
        height: 70vh;
        position: absolute;
        border-radius: 50%;
        margin-left: -37vh;
        margin-top: -37vh;
        background: linear-gradient(180deg, #F56692 0%, #F2994A 100%);
        filter: blur(400px);
        animation: ${moveOrb} 15s alternate linear infinite; // Apply animation
    `;

    return <OrbStyled />; // Render the animated Orb
}

export default Orb
