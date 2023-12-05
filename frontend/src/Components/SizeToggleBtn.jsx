import React, { useContext, useState } from 'react'
import { ToggleButtonGroup, ToggleButton, Typography } from '@mui/material'
import { UserContext } from '../UserContext/UserContext';

const TemToggleBtn = () => {

    const {setSizeToggle} = useContext(UserContext)
    const [alignment, setAlignment] = useState("c");

    const handleChange = (event, newAlignment) => {
        if (newAlignment === alignment) { return }
        setAlignment(newAlignment);
    };


    return (
        <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body1" color="initial" sx={{ mr: 2 }}>Size</Typography>
            <ToggleButtonGroup color="primary" exclusive value={alignment} onChange={handleChange} aria-label="Platform" >
                <ToggleButton value="c" style={{ width: "40px", height: "2px", backgroundColor: alignment === "c" ? "#F4976C" : "#fff", color: alignment === "c" ? "white" : "black", }} onClick={()=> setSizeToggle(true)} >mm</ToggleButton>
                <ToggleButton value="f" style={{ width: "40px", height: "2px", backgroundColor: alignment === "f" ? "#F4976C" : "white", color: alignment === "f" ? "white" : "black", }} onClick={()=> setSizeToggle(false)} > in</ToggleButton>
            </ToggleButtonGroup>
        </section>
    )
}

export default TemToggleBtn