import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaBirthdayCake } from 'react-icons/fa';
import styled from 'styled-components';
import { Box } from '@mui/material'
import OTPInput from 'react-otp-input';
import { useNavigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import axios from 'axios';


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

const OtpVerification = () => {
    const navigate = useNavigate();
    useEffect(() => {
        toast.success("OTP Will Sent To Your Email")
    }, [])
    const [otp, setotp] = useState(0);
    const handleSubmit = async (e, otp) => {
        e.preventDefault();
        console.log(otp);
        axios.post('http://127.0.0.1:8000/authentication/otpVerification/', {
            "otp": otp
        }).then((res) => {
            sessionStorage.setItem('user', res?.data?.user)
            navigate("/");
        }).catch((err) => {
            toast.error("Validate Your OTP And Try Again!")
        })
    }
    return (
        <div style={{ width: '100%', backgroundColor: '#e0e5ec' }}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <FormContainer>
                <RegisterForm onSubmit={(e) => handleSubmit(e, otp)}>
                    <Box sx={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <img src="../../public/PNG/logo.png" alt="Logo" style={{ scale: '0.7', cursor: 'pointer' }} />
                    </Box>
                    <InputContainer>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                            <h2 style={{ paddingTop: '2rem', color: 'white' }} >Enter OTP:</h2>
                            <OTPInput
                                value={otp}
                                onChange={setotp}
                                numInputs={4}
                                separator={<span>-</span>}
                                isInputNum={true}
                                shouldAutoFocus={true}
                                containerStyle={{ marginTop: '30px' }}
                                inputContainerStyle={{ color: 'black', margin: '0 10px', padding: '10px', borderRadius: '5px', border: '1px solid black' }}
                                inputStyle={{ width: '40px', height: '40px', fontSize: '18px', textAlign: 'center', margin: "0 10px", borderRadius: '6px', boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.15)", color: 'black' }}
                                // Make sure renderInput prop is correctly defined
                                renderInput={(inputProps, index) => (
                                    <input {...inputProps} />
                                )}
                            />

                        </div>
                    </InputContainer>
                    <SubmitButton type="submit" style={{ backgroundColor: '#F4966B', color: '#fff', fontSize: 17, fontWeight: 700 }}>Sign In To Canyon Web Store</SubmitButton>
                </RegisterForm>
            </FormContainer>
        </div>
    );
};

export default OtpVerification;