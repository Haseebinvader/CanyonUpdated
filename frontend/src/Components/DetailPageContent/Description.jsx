import React, { useContext } from 'react'
import { Typography, Divider, Box } from '@mui/material'
import { useTheme } from '@emotion/react'
import DetailsRow from './DetailsRow'
import { UserContext } from '../../UserContext/UserContext'

const Description = () => {
    const theme = useTheme();
    const { row } = useContext(UserContext)

    return (
        <section>
            <Box sx={{ width: 1, backgroundColor: theme.palette.secondary.main, mt: 1 }}>
                <Typography variant="h6" sx={{ color: theme.palette.white[900], display: "flex", justifyContent: 'center', alignItems: "center", height: '40px', fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>Detailed Description</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ my: 2, display: "flex", justifyContent: "space-between", }}>
                    <Typography variant="h6" color="initial" sx={{ fontWeight: 900 }}>Tech Specs</Typography>
                    <Typography variant="h6" color="initial" sx={{ fontWeight: 900 }}>Value</Typography>
                </Box>
                <DetailsRow tech={"Compund Number"} value={row.CompoundNumber} />
                <DetailsRow tech={"Material"} value={row.Material} />
                <DetailsRow tech={"Material Subtype"} value={row.MaterialSubtype} />
                <DetailsRow tech={"Color"} value={row.Color} />
                <DetailsRow tech={"Durometer"} value={row.DurometerScale} />
                <DetailsRow tech={"Durometer Scale"} value={row.Durometer} />
                <DetailsRow tech={"Type"} value={row.CrossSectionalGeometry} />
                <DetailsRow tech={"Size"} value={row.SizeAS568 ? row.SizeStandard + row.SizeAS568 : row.SizeStandard + row.SizeJIS} />
                <DetailsRow tech={"Cross Section (mm)"} value={row.CrossSectionalDiameter} />
                <DetailsRow tech={"Inside Diameter (mm)"} value={row.InsideDiameter} />
                <DetailsRow tech={"High Temperature (°C)"} value={row.HighTemperature} />
                <DetailsRow tech={"Low Temperature (°C)"} value={row.LowTemperature} />
                <DetailsRow tech={"Material Compliance"} value={`
                ${row.FDACompliant ? row.FDACompliant + ',' : ''}
                ${row.NSF61 ? row.NSF61 + ',' : ''}
                ${row.FDAType ? row.FDAType + ',' : ''}
                ${row.USPClassVI87 ? row.USPClassVI87 + ',' : ''}
                ${row.USPClassVI88 ? row.USPClassVI88 + ',' : ''}
                ${row.ULListed ? row.ULListed + ',' : ''}
                ${row.ULRating ? row.ULRating + ',' : ''}
                ${row.AntiExplosiveDecompression ? row.AntiExplosiveDecompression + ',' : ''}
                ${row.NACETM0297 ? row.NACETM0297 + ',' : ''}
                ${row.NORSOKM710 ? row.NORSOKM710 + ',' : ''}
                ${row.SteamResistant ? row.SteamResistant + ',' : ''}
                ${row.UltraSteamResistant ? row.UltraSteamResistant + ',' : ''}
                ${row.LowCompressionSet ? row.LowCompressionSet + ',' : ''}
                ${row.KTW ? row.KTW + ',' : ''}
                ${row.WRAS ? row.WRAS + ',' : ''}
                ${row.A3Sanitary ? row.A3Sanitary + ',' : ''}
                ${row.MetalDetectable ? row.MetalDetectable + ',' : ''}
                ${row.CleanRoomManufactured ? row.CleanRoomManufactured + ',' : ''}
                ${row.NSF51 ? row.NSF51 + ',' : ''}
                ${row.InternallyLubricated ? row.InternallyLubricated + ',' : ''}
                ${row.ExternallyLubricated ? row.ExternallyLubricated + ',' : ''}
                ${row.ConductiveFiller ? row.ConductiveFiller + ',' : ''}
                `} />
            </Box>
        </section>
    )
}

export default Description