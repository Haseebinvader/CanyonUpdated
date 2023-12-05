import React, { useState, useEffect, useContext } from 'react';
import { useTheme } from '@emotion/react';
import {
  Typography,
  Grid,
  Container,
  Box,
  Divider,
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CartBtn from '../Reuse/CartBtn';
import { UserContext } from '../../UserContext/UserContext';
import { Link } from 'react-router-dom'

const localStorageItemCart = JSON.parse(localStorage.getItem('itemCart')) || [];

const AddToCart = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0)
  const { row } = useContext(UserContext)

  useEffect(() => {
    // Calculate the total when the component mounts
    const newTotal = localStorageItemCart.reduce((acc, item) => {
      return acc + item.unitCost[0] * item.qnty;
    }, 0);
    setTotal(newTotal);
  }, []); // Empty dependency array means this effect runs once on component mount

  const increaseQuantityInLocalStorage = (itemNo) => {
    window.location.reload();
    const storedObjectString = localStorage.getItem('itemCart');
    // Check if the object exists in localStorage
    if (storedObjectString) {
      try {
        // Parse the JSON string into an object
        const storedObject = JSON.parse(storedObjectString);



        // Find the item in the object based on the itemNo
        const itemToUpdate = storedObject.find(item => item.ItemNo === itemNo);



        if (itemToUpdate) {
          // Update the quantity of the item
          itemToUpdate.qnty += 1;



          // Save the updated object back to localStorage
          localStorage.setItem('itemCart', JSON.stringify(storedObject));
          console.log('Quantity updated successfully.');
        } else {
          console.log('Item not found in the object.');
        }
      } catch (error) {
        console.error('Error parsing or updating the object:', error);
      }
    } else {
      console.log('No object found in localStorage.');
    }
  };

  const decreaseQuantityInLocalStorage = (itemNo) => {
    window.location.reload();
    const storedObjectString = localStorage.getItem('itemCart');
    // Check if the object exists in localStorage
    if (storedObjectString) {
      try {
        // Parse the JSON string into an object
        const storedObject = JSON.parse(storedObjectString);



        // Find the item in the object based on the itemNo
        const itemToUpdate = storedObject.find(item => item.ItemNo === itemNo);



        if (itemToUpdate) {
          // Update the quantity of the item
          itemToUpdate.qnty = itemToUpdate.qnty - 1;



          // Save the updated object back to localStorage
          localStorage.setItem('itemCart', JSON.stringify(storedObject));
          console.log('Quantity updated successfully.');
        } else {
          console.log('Item not found in the object.');
        }
      } catch (error) {
        console.error('Error parsing or updating the object:', error);
      }
    } else {
      console.log('No object found in localStorage.');
    }
  };

  const handleClickOpen = () => setOpen(true);

  const removeFromCart = (itemIndex) => {
    setOpen(false);
    const updatedCart = [...localStorageItemCart];
    updatedCart.splice(itemIndex, 1);
    localStorage.setItem('itemCart', JSON.stringify(updatedCart));
    window.location.reload();
  };

  return (
    <section style={{ minHeight: '70vh' }}>
      <Typography
        variant="h5"
        sx={{ color: theme.palette.secondary.main, fontWeight: 900, textAlign: 'left', mt: 6, ml: 6, mb: 4 }}
      >
        <ShoppingBagIcon sx={{ fontSize: '25px' }} />
        My Cart
      </Typography>

      <Container>
        <Grid container spacing={4} sx={{ display: 'flex', gap: 2 }}>
          <Grid item xs={12} md={8}>
            {/* Table  */}
            <table cellSpacing="0" style={{ width: '100%', borderRadius: "12px", overflow: 'hidden' }}>
              <thead>
                <tr style={{ backgroundColor: '#F1F1F1' }}>
                  <th style={{ padding: '10px 0', borderLeft: '1px solid #fff', width: '50%', fontsize: "14px" }}>Product</th>
                  <th style={{ padding: '10px 0', borderLeft: '1px solid #fff', fontsize: "14px" }}>Quantity</th>
                  <th style={{ padding: '10px 0', borderLeft: '1px solid #fff', fontsize: "14px" }}>Unit Cost</th>
                  <th style={{ padding: '10px 0', borderLeft: '1px solid #fff', fontsize: "14px" }}>Sub Total</th>
                  <th style={{ padding: '10px 0', borderLeft: '1px solid #fff', fontsize: "14px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {localStorageItemCart?.map((i, index) => (
                  <tr key={index} style={{ borderTop: '1px solid #000' }}>
                    <td style={{ padding: '25px 0', textAlign: 'center', border: '1px solid #F1F1F1' }}>
                      {/* <img src="" alt="" /> */}
                      <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                        <Box sx={{ width: "40%", display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column" }}>img</Box>
                        <Box sx={{ width: "60%", display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                          <Typography variant='body2' sx={{ color: "#F4976C" }}>{i.desc}</Typography>
                        </Box>
                      </Box>
                    </td>
                    <td style={{ padding: '25px 0', textAlign: 'center', border: '1px solid #F1F1F1', }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                        <CartBtn text={"-"} onClick={() => {
                          if (i.qnty !== 0) {
                            decreaseQuantityInLocalStorage(i.ItemNo)

                          }
                        }} /> {i.qnty} <CartBtn text={"+"} onClick={() => {
                          console.log("clicked");
                          if (i.qnty < i.totalQnty) {
                            increaseQuantityInLocalStorage(i.ItemNo)
                          }
                        }} />
                      </Box>
                    </td>
                    <td style={{ padding: '25px 0', textAlign: 'center', border: '1px solid #F1F1F1' }}>
                      ${i.unitCost[0]}
                    </td>
                    <td style={{ padding: '25px 0', textAlign: 'center', border: '1px solid #F1F1F1', fontWeight: 900 }}>
                      ${i.unitCost[0] * i.qnty}
                    </td>
                    <td style={{ padding: '25px 0', textAlign: 'center', border: '1px solid #F1F1F1', fontWeight: 900, cursor: 'pointer' }}>
                      <DeleteIcon onClick={() => removeFromCart(index)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
          <Grid item xs={12} md={3.5} sx={{ backgroundColor: '#F1F1F1', borderRadius: "12px", mt: 4 }}>
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
              <Link to="/CheckOut">
                <Button variant='contained' sx={{
                  width: "100%", fontSize: "12px", height: '32px', backgroundColor: '#F4976C', mt: 2,
                  '&:hover': { backgroundColor: '#F4976C', },
                }}> Proceed to checkout</Button>
              </Link>
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
            </Box>
          </Grid>
        </Grid>
      </Container>

      <div>
        <Dialog
          open={open}
          onClose={removeFromCart}>
          <Box sx={{ width: "400px" }}>
            <DialogTitle id="alert-dialog-title">
              {"Are you sure to remove product?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={removeFromCart} sx={{
                color: '#fff', backgroundColor: "#E50000", width: "120px", '&:hover': { backgroundColor: "#E50000" }
              }}>
                Close
              </Button>
              <Button onClick={removeFromCart}
                sx={{ color: '#fff', backgroundColor: "#182e49", width: "120px", '&:hover': { backgroundColor: "#182e49" } }}>
                Agree
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </div>

    </section>
  )
}

export default AddToCart







