import React from 'react'
import { Box, Grid, Typography, Divider } from '@mui/material'
import { useTheme } from '@emotion/react'
import { BorderRight } from '@mui/icons-material'

const TopDetails = ({ color, AvailableQuantity, shipTime, row }) => {
    return (
        <section>
            <Box sx={{ py: 2 }}>
                <Typography variant="body1" color="initial" sx={{ width: "100%", textAlign: 'center', fontWeight: 900 }}>Color: {color}</Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 300 }}>
                <Typography variant="body1" sx={{ fontWeight: 300 }}>
                    {row.SearchDescription && `${row.SearchDescription} is`}
                    {row.Color && `, ${row.Color}`}
                    {row.DurometerScale && `, ${row.DurometerScale}`}
                    {row.Durometer && `, ${row.Durometer}`}
                    {row.CureType && `, ${row.CureType}`}
                    {row.Material && ` ${row.Material}`}
                    {row.CrossSectionalGeometry && ` ${row.CrossSectionalGeometry}`}
                    {row.CompoundNumber && ` made from ${row.CompoundNumber}`}
                    {row.SizeStandard && `. The size is ${row.SizeStandard}`}
                    {row.SizeAS568 && `${row.SizeAS568}.`}
                    {row.SizeJIS && `${row.SizeJIS}.`}
                    {row.MaterialNotes?  `${row.CompoundNumber &&  `${row.CompoundNumber} is manufactured with the following features and specifications : ${row.MaterialNotes}`}`:''}
                    {/* {row.MaterialNotes?  `${row.CompoundNumber &&  `${row.CompoundNumber} is manufactured with the following features and specifications : ${row.MaterialNotes}`}`:''} */}
                </Typography>

            </Typography>


            <Box sx={{ boxShadow: "0px 3px 4px #EDEDED", mt: 0.51, px: 3 }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: "space-between", py: 1 }}>
                    <Typography variant="body2" color="initial" sx={{ fontWeight: 900, color: 'black', fontSize: '11px' }}>Available Quantity</Typography>
                    <Typography variant="body2" color="initial" sx={{ fontWeight: 900, color: 'black', fontSize: '11px' }}>Lead Time to Ship</Typography>
                </Box>
                <Divider width="full"></Divider>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: "space-between", py: 2 }}>
                    <Typography variant="body1" color="initial" sx={{ fontWeight: 300, color: 'gray', fontSize: '11px' }}>{row.qnty}</Typography>
                    <Typography variant="body1" color="initial" sx={{ fontWeight: 300, color: 'gray', fontSize: '11px' }}>{shipTime} Day</Typography>
                </Box>
            </Box>
        </section>
    )
}

export default TopDetails