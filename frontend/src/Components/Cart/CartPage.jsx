import React, { useState, useEffect, useContext, useCallback } from 'react';
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
import DialogTitle from '@mui/material/DialogTitle';
import CartBtn from '../Reuse/CartBtn';
import { UserContext } from '../../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartTable from './CartTable';

// const itemsInLocalStorage = JSON.parse(localStorage.getItem('itemCart')) || [];


const fetchItemDetails = async (item) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/products/?ItemNo=${item.ItemNo}`);
    const data = await response.data.results;
    return data; // Adjust this based on your API response structure
  } catch (error) {
    console.error('Error fetching item details:', error);
    return null;
  }
};


const AddToCart = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0)
  const { itemsInLocalStorage, setItemsInLocalStorage, accessToken } = useContext(UserContext)
  const [itemDetails, setItemDetails] = useState([]);



  const handleQuantityChange = ((e, i) => {
    const updatedItems = itemsInLocalStorage.map(item => {
      if (item.ItemNo === i.ItemNo) {
        return { ...item, qnty: e.target.value };
      }
      return item;
    });

    localStorage.setItem('itemCart', JSON.stringify(updatedItems));
    setItemsInLocalStorage(updatedItems);
  });
  useEffect(() => {
    const updateLocalStorage = () => {
      localStorage.setItem('itemCart', JSON.stringify(itemsInLocalStorage));
    };

    updateLocalStorage();
  }, [itemsInLocalStorage, handleQuantityChange]);


  useEffect(() => {
    const fetchData = async () => {
      const details = await Promise.all(
        itemsInLocalStorage.map(async (item) => {
          const apiData = await fetchItemDetails(item);
          return { ...item, apiData };
        })
      );
      setItemDetails(details);
    };

    fetchData();
  }, [itemsInLocalStorage]);

  const handleCheckOut =
    (e) => {
      e.preventDefault();
      if (sessionStorage.getItem('user')) {
        navigate("/checkOut");
      } else {
        navigate("/register")
      }
    }


  useEffect(() => {
    // Calculate the total when the component mounts
    const newTotal = itemsInLocalStorage.reduce((acc, item) => {
      return acc + item.unitCost[0] * item.qnty;
    }, 0);
    setTotal(newTotal);
  }, [total, setTotal, itemsInLocalStorage]); // Empty dependency array means this effect runs once on component mount

  const handleClickOpen = () => setOpen(true);

  const removeFromCart = (itemIndex) => {
    setOpen(false);
    const updatedCart = [...itemsInLocalStorage];
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
                  <th style={{ padding: '10px 0', borderLeft: '1px solid #fff', width: '25%', fontsize: "14px" }}>Part Number</th>
                  <th style={{ padding: '10px 0', borderLeft: '1px solid #fff', width: '30%', fontsize: "14px" }}>Material Desc</th>
                  <th style={{ padding: '10px 0', borderLeft: '1px solid #fff', width: '50%', fontsize: "14px" }}>Geometry Desc</th>
                  <th style={{ padding: '10px 0', borderLeft: '1px solid #fff', fontsize: "14px" }}>Quantity</th>
                  <th style={{ padding: '10px 0', borderLeft: '1px solid #fff', fontsize: "14px" }}>Unit Cost</th>
                  <th style={{ padding: '10px 0', borderLeft: '1px solid #fff', fontsize: "14px" }}>Sub Total</th>
                  <th style={{ padding: '10px 0', borderLeft: '1px solid #fff', fontsize: "14px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {itemDetails?.map((i, index) => (
                  <CartTable i={i} index={index} removeFromCart={removeFromCart} handleQuantityChange={handleQuantityChange} />
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
              <Button variant='contained' sx={{
                width: "100%", fontSize: "12px", height: '32px', backgroundColor: '#F4976C', mt: 2,
                '&:hover': { backgroundColor: '#F4976C', },
              }} onClick={handleCheckOut} > Proceed to checkout</Button>
              <Button variant='contained' sx={{
                width: "100%", fontSize: "12px", height: '32px', backgroundColor: '#F4976C', mt: 2,
                '&:hover': { backgroundColor: '#F4976C', },
              }} onClick={() => navigate('/')} > Back to Main Page</Button>
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

    </section >
  )
}

export default AddToCart







