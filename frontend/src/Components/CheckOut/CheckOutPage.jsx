import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Address from "./Address";
import Payment from "./Payment";
import Review from "./Review";
import { useContext } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../../UserContext/UserContext";


const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Address />;
    case 1:
      return <Payment />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function CheckOutPage() {
  const { accessToken, setorderno, orderno, cardDetails, setCardDetails } = useContext(UserContext);
  const [custInternalID, setCustInternalID] = React.useState('')
  React.useEffect(() => {
    axios
      .post(
        "https://ebiz-api1.ebizcharge.net/v1/GetCustomer",
        {
          "getCustomer": {
            "securityToken": {
              "securityId": "919fc55e-940a-44d5-8770-f3faa8f982b9",
              "userId": "aS60T3",
              "password": "3Cn166A"
            },
            "customerId": "AZZ32"
          }
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "EBizSubscription-Key": '5cdcf15d32a84acfac7d76ed5bdcab49'
          },
        }
      )
      .then((res) => {
        setCustInternalID(res.data.getCustomerResponse.getCustomerResult.customerInternalId
        );
      });
  }, [custInternalID])
  const postCardDetails = () => {
    axios
      .post(
        "https://ebiz-api1.ebizcharge.net/v1/AddCustomerPaymentMethodProfile",
        {
          "addCustomerPaymentMethodProfile": {
            "securityToken": {
              "securityId": "919fc55e-940a-44d5-8770-f3faa8f982b9",
              "userId": "aS60T3",
              "password": "3Cn166A"
            },
            "customerInternalId": custInternalID,
            "paymentMethodProfile": {
              "methodType": cardDetails?.methodType,
              "methodName": cardDetails?.methodName,
              "accountHolderName": cardDetails?.accountHolderName,
              "avsStreet": cardDetails?.avsStreet,
              "avsZip": cardDetails?.avsZip,
              "cardCode": cardDetails?.cardCode,
              "cardExpiration": cardDetails?.cardExpiration,
              "cardNumber": cardDetails?.cardNumber
            }
          }
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "EBizSubscription-Key": '5cdcf15d32a84acfac7d76ed5bdcab49'
          },
        }
      )
      .then((res) => {
        setCustInternalID(res.data.getCustomerResponse.getCustomerResult.customerInternalId
        );
      });
  };
  const postSalesOrder = () => {
    const user = sessionStorage.getItem("user");
    console.log(user);
    const itemsInCartArray = JSON.parse(localStorage.getItem("itemCart"));
    const newSalesLines = itemsInCartArray.map((i) => ({
      lineType: "Item",
      lineObjectNumber: i.ItemNo,
      quantity: i.qnty ? i.qnty : 0,
      unitPrice: i.unitCost[0],
    }));
    console.log(newSalesLines);
    axios
      .post(
        "https://api.businesscentral.dynamics.com/v2.0/4e94f06f-db01-47eb-aff3-7a284b01dd84/SandboxNoExtentions/api/v2.0/companies(2bd1cda4-091c-ec11-bb76-000d3a22055d)/salesOrders?$expand=salesOrderLines",
        {
          "customerNumber": user,
          "salesOrderLines": newSalesLines,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("order posted successfully")
        setorderno(res.data.number)
      }).catch((err) => toast.error("Error in posting Order! Check Your details and try again"));
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: "relative",
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        ></AppBar>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  ` Your order number is ${orderno}. We have emailed your order
                  confirmation, and will send you an update when your order
                  has shipped .`
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    onClick={() => {
                      if (activeStep === 2) {
                        postSalesOrder();
                        postCardDetails();
                      }

                      handleNext();
                    }}
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
}