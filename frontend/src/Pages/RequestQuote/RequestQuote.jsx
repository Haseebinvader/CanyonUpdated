import React, { useContext } from "react";
import "./Request.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { Header, Footer } from '../../Components/index'
import axios from "axios";
import { UserContext } from "../../UserContext/UserContext";

const RequestQuote = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const [user, setuser] = React.useState();
  const { accessToken, requestAdata, setRequestAdata } = useContext(UserContext)
  React.useEffect(() => {
    const user = sessionStorage.getItem("user");
    axios.get(`http://127.0.0.1:8000/authentication/user/${user}/`).then((res) => {
      setuser(res.data);
    })
  }, [user]);

  const handleCancel = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    const item = id?.split('@')[0]
    axios.get(
      `http://127.0.0.1:8000/api/products/?ItemNo=${item}`
    )
      .then((response) => {
        setRequestAdata(response.data.results[0]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [accessToken, requestAdata])

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="head">REQUEST A QUOTE</h1>
        <p className="para">
          You should expect a quick response from us, but if you need an
          immediate response, Call us at +1 (505) 225-2487 to speak with one of our
          sales representatives right away. <br /> <br />
          <strong>Note:</strong> If you call, please reference the <strong>Item
            No</strong> below for fast service.
        </p>
        <form action="" className="form" method="post">
          {/* left  */}
          <Grid container spacing={{ xs: 1, md: 4 }} sx={{ py: 4 }}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <div className="input_box">
                <label htmlFor="item">Item No</label>
                <input className="request_input" value={requestAdata?.SearchDescription} />
              </div>
              <div className="input_box">
                <label htmlFor="item">Target Price</label>
                <input className="request_input" />
              </div>
              <div className="input_box">
                <label htmlFor="item">Name</label>
                <input className="request_input" defaultValue={user?.name} />
              </div>
              <div className="input_box">
                <label htmlFor="item">Phone</label>
                <input className="request_input" defaultValue={user?.phoneNumber} />
              </div>
            </Grid>


            {/* right  */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <div className="input_box">
                <label htmlFor="item">Quantity</label>
                <input className="request_input" defaultValue={id?.split('@')[1]} />
              </div>
              <div className="input_box">
                <label htmlFor="item">Comments </label>
                <input className="request_input" />
              </div>
              <div className="input_box">
                <label htmlFor="item">Address</label>
                <input className="request_input" defaultValue={user?.addressLine1 + " " + user?.addressLine2} />
              </div>
              <div className="input_box">
                <label htmlFor="item">Email</label>
                <input className="request_input" defaultValue={user?.email} />
              </div>
            </Grid>
          </Grid>
          <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'end', gap: 8 }}  >
            <Button sx={{ color: '#fff', backgroundColor: "#F4976C", width: '140px', "&:hover": { backgroundColor: "#F4976C" } }} onClick={handleCancel}>Cancel</Button>
            <Button sx={{ color: '#fff', backgroundColor: "#F4976C", width: '140px', "&:hover": { backgroundColor: "#F4976C" } }}>Submit</Button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default RequestQuote;
