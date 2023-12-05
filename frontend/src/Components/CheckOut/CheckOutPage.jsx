import React, { useState, useEffect, useContext } from 'react';
import { Grid, Box, Typography, Divider, Button, Container } from '@mui/material'
import { UserContext } from '../../UserContext/UserContext';
import { Link } from 'react-router-dom'
import '../Styles.css'


const localStorageItemCart = JSON.parse(localStorage.getItem('itemCart')) || [];

const CheckOutPage = () => {
  const [total, setTotal] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0)
  const { row } = useContext(UserContext)
  return (
    <Box sx={{ py: 4 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8.3} sx={{ backgroundColor: "#F1F1F1", mt: 4, borderRadius: '10px', px: 2 }}>
            <Typography variant='h6' fontWeight={600} sx={{ textAlign: 'center' }}>Enter New Shipping Address</Typography>
            <form action="">
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={6}>
                  <div className="input_box" >
                    <label htmlFor="item">First Name</label>
                    <input className="request_input" />
                  </div>
                  <div className="input_box">
                    <label htmlFor="item">Phone</label>
                    <input className="request_input" type="number" />
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="input_box">
                    <label htmlFor="item">Last Name</label>
                    <input className="request_input" />
                  </div>
                  <div className="input_box">
                    <label htmlFor="item">Company</label>
                    <input className="request_input" />
                  </div>
                </Grid>
                <Grid item xs={12} sx={{ mt: -4 }}>
                  <div className="input_box">
                    <label htmlFor="item">Address 1</label>
                    <input className="request_input" />
                  </div>
                </Grid>
                <Grid item xs={12} sx={{ mt: -4 }}>
                  <div className="input_box">
                    <label htmlFor="item">Address 2</label>
                    <input className="request_input" />
                  </div>
                </Grid>
                <Grid item xs={12} md={4} sx={{ mt: -4 }}>
                  <div className="input_box">
                    <label htmlFor="item">City</label>
                    <input className="request_input" />
                  </div>
                </Grid>
                <Grid item xs={12} md={4} sx={{ mt: -4 }}>
                  <div className="input_box">
                    <label htmlFor="item">State</label>
                    <input className="request_input" />
                  </div>
                </Grid>
                <Grid item xs={12} md={4} sx={{ mt: -4 }}>
                  <div className="input_box">
                    <label htmlFor="item">Zip</label>
                    <input className="request_input" />
                  </div>
                </Grid>
                <Grid item xs={12} sx={{ mt: -4 }}>
                  <div className="input_box">
                    <label htmlFor="item">Contry</label>
                    <input className="request_input" />
                  </div>
                </Grid>
                <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'end', gap: 8 }}  >
                  <Button sx={{ color: '#fff', backgroundColor: "#F4976C", width: '140px', "&:hover": { backgroundColor: "#F4976C" } }} >Cancel</Button>
                  <Button sx={{ color: '#fff', backgroundColor: "#F4976C", width: '140px', "&:hover": { backgroundColor: "#F4976C" } }}>Save Address</Button>
                </div>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} md={3.5} sx={{ backgroundColor: '#F1F1F1', borderRadius: "12px", mt: 4, ml: 2 }}>
            <Typography variant="body1" color="initial" sx={{ textAlign: 'center', fontSize: '18px', fontWeight: 600, mt: "-18px" }}>
              Order Summary
            </Typography>
            <Box sx={{ width: '100%', borderRadius: '10px', p: 4, backgroundColor: '#fff', ml: "-16px", mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" color="initial">
                  Sub Total (1-Item)
                </Typography>
                <Typography variant="body1" color="initial">
                  ${total}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                <Typography variant="body1" color="initial" >Shipping</Typography>
                <Typography variant="body1" color="initial" >TBD</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                <Typography variant="body1" color="initial" >Tax</Typography>
                <Typography variant="body1" color="initial" >TBD</Typography>
              </Box>
              <Divider variant="fullWidth" orientation="horizontal" sx={{ mt: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                <Typography variant="body1" color="initial" >Total</Typography>
                <Typography variant="body1" color="initial" sx={{ fontWeight: 900 }}>${total}</Typography>
              </Box>
              <Button variant='contained' sx={{
                width: "100%", fontSize: "12px", height: '32px', backgroundColor: '#F4976C', mt: 2,
                '&:hover': { backgroundColor: '#F4976C', },
              }}> Proceed to checkout</Button>
              <Box sx={{ backgroundColor: '#ffeeba', my: 2, borderRadius: '10px', p: 1 }}>
                <Typography variant="body2" color="initial">
                  we currently only ship web orders to the United
                  States.please submit RFQ if you need international
                  shipping
                </Typography>
              </Box>
              <Button variant='contained' sx={{
                width: "100%", fontSize: "12px", height: '32px', backgroundColor: '#F4976C', mt: 2,
                '&:hover': { backgroundColor: '#F4976C', },
              }}> Back to Ship</Button>

              <Link to="/addtocart">
                <Button variant='contained' sx={{
                  width: "100%", fontSize: "12px", height: '32px', backgroundColor: '#F4976C', mt: 2,
                  '&:hover': { backgroundColor: '#F4976C', },
                }}> Return To Cart</Button>
              </Link>
            </Box>

          </Grid>
        </Grid>
      </Container>

    </Box >
  )
}

export default CheckOutPage