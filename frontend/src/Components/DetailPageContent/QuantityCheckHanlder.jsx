import React, { useContext, useEffect, useState } from 'react'

import { Typography, Box, Button, Divider, Grid } from '@mui/material'

import { useTheme } from '@emotion/react'

import '../Styles.css'

import { UserContext } from '../../UserContext/UserContext';

import axios from 'axios';

import { useParams, Link, useNavigate } from 'react-router-dom';






const QuantityCheckHanlder = () => {

  const theme = useTheme();

  const { row, accessToken, itemCart, setItemCart } = useContext(UserContext)

  const [islocalquantity, setIslocalQuantity] = useState()

  const [isopen, setisopen] = useState(false)
  const [cartAdded, setCartAdded] = useState()

  const { id } = useParams()

  const [rowData, setRowData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(
      `https://api.businesscentral.dynamics.com/v2.0/4e94f06f-db01-47eb-aff3-7a284b01dd84/SandboxNoExtentions/ODataV4/Company('My%20Company')/itemsaleprice?$filter: ItemNo eq ${id}`,
      {
        headers: {

          Authorization: `Bearer ${accessToken}`,

        },

        params: {

          $filter: `ItemNo eq '${id}'`,

        },

      }

    )

      .then((response) => {
        setRowData(response.data.value);

      })

      .catch((error) => {

        console.error("Error:", error);

      });

  }, [accessToken, rowData])

  return (

    <section >

      <Typography variant="body1" sx={{ fontWeight: 900, py: 3 }}>Enter a Quantity to Check Price</Typography>
      <Box sx={{ width: '100%', boxShadow: "0px 3px 4px #EDEDED", borderRadius: '6px', overflow: "hidden", py: 2, px: 4 }}>
        <Box sx={{ display: 'flex' }}>

          <input type="number" placeholder='Enter Quantity' className='QuantityInput' value={islocalquantity} onChange={(e) => setIslocalQuantity(parseInt(e.target.value))} style={{ fontSize: '12px' }} />

          {
            row.qnty === 0 || islocalquantity > row.qnty || row.price === 0 ?
              <Button variant='contained' sx={{

                width: "100%", weight: '40px', ml: 4, backgroundColor: '#EF3E36', px: 4, fontSize: { xs: "8px", md: "12px" },

                "&:hover": {

                  backgroundColor: '#EF3E36'
                }
              }} onClick={() => {
                if (sessionStorage.getItem('user')) {
                  navigate(`/requestquote/${id}@${islocalquantity}`)
                } else {
                  navigate("/register")
                }
              }} > Request Quote
              </Button>
              :
              <Button variant='contained' sx={{

                width: "100%", weight: '40px', ml: 4, backgroundColor: theme.palette.orange[500], px: 4, fontSize: { xs: "8px", md: "12px" },

                "&:hover": {

                  backgroundColor: theme.palette.orange[500]

                }

              }} onClick={() => {



                if (row.qnty === 0 || islocalquantity > row.qnty || row.price === 0) {



                  // toast.error("No quantity available");

                  // navigate(`/request-quote/${row.SearchDescription}`);



                } else {



                  if (islocalquantity !== 0 && islocalquantity <= row.qnty || row.price === 0) {

                    setisopen(!isopen);

                  }

                }



              }} >CHECK PRICE

              </Button>
          }


        </Box>



        {/* Table  */}

        {

          isopen && islocalquantity <= row.qnty && islocalquantity !== 0 ? <Grid container spacing={4} sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

            <Grid item xs={12} md={9}>

              <table cellspacing="0" style={{ width: "100%" }}>

                <thead>

                  <tr style={{ backgroundColor: '#F1F1F1' }}>
                    <th style={{ padding: '20px 0', fontSize: "14px" }}>Quantity</th>
                    <th style={{ padding: '20px 0', borderLeft: '1px solid #fff', fontSize: "14px" }}>Estimated Ship Time</th>
                    <th style={{ padding: '20px 0', borderLeft: '1px solid #fff', fontSize: "14px" }}>Unit Cost</th>
                    <th style={{ padding: '20px 0', borderLeft: '1px solid #fff', fontSize: "14px" }}>Total Price</th>
                  </tr>
                </thead>

                <tbody >

                  <tr style={{ borderTop: "1px solid #000" }}>

                    <td style={{ padding: '20px 0', textAlign: 'center', border: '1px solid #F1F1F1' }}>{islocalquantity}</td>

                    <td style={{ padding: '20px 0', textAlign: 'center', border: '1px solid #F1F1F1' }}>Today or Towmorrow</td>

                    <td style={{ padding: '20px 0', textAlign: 'center', border: '1px solid #F1F1F1' }}>$

                      {islocalquantity

                        ? rowData

                          .filter((i, index) => {

                            if (

                              islocalquantity >= i.MinimumQuantity &&

                              (index + 1 === rowData.length ||

                                islocalquantity <

                                rowData[index + 1]

                                  .MinimumQuantity)

                            ) {

                              return true;

                            }

                            return false;

                          })

                          .map(

                            (filteredPrice) => filteredPrice.UnitPrice

                          )

                        : null}</td>

                    <td style={{ padding: '20px 0', textAlign: 'center', border: '1px solid #F1F1F1', fontWeight: 900 }}>$

                      {islocalquantity

                        ? rowData

                          .filter((i, index) => {

                            if (

                              islocalquantity >= i.MinimumQuantity &&

                              (index + 1 === rowData.length ||

                                islocalquantity <

                                rowData[index + 1]

                                  .MinimumQuantity)

                            ) {

                              return true;

                            }

                            return false;

                          })

                          .map((filteredPrice) =>

                            (

                              filteredPrice.UnitPrice *

                              islocalquantity

                            ).toFixed(2)

                          )

                        : null}</td>

                  </tr>

                </tbody>

              </table>

            </Grid>

            <Grid item xs={12} md={3}>

              <Button variant='contained' sx={{

                width: "100%", height: '40px', backgroundColor: theme.palette.orange[500],

                fontSize: { xs: "8px", md: "12px" }, padding: "0",

                "&:hover": {

                  backgroundColor: theme.palette.orange[500]

                }

              }} onClick={() => {
                const itemAlreadyInCart = itemCart.some((cartItem) => cartItem.ItemNo === row.ItemNo); // Assuming each item has a unique 'id'

                if (!itemAlreadyInCart) {
                  setCartAdded(true)

                  const objs = {

                    'ItemNo': row.ItemNo,

                    'qnty': islocalquantity,
                    'totalQnty': row.qnty,

                    'unitCost': islocalquantity

                      ? rowData

                        .filter((i, index) => {

                          if (

                            islocalquantity >= i.MinimumQuantity &&

                            (index + 1 === rowData.length ||

                              islocalquantity <

                              rowData[index + 1].MinimumQuantity)

                          ) {

                            return true;

                          }

                          return false;

                        })

                        .map(

                          (filteredPrice) => filteredPrice.UnitPrice

                        )

                      : null,

                    'desc': row.Description

                  }

                  const updatedCart = [...itemCart, objs];

                  setItemCart(updatedCart);

                  localStorage.setItem('itemCart', JSON.stringify(updatedCart));
                  window.location.reload();
                } else {

                  setCartAdded(false)

                }

              }} > Add to cart</Button>
              <>{
                cartAdded ?
                  <p style={{ fontSize: '0.8rem', marginTop: '5px' }} >&#9989; Added To Cart!</p> : ""
              }
                {cartAdded === false ? <p style={{ fontSize: '0.8rem', marginTop: '5px' }} >&#x2757; Already In Cart!</p> : ""}
              </>
            </Grid>

          </Grid> : <></>}



      </Box>



      <Box sx={{ mt: 4, borderRadius: "6px", overflow: 'hidden', boxShadow: "0px 3px 18px #EDEDED", }}>

        <table style={{ width: "100%" }} cellspacing="0">

          <thead>

            <tr style={{ backgroundColor: '#182e49' }}>

              <th style={{ padding: '10px 0', color: '#fff', fontSize: "14px" }}>Quantity</th>

              <th style={{ padding: '10px 0', borderLeft: '1px solid #fff', color: '#fff', fontSize: "14px" }}>Unit Cost</th>

              <th style={{ padding: '10px 0', borderLeft: '1px solid #fff', color: '#fff', fontSize: "14px" }}>Discount</th>

            </tr>

          </thead>

          <tbody >

            {rowData?.map((item, index) => (

              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#F1F1F1' : '#fff' }}>

                <td style={{ padding: '10px 0', textAlign: 'center', border: '1px solid #D9D9D9' }}>{item.MinimumQuantity}{" "}



                  {rowData.length - 1 === index ? "+" : "-"}{" "}



                  {index + 1 < rowData.length



                    ? rowData[index + 1].MinimumQuantity - 1



                    : null}</td>

                <td style={{ padding: '10px 0', textAlign: 'center', border: '1px solid #D9D9D9' }}>${item.UnitPrice.toFixed(2)}</td>

                <td style={{ padding: '10px 0', textAlign: 'center', border: '1px solid #D9D9D9' }}>{index !== 0



                  ? (



                    (1 - item.UnitPrice / rowData[0].UnitPrice) *



                    100



                  ).toFixed(0) + "% off"



                  : "0% off"}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </Box>

    </section>

  )

}



export default QuantityCheckHanlder