import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaBirthdayCake } from 'react-icons/fa';
import styled from 'styled-components';
import { Box } from '@mui/material'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

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

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
    axios.post('http://127.0.0.1:8000/authentication/login/', {
      "username": data.email,
      "password": data.password
    }).then((res) => {
      console.log(res);
      navigate("/otpverification");
    }).catch((err) => {
      toast.error("Check Email and Password, Then Try Again!")
    })
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#e0e5ec' }}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <FormContainer>
        <RegisterForm onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <img src="../../public/PNG/logo.png" alt="Logo" style={{ scale: '0.7', cursor: 'pointer' }} />
          </Box>
          <InputContainer>
            <InputField type="email" placeholder="Email" {...register('email', { required: true })} />
          </InputContainer>

          <InputContainer>
            <InputField type="password" placeholder="Password" {...register('password', { required: true })} />
          </InputContainer>
          <SubmitButton type="submit" style={{ backgroundColor: '#F4966B', color: '#fff', fontSize: 17, fontWeight: 700 }}>Sign In To Canyon Web Store</SubmitButton>
          <InputContainer>
            <h2 style={{ color: 'white' }}>New To Our Web Store? <Link style={{ color: '#F4966B' }} to={'/register'} >Sign Up Here</Link></h2>
          </InputContainer>
        </RegisterForm>
      </FormContainer>
    </div>
  );
};

export default Login;