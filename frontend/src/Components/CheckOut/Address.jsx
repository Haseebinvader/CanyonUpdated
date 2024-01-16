import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

export default function Address() {
    const [userState, setuserState] = useState();
    React.useEffect(() => {
        const user = sessionStorage.getItem("user");
        axios.get(`http://127.0.0.1:8000/authentication/user/${user}/`).then((res) => {
            setuserState(res.data);
        })
    }, [userState]);
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={userState?.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        value={userState?.addressLine1}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                        value={userState?.addressLine2}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        value={userState?.city}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        fullWidth
                        variant="standard"
                        value={userState?.email}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                        value={userState?.postalCode}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                        value={userState?.phoneNumber}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}