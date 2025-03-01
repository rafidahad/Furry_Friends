// src/pages/Signup.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './LoginSignUp.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import furryLogo from '../assets/furryFriends_header_logo.png';
import LoadingScreen from './LoadingScreen';

function Signup () {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    },
  });

  if (loading) return <LoadingScreen />;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <div className="login-wrapper">
        <div className="header text-center">
          <img 
            src={furryLogo} 
            alt="Website Logo" 
            className="img-fluid mb-3" 
            style={{ maxHeight: '80px' }} 
          />
          <Typography variant="h3" className="header-title">
            Sign Up
          </Typography>
          <div className="underline mb-4"></div>
        </div>
        <form onSubmit={formik.handleSubmit} className="inputs">
          <div className="input mb-3 d-flex align-items-center">
            <img src={user_icon} alt="User Icon" style={{ width: '24px', marginRight: '8px' }} />
            <input 
              type="text" 
              name="name" 
              placeholder="Enter Name" 
              value={formik.values.name} 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur}
              className="form-control" 
            />
            {formik.touched.name && formik.errors.name ? (
            <div style={{ color: 'red' }}>{formik.errors.name}</div>
          ) : null}
          </div>
          <div className="input mb-3 d-flex align-items-center">
            <img src={email_icon} alt="Email Icon" style={{ width: '24px', marginRight: '8px' }} />
            <input 
              type="email" 
              name="email" 
              placeholder="Enter E-mail" 
              value={formik.values.email} 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur}
              className="form-control" 
            />
           {formik.touched.email && formik.errors.email ? (
            <div style={{ color: 'red' }}>{formik.errors.email}</div>
          ) : null}
          </div>
          <div className="input mb-3 d-flex align-items-center">
            <img src={password_icon} alt="Password Icon" style={{ width: '24px', marginRight: '8px' }} />
            <input 
              type="password" 
              name="password" 
              placeholder="Enter Password" 
              value={formik.values.password} 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur}
              className="form-control" 
            />
            {formik.touched.password && formik.errors.password ? (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          ) : null}
          </div>
          <div className="submit-container d-flex justify-content-between">
            <Link
              to="/"
              className="btn"
              style={{
                background: 'linear-gradient(45deg, #4a90e2 30%, #50b3ff 90%)',
                color: 'white',
                textTransform: 'none',
                fontWeight: 'bold',
                boxShadow: '0px 3px 5px rgba(0,0,0,0.2)',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                textDecoration: 'none',
              }}
            >
              Login
            </Link>
            <Button
              type="submit"
              className="btn-custom btn-login"
              sx={{
                background: 'linear-gradient(45deg, #ff8e53 30%, #fe6b8b 90%)',
                color: 'white',
                textTransform: 'none',
                fontWeight: 'bold',
                boxShadow: '0px 3px 5px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
                },
              }}
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default Signup;
