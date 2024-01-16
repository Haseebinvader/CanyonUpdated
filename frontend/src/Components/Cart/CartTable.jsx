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


function CartTable({ i, index, removeFromCart, handleQuantityChange }) {

    const { itemsInLocalStorage, setItemsInLocalStorage, accessToken } = useContext(UserContext)
    const [price, setPrice] = useState(i.unitCost[0])
    useEffect(() => {
        try {
            axios.get(
                `https://api.businesscentral.dynamics.com/v2.0/4e94f06f-db01-47eb-aff3-7a284b01dd84/SandboxNoExtentions/ODataV4/Company('My%20Company')/itemsaleprice?$filter= ItemNo eq '${i.ItemNo}' and MinimumQuantity le ${i.qnty}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            ).then((res) => {
                setPrice(res.data.value[res.data.value.length - 1].UnitPrice);
            });
        } catch (error) {
            throw error;
        }
    }, [price, i.qnty, i.ItemNo])


    return (
        <tr key={index} style={{ borderTop: '1px solid #000' }}>
            <td style={{ padding: '10px 0', textAlign: 'center', border: '1px solid #F1F1F1' }}>
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ width: "20%", display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <Typography variant='body2' sx={{ color: "#F4976C" }}>{i?.apiData[0]?.SearchDescription}</Typography></Box>
                </Box>
            </td>
            <td style={{ padding: '25px 0', textAlign: 'center', border: '1px solid #F1F1F1' }}>
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ width: "40%", display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <Typography variant='body2' sx={{ color: "#F4976C" }}>{i?.apiData[0]?.Description}</Typography></Box>
                </Box>
            </td>
            <td style={{ padding: '25px 0', textAlign: 'center', border: '1px solid #F1F1F1' }}>
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ width: "40%", display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <Typography variant='body2' sx={{ color: "#F4976C" }}>{i?.apiData[0]?.Description2}</Typography></Box>
                </Box>
            </td>
            <td style={{ padding: '25px 0', textAlign: 'center', border: '1px solid #F1F1F1', }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}><input type="number" style={{ width: "50px", paddingLeft: "20px" }} value={i.qnty} onChange={(e) => handleQuantityChange(e, i)} />
                </Box>
            </td>
            <td style={{ padding: '25px 0', textAlign: 'center', border: '1px solid #F1F1F1' }}>
                ${price}
            </td>
            <td style={{ padding: '25px 0', textAlign: 'center', border: '1px solid #F1F1F1', fontWeight: 900 }}>
                ${(i.unitCost[0] * i.qnty).toFixed(2)}
            </td>
            <td style={{ padding: '25px 0', textAlign: 'center', border: '1px solid #F1F1F1', fontWeight: 900, cursor: 'pointer' }}>
                <DeleteIcon onClick={() => removeFromCart(index)} />
            </td>
        </tr>
    )
}

export default CartTable
