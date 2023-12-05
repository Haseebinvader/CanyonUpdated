import React, { Fragment } from 'react'

import { Header, Footer, SideBar, RightSide } from '../Pages/index'

import { Grid } from '@mui/material'

 

const Home = () => {

  return (

    <Fragment>

      <Header />

      <Grid container spacing={4} sx={{ marginTop:"0.1px" }}>
        <Grid item xs={2} md={2.2} sx={{width: "100%", height: {xs:'0',md:'calc(100vh - 100px)'}, display: { xs: 'none', md: "block" }}}><SideBar /></Grid>
        <Grid item xs={12} md={9.8} sx={{ width: "100%", height:{xs:'0',md:'calc(100vh - 100px)'}, mb:{xs:12,lg:8} }}><RightSide /></Grid>
      </Grid>
      <Footer />
    </Fragment>

  )

}

 

export default Home