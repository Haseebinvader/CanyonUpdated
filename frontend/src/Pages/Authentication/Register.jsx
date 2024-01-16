import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Box } from '@mui/material'
import { UserContext } from '../../UserContext/UserContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;


const RegisterForm = styled.form`
  background: #182e49;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 8px 8px 16px #bfc7d1, -8px -8px 16px #ffffff;
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
`;

const InputField = styled.input`
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: none;
  background: #e0e5ec;
  border-radius: 8px;
  outline: none;
  box-shadow: inset 4px 4px 8px #bfc7d1, inset -4px -4px 8px #ffffff;
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  background: #3498db;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  margin-top: 15px;
`;

const Register = () => {


  const { accessToken } = useContext(UserContext)
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("iiiu", data);
    const res = await axios.post(
      "https://api.businesscentral.dynamics.com/v2.0/4e94f06f-db01-47eb-aff3-7a284b01dd84/SandboxNoExtentions/api/v2.0/companies(2bd1cda4-091c-ec11-bb76-000d3a22055d)/customers",
      {
        "displayName": data?.name,
        "addressLine1": data?.addressLine1,
        "addressLine2": data?.addressLine2,
        "city": data?.city,
        "country": "AU",
        // "phoneNumber": parseInt(data?.phoneNumber),
        "email": data?.email
      }
      ,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    )
      .then((res) => {
        console.log(res.status, res.data);
        axios.post(
          "http://127.0.0.1:8000/authentication/create/",
          {
            "customer_id": res.data.number,
            "first_name": data?.first_name,
            "last_name": data?.last_name,
            "name": data?.name,
            "addressLine1": data?.addressLine1,
            "addressLine2": data?.addressLine2,
            "city": data?.city,
            "state": data?.city,
            "country": data?.city,
            "postalCode": parseInt(data?.postalCode),
            "phoneNumber": parseInt(data?.phoneNumber),
            "email": data?.email,
            'password': data?.password
          }
        )
          .then((res) => {
            console.log(res.status, res.data);
            navigate("/login")
          })
          .catch((error) => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error("Response Error Data:", error.response.data);
              console.error("Response Error Status:", error.response.status);
              console.error("Response Error Headers:", error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.error("No response received from server:", error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error("Request setup error:", error.message);
            }
          });
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response Error Data:", error.response.data);
          console.error("Response Error Status:", error.response.status);
          console.error("Response Error Headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from server:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Request setup error:", error.message);
        }
      });


  };

  return (
    <div style={{ width: '100%', backgroundColor: '#e0e5ec' }}>
      <FormContainer>
        <RegisterForm onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <img src="../../public/PNG/logo.png" alt="Logo" style={{ scale: '0.7', cursor: 'pointer' }} />
          </Box>
          <InputContainer>
            <span style={{ color: "red", position: 'absolute', fontSize: 25, right: "53%", top: -5 }} >*</span>
            <InputField type="text" placeholder="First Name" {...register('first_name', { required: true })} />
            <InputField type="text" placeholder="Last name" {...register('last_name', { required: true })} />
            <span style={{ color: "red", position: 'absolute', fontSize: 25, right: 13, top: -5 }} >*</span>
          </InputContainer>
          <InputContainer>
            <span style={{ color: "red", position: 'absolute', fontSize: 25, right: "53%", top: -5 }} >*</span>
            <InputField type="email" placeholder="Email" {...register('email', { required: true })} />
            <InputField type="number" placeholder="Phone" {...register('phoneNumber', { required: true })} />
            <span style={{ color: "red", position: 'absolute', fontSize: 25, right: 13, top: -5 }} >*</span>
          </InputContainer>
          <InputContainer>
            <InputField type="text" placeholder="Company Name" {...register('name', { required: true })} />
            <span style={{ color: "red", position: 'absolute', fontSize: 25, right: 13, top: -5 }} >*</span>
          </InputContainer>
          <InputContainer>
            <InputField type="text" placeholder="Address Line 1" {...register('addressLine1')} />
            <InputField type="text" placeholder="Address Line 2" {...register('addressLine2')} />
          </InputContainer>
          <InputContainer>
            <InputField type="text" placeholder="City" {...register('city')} />
            <InputField type="text" placeholder="State" {...register('state')} />
          </InputContainer>
          <InputContainer>
            <InputField type="text" placeholder="Country" {...register('country')} />
            <InputField type="number" placeholder="Postal Code" {...register('postalCode')} />
          </InputContainer>

          <InputContainer>
            <InputField type="password" placeholder="Password" {...register('password', { required: true })} />
            <span style={{ color: "red", position: 'absolute', fontSize: 25, right: 13, top: -5 }} >*</span>
          </InputContainer>
          <SubmitButton type="submit" style={{ backgroundColor: '#F4966B', color: '#fff', fontSize: 17, fontWeight: 700 }}>Sign Up To Canyon Web Store</SubmitButton>
          <InputContainer>
            <h2 style={{ color: 'white', fontWeight: 550 }}>Already Have An Account? <Link style={{ color: '#F4966B' }} to={'/login'} >Sign In Here</Link></h2>
          </InputContainer>
        </RegisterForm>
      </FormContainer>
    </div>
  );
};

export default Register;