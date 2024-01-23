import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

export default function Address() {
    const [userState, setuserState] = useState({
        "name": "",
        "addressLine1": "",
        "addressLine2": "",
        "city": "",
        "email": "",
        "postalCode": "",
        "phoneNumber": "",
    });
    React.useEffect(() => {
        const user = sessionStorage.getItem("user");
        axios.get(`http://127.0.0.1:8000/authentication/user/${user}/`).then((res) => {
            setuserState(res.data);
        })
    }, []);
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
                        onChange={(e) => setuserState({ ...userState, name: e.target.value })}
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
                        onChange={(e) => setuserState({ ...userState, addressLine1: e.target.value })}

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
                        onChange={(e) => setuserState({ ...userState, addressLine2: e.target.value })}

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
                        onChange={(e) => setuserState({ ...userState, city: e.target.value })}

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        fullWidth
                        variant="standard"
                        value={userState?.email}
                        onChange={(e) => setuserState({ ...userState, email: e.target.value })}

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
                        onChange={(e) => setuserState({ ...userState, postalCode: e.target.value })}

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
                        onChange={(e) => setuserState({ ...userState, phoneNumber: e.target.value })}

                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}