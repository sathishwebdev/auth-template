import React from 'react';
import {BrowserRouter, Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import { ChangePassword, ForgetPassword, Home, Login, Requested, SignUp } from './App';
import * as mui from '@mui/material'
import * as Icons from '@mui/icons-material'
import Provider from './controllers/Provider';

const Button = mui.styled(mui.Button)(({ theme }) => ({
    color: theme.palette.getContrastText(mui.colors.purple[500]),
    backgroundColor: "#",
    margin: "3%",

    '&:hover': {
      backgroundColor: "#",
      // color: "black",
      boxShadow: "0px 0px 15px 1px #303030"
    },
  }));

function RouteConfig() {
  return <Provider>
      <BrowserRouter>
      <NavBar />
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/:username/forgetpassword/k' element={<ChangePassword />} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element ={<SignUp />} />
            <Route exact path="/forgetpassword" element ={<ForgetPassword />} />
            <Route exact path="forgetpassword/register/:requestId" element ={<Requested/>} />
            <Route path='*' element={<div className='App'>
                <div className="App-header" >
                    <h1 style={{
                        fontSize:"50px"
                    }} >404</h1>
                </div>
            </div>} />
        </Routes>
      </BrowserRouter>
  </Provider>;
}

export default RouteConfig;


const NavBar = () =>{
  const location = useLocation()
  const navigate = useNavigate()

  return       <div
      className='nav'
  >
  { location.pathname === '/' ? <Button
   onClick={()=>{
       navigate('./')
   }}
  >
       Home
   </Button> : <Button
   
   onClick={()=>{
       navigate(-1)
   }}

   >
     <Icons.ChevronLeftRounded/>  Back
   </Button> }
   { location.pathname === '/login' ? <Button
   onClick={()=>{
       navigate('./')
   }}
  >
       Home
   </Button> : <Button
        onClick={()=>{
           navigate('login')
       }}
   >
       Login
   </Button>}
   { location.pathname === '/signup' ? '' : 
   <Button
       onClick={()=>{
           navigate('signup')
       }}
   >
       Sign up
   </Button> }
   
  </div>
}