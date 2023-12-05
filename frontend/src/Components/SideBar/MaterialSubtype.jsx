import React, { useContext, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { materialSubTypeItems } from '../../Data/SliderData'
import { UserContext } from '../../UserContext/UserContext';
import {Typography} from '@mui/material';

const MaterialSubtype = () => {
  const { url, setUrl, pageSize, selectedsubtype, setSelectedsubtype } = useContext(UserContext);

  useEffect(() => {
    let subMaterialSelectedString = selectedsubtype.join('$');

    if (subMaterialSelectedString !== '') {
      let newUrl = url.replace(/(\?|&)MaterialSubtype=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, "");
      setUrl(newUrl + `&MaterialSubtype=${subMaterialSelectedString}`);
    }
    else if (subMaterialSelectedString === '') {
      let newUrl = url.replace(/(\?|&)MaterialSubtype=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, "");
      setUrl(newUrl)
    }

  }, [selectedsubtype, url]);

  const checkboxChangeHandler = async (event, material) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedsubtype([...selectedsubtype, material]);
    } else {
      setSelectedsubtype(selectedsubtype.filter((item) => item !== material));
    }
  };
  return (
    <section className='sideBarMenuData'>
      {materialSubTypeItems.map((material, index) => (
        <Grid key={index}
        container
        spacing={0}
        sx={{ width: '100%', display: 'flex', alignItems: 'start', flexDirection: "start" }}>
          <Grid item xs={1.5}>
            <input checked={selectedsubtype.includes(material)} type="checkbox" style={{ scale: '1.3', cursor: 'pointer' }} onChange={(event) => checkboxChangeHandler(event, material)} />
          </Grid>
          <Grid item xs={10}>

            <Typography varient='body2' sx={{ fontSize: { xs: "8px", md: "10px" }, ml: 1 }}>{material}</Typography>

          </Grid>
        </Grid>
      ))}
    </section>
  )
}

export default MaterialSubtype