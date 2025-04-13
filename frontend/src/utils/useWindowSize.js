import { useEffect, useState } from "react"

// Custom hook to get and track window size changes
export const useWindowSize = () => {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight])

    useEffect(() => {
        // Function to update state when window is resized
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight])
        }

        // Add event listener to track window resize
        window.addEventListener('resize', updateSize)

        // Cleanup function to remove event listener when component unmounts
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    return {
        width: size[0],
        height: size[1]
    }
}
