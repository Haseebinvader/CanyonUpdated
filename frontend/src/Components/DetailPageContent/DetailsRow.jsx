import React, { Fragment } from 'react'
import { Typography, Divider, Box } from '@mui/material'

const DetailsRow = ({value, tech}) => {
    return (
        <Fragment>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: 'center',mt:3 }}>
                <Typography variant="body1" fontWeight={600}>{tech}</Typography>
                <Typography variant="body1" >{value}</Typography>
            </Box>
            <Divider variant="fullWidth" orientation="horizontal" />
        </Fragment>
    )

}
export default DetailsRow