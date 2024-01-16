import React, { useContext } from 'react'
import { Box, Grid, Typography, Divider } from '@mui/material'
import { useTheme } from '@emotion/react'
import { BorderRight } from '@mui/icons-material'
import { UserContext } from '../../UserContext/UserContext'

const TopDetails = ({ color, AvailableQuantity, shipTime }) => {
    const { row } = useContext(UserContext)

    return (
        <section>
            <Box sx={{ py: 2 }}>
                <Typography variant="body1" color="initial" sx={{ width: "100%", textAlign: 'center', fontWeight: 900 }}>Color: {color}</Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 300 }}>
                <Typography variant="body1" sx={{ fontWeight: 300 }}>
                    {row.SearchDescription && `${row.SearchDescription} is`}
                    {row.Color && ` ${row.Color}`}
                    {row.Durometer && `, ${row.Durometer}`}
                    {row.DurometerScale && ` ${row.DurometerScale}`}
                    {row.CureType && `, ${row.CureType}`}
                    {row.Material && ` ${row.Material}`}
                    {row.CrossSectionalGeometry && ` ${row.CrossSectionalGeometry}`}
                    {row.CompoundNumber && ` made from ${row.CompoundNumber}`}
                    {row.SizeStandard && `. The size is ${row.SizeStandard}`}
                    {row.SizeAS568 && `${row.SizeAS568}. `}
                    {row.SizeJIS && `${row.SizeJIS}.`}
                    <br />
                    <br />
                    {row.MaterialNotes ? `${row.CompoundNumber && `${row.CompoundNumber} is manufactured with the following features and specifications: ${row.MaterialNotes}`}` : ''}
                    {row.FDACompliant || row.NSF51 || row.NSF61 || row.USPClassVI || row.KTW || row.WRAS || row.A3Sanitary ? `${row.CompoundNumber && `${row.CompoundNumber} is manufactured with the following features and specifications: ${row.FDACompliant ? row.FDACompliant + "," : ''} ${row.NSF51 ? row.NSF51 + "," : ''} ${row.NSF61 ? row.NSF61 + "," : ''} ${row.USPClassVI ? row.USPClassVI + "," : ''} ${row.KTW ? row.KTW + "," : ''} ${row.WRAS ? row.WRAS + "," : ''} ${row.A3Sanitary ? row.A3Sanitary + "." : ''}`}` : ''}
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
        </section >
    )
}

export default TopDetails