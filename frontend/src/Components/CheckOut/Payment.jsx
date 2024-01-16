import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import { UserContext } from "../../UserContext/UserContext";



export default function Payment() {
    const { cardDetails, setCardDetails } = React.useContext(UserContext)

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Method Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={cardDetails?.methodType}
                            label="Age"
                            onChange={(event) => setCardDetails({ ...cardDetails, "methodType": event.target.value })}
                        >
                            <MenuItem value={"CreditCard"}>Credit Card</MenuItem>
                            <MenuItem value={"DebitCard"}>Debit Card</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="accountHolderName"
                        label="Card Holder Name"
                        value={cardDetails?.accountHolderName}
                        onChange={(e) => setCardDetails({ ...cardDetails, "accountHolderName": e.target.value })}
                        fullWidth
                        autoComplete="cc-number"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="accountHolderNumber"
                        label="Card Number"
                        value={cardDetails?.cardNumber}
                        onChange={(e) => setCardDetails({ ...cardDetails, "cardNumber": e.target.value })}
                        fullWidth
                        autoComplete="cc-number"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="expDate"
                        label="Expiry date"
                        fullWidth
                        value={cardDetails?.cardExpiration}
                        onChange={(e) => setCardDetails({ ...cardDetails, "cardExpiration": e.target.value })}
                        autoComplete="cc-exp"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        fullWidth
                        value={cardDetails?.cardCode}
                        onChange={(e) => setCardDetails({ ...cardDetails, "cardCode": e.target.value })}
                        autoComplete="cc-csc"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="avsStreet"
                        label="Street Address"
                        fullWidth
                        value={cardDetails?.avsStreet}
                        onChange={(e) => setCardDetails({ ...cardDetails, "avsStreet": e.target.value })}
                        autoComplete="cc-csc"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="avsZip"
                        label="Zip"
                        fullWidth
                        value={cardDetails?.avsZip}
                        onChange={(e) => setCardDetails({ ...cardDetails, "avsZip": e.target.value })}
                        autoComplete="cc-csc"
                        variant="standard"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}