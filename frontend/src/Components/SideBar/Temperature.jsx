import React, { useContext, useState } from 'react';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/material';
import "../Styles.css"
import { UserContext } from '../../UserContext/UserContext';

const Temperature = () => {

  const { url, setUrl, tempToggle, temperature, setTemperature } = useContext(UserContext)

  const handleChange = (event, newValue) => {
    setTemperature(newValue);
    let newUrl = url.replace(/(\?|&)LowTemperature=[^&]*/g, '');
    newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, "");
    newUrl = newUrl.replace(/(\?|&)HighTemperature=[^&]*/g, '');

    newUrl += `&LowTemperature=${newValue[0]}&HighTemperature=${newValue[1]}`;

    setUrl(newUrl);
  };

  return (
    <div className='sideBarMenuData'>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', fontSize: "12px" }}><p>-70{"°C"}</p><p>360{"°C"}</p></Box>
      <Slider
        id="temperatureSlider"
        value={temperature}
        onChange={handleChange}
        min={-70} max={360}
        valueLabelDisplay="auto"
        aria-labelledby="temperature-slider"
        disableSwap
      />
      <p style={{ margin: 'auto', fontSize: "12px" }}>Range: {temperature[0]} {"°C"} To {temperature[1]} {"°C"}</p>
    </div>
  );
};

export default Temperature;
