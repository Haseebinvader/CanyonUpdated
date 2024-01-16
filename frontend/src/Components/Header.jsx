import React, { useContext, useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import './Styles.css'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';

const Header = () => {
  const { itemLineCount, setItemLineCount } = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <section style={{ width: "100%", height: "70px", backgroundColor: "#182e49" }}>
      <Box sx={{ width: "100%", height: "70px", display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 4, }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }} onClick={() => navigate('/')} >
          <img src="../../public/PNG/logo.png" alt="Logo" style={{ scale: '0.7', cursor: 'pointer' }} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Button variant='contained' sx={{
            width: "150px", fontSize: "12px", height: '32px', backgroundColor: '#EF3E36',
            '&:hover': { backgroundColor: '#EF3E36' },
          }} onClick={() => window.location.href = 'https://www.canyoncomponents.com/'} >
            Back To Main Site
          </Button>
          <Button variant='contained' sx={{
            width: "120px", fontSize: "12px", height: '32px', backgroundColor: '#F4976C',
            '&:hover': { backgroundColor: '#F4976C' },
          }} onClick={() => window.location.href = 'https://www.canyoncomponents.com/request-a-quote'}>
            Get a Quote
          </Button>
          <Button variant='contained' sx={{
            width: "120px", fontSize: "12px", height: '32px', backgroundColor: '#F4976C',
            '&:hover': { backgroundColor: '#F4976C' },
          }} onClick={() => navigate('/login')} >
            Login
          </Button>
          <Link onClick={() => window.location.load('/addtocart')} to={'/addtocart'} >
            <Badge badgeContent={itemLineCount} color="error" >
              <ShoppingCartIcon sx={{ color: "#fff" }} />
            </Badge>
          </Link>
        </Box>
      </Box>
    </section>
  )
}

export default Header