import React, { useContext, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { UserContext } from '../../UserContext/UserContext';
import { colorData } from '../../Data/SliderData';
import {Typography} from '@mui/material';

const MaterialColor = () => {
  const { url, setUrl, pageSize,selectedcolor, setSelectedcolor } = useContext(UserContext);

  useEffect(() => {
    let selectedMaterialsString = selectedcolor.join('$');

    if (selectedMaterialsString !== '') {
      let newUrl = url.replace(/(\?|&)Color=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, "");
      setUrl(newUrl + `&Color=${selectedMaterialsString}`);
    }
    else if (selectedMaterialsString === '') {
      let newUrl = url.replace(/(\?|&)Color=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, "");
      setUrl(newUrl)
    }

  }, [selectedcolor,  url]);

  const handleCheckboxChange = async (event, material) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedcolor([...selectedcolor, material]);
    } else {
      setSelectedcolor(selectedcolor.filter((item) => item !== material));
    }
  };
  return (
    <section className='sideBarMenuData'>
        {colorData.map((material, index) => (
          <Grid key={index}
          container
          spacing={0}
          sx={{ width: '100%', display: 'flex', alignItems: 'start', flexDirection: "start" }}>
            <Grid item xs={1.5}>
              <input checked={selectedcolor.includes(material)} type="checkbox" style={{ scale: '1.3', cursor: 'pointer' }} onChange={(event) => handleCheckboxChange(event, material)} />
            </Grid>
            <Grid item xs={10}>

            <Typography varient='body2' sx={{ fontSize: { xs: "8px", md: "10px" }, ml: 1 }}>{material}</Typography>

          </Grid>
          </Grid>
        ))}
      </section>
  )
}

export default MaterialColor
