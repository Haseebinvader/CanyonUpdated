import React, { useContext, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { hardnessData } from '../../Data/SliderData';
import { UserContext } from '../../UserContext/UserContext';
import {Typography} from '@mui/material';

const Hardness = () => {
  const { url, setUrl, pageSize,selectedhardness, setSelectedhardness } = useContext(UserContext);

  useEffect(() => {
    let selectedMaterialsString = selectedhardness.join('$');

    if (selectedMaterialsString !== '') {
      let newUrl = url.replace(/(\?|&)DurometerRange=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, "");
      setUrl(newUrl + `&DurometerRange=${selectedMaterialsString}`);
    }
    else if (selectedMaterialsString === '') {
      let newUrl = url.replace(/(\?|&)DurometerRange=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, "");
      setUrl(newUrl)
    }

  }, [selectedhardness, setUrl, url]);

  const handleCheckboxChange = async (event, material) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedhardness([...selectedhardness, material]);
    } else {
      setSelectedhardness(selectedhardness.filter((item) => item !== material));
    }
  };
  return (
    <section className='sideBarMenuData'>
        {hardnessData.map((material, index) => (
          <Grid key={index}
          container
          spacing={0}
          sx={{ width: '100%', display: 'flex', alignItems: 'start', flexDirection: "start" }}>
            <Grid item xs={1.5}>
              <input checked={selectedhardness.includes(material)} type="checkbox" style={{ scale: '1.3', cursor: 'pointer' }} onChange={(event) => handleCheckboxChange(event, material)} />
            </Grid>
            <Grid item xs={10}>

            <Typography varient='body2' sx={{ fontSize: { xs: "8px", md: "10px" }, ml: 1 }}>{material}</Typography>

          </Grid>
          </Grid>
        ))}
      </section>
  )
}

export default Hardness
