import React, { useContext, useState } from 'react'
import { ToggleButtonGroup, ToggleButton, Typography } from '@mui/material'
import { UserContext } from '../UserContext/UserContext';

const TemToggleBtn = () => {
    const { setTempToggle } = useContext(UserContext)
    const [alignment, setAlignment] = useState("c");

    const handleChange = (event, newAlignment) => {
        if (newAlignment === alignment) return;
        setAlignment(newAlignment);
        // Toggle the temperature unit here
        setTempToggle(newAlignment === "c");
    };

    return (
        <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body2" color="initial" sx={{ mr: 2 }}>Temperature</Typography>
            <ToggleButtonGroup color="primary" exclusive value={alignment} onChange={handleChange} aria-label="Platform" >
                <ToggleButton value="c" style={{ width: "40px", height: "2px", backgroundColor: alignment === "c" ? "#f4976c" : "#fff", color: alignment === "c" ? "#fff" : "black" }}>
                    °C
                </ToggleButton>
                <ToggleButton value="f" style={{ width: "40px", height: "2px", backgroundColor: alignment === "f" ? "#f4976c" : "#fff", color: alignment === "f" ? "#fff" : "black" }}>
                    °F
                </ToggleButton>
            </ToggleButtonGroup>
        </section>
    )
}

export default TemToggleBtn
