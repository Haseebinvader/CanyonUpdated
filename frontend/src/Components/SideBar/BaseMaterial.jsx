import React, { useContext, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { materialTypeItems } from '../../Data/SliderData.js';
import { UserContext } from '../../UserContext/UserContext.jsx';
import {Typography} from '@mui/material';
const BaseMaterial = () => {
  const {
    url,
    setUrl,
    selectedMaterials,
    setSelectedMaterials
  } = useContext(UserContext);

  useEffect(() => {
    const selectedMaterialsString = selectedMaterials.join('$');

    if (selectedMaterialsString !== '') {
      let newUrl = url.replace(/(\?|&)Material=[^&]*/g, '');
      newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, "");
      setUrl(newUrl + `&Material=${selectedMaterialsString}`);
    } else {
      let newUrl = url.replace(/(\?|&)Material=[^&]*/g, '');
      newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, "");
      setUrl(newUrl);
    }

  }, [selectedMaterials, setUrl]);

  const handleCheckboxChange = (event, material) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedMaterials([...selectedMaterials, material]);
    } else {
      setSelectedMaterials(selectedMaterials.filter((item) => item !== material));
    }
  };

  return (
    <section className='sideBarMenuData'>
      {materialTypeItems.map((material, index) => (
        <Grid
          key={index}
          container
          spacing={0}
          sx={{ width: '100%', display: 'flex', alignItems: 'start', flexDirection: "start" }}
        >
          <Grid item xs={1}>
            <input
              type='checkbox'
              checked={selectedMaterials.includes(material)}
              style={{ scale: '1.3', cursor: 'pointer' }}
              onChange={(event) => handleCheckboxChange(event, material)}
            />
          </Grid>

          <Grid item xs={11}>

            <Typography varient='body2' sx={{ fontSize: { xs: "8px", md: "10px" }, ml: 1 }}>{material}</Typography>

          </Grid>
        </Grid>
      ))}
    </section>
  );
};

export default BaseMaterial;
