import React from 'react';
import { Grid, Container, Typography, Divider } from '@mui/material'


function Footer() {

  return (
    <footer style={{ backgroundColor: "#182e49", padding: '1rem' }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column" }}>
            <Typography variant="h4" sx={{ color: '#fff' }}>Menu</Typography>
            <Divider />
            <ul className='footerMenu'>
              <li><a href="/">Home</a></li>
              <li><a href="/">Blog</a></li>
              <li><a href="/">All Services</a></li>
              <li><a href="/">Contact Us</a></li>
              <li><a href="/">Privacy Policy</a></li>
            </ul>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column" }}>
            <Typography variant="h4" sx={{ color: '#fff' }}>Contact</Typography>
            <Divider />
            <ul className='footerMenu'>
              <li><a href="/">Home</a></li>
              <li><a href="/">Blog</a></li>
              <li><a href="/">All Services</a></li>
              <li><a href="/">Contact Us</a></li>
              <li><a href="/">Privacy Policy</a></li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
