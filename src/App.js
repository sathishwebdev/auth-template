import React,{ useEffect, useState } from 'react'
import './App.css';
import * as mui from '@mui/material'
import * as Icons from '@mui/icons-material'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import formValidationModel from './model/formValidation';
import useAuth from './controllers/auth.js';

const BASE_URL = process.env.REACT_APP_BASE_URL

const Button = mui.styled(mui.Button)(({ theme }) => ({
    color: theme.palette.getContrastText(mui.colors.purple[500]),
    backgroundColor: "#000000",
    margin: "3%",

    '&:hover': {
      backgroundColor: "#a5a5a5",
      color: "black",
      boxShadow: "0px 0px 15px 1px"
    },
  }));

  const TextField = mui.styled(mui.TextField)({
    'input' :{
      backgroundColor: 'transparent',
      borderColor: 'whitesmoke',
      color: 'whitesmoke'
    },
    '& label.Mui-focused': {
      color: "whitesmoke",
      backgroundColor: 'transparent',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'whitesmoke',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'whitesmoke',
      },
    },
  });


function Login() {
  const auth = useAuth()
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  
  const Submission = (formData, { setSubmitting, resetForm }) =>{
    setLoader(true)
    let data = {
      password : formData.password,
      username : formData.username
    }

  auth.signIn(data, ()=>{ 
    setSubmitting(false);
    resetForm()
    navigate('../')}, setLoader )
  
  }

  const {values, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues:{
      username:'',
      password: ''
    },
    onSubmit: Submission
  })
 

  return (
    <div className="App">
      <div className="App-header">
          <div className="container" >
                <div style={{ textAlign: "center" }}>
                  <h1>Login in</h1>
                  <TextField
                    id="username"
                    name='username'
                    placeholder='Username'
                    label="Username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    className="input"
                    margin="normal"
                    required
                    />
                    <TextField
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name='password'
                    placeholder='password'
                    label="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="input"
                    margin="normal"
                    InputProps={{
                      endAdornment:(
                        <mui.InputAdornment position="end">
                          <mui.IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Icons.Visibility /> : <Icons.VisibilityOff />}
                          </mui.IconButton>
                        </mui.InputAdornment>
                      )
                    }}
                    required/>
                  <Button
                    variant="contained"
                    type="submit"
                    color="inherit"
                    size="large"
                    onClick={handleSubmit}
                  >
                    {loader ? <div className='loader' ></div> : "LOG IN"}
                  </Button>
                  <br/>
            <small>
              <Link to="/forgetpassword" className='link'>Forget Password ?</Link>
              <p>New one ? <span><Link to='signup' className='link' >Sign Up</Link></span></p>
            </small>
             </div>
          </div>
      </div>
    </div>
  );
}

const SignUp =() =>{

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
 const [loader, setLoader] = useState(false)
  
  let formValidateSchema = yup.object(formValidationModel)

  const Submission = (formData, { setSubmitting, resetForm }) =>{
    setLoader(true)
    let data = {
      email : formData.email,
      password : formData.password,
      username : formData.username,
      name : formData.name
    }

    const checkFunc = (data) =>{
      if(!data.result){
        setLoader(false)
        alert(data.message)
      }else{
        setLoader(false)
        alert('Successfully Signed Up' + data.response.data.name)
        return true
      }
    }

    try{fetch(`${BASE_URL}/signup`,{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type' : "application/json",
        'Accept' : "*/*"
      }
    }).then(res=> res.json()).then(data=> {
      console.log(data)
     let isCompleted = checkFunc(data)

     if(isCompleted){ 
       setSubmitting(false);
      resetForm()
      ; }

    })}
    catch(err){
      console.log(err.message)
      alert('error occur')
    }
  }

  const {values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues:{
      username:'',
      password: '',
      email:'',
      name : ''
    },
    validationSchema: formValidateSchema,
    onSubmit : Submission
  })
 

  return( 
  <div className="App">
    <div className="App-header">
      <div className="container" >
        <div style={{ textAlign: "center" }}>
              <h1>Sign Up</h1>
              <TextField
                id="name"
                name='name'
                placeholder='Name'
                label="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className="input"
                margin="normal"
                InputProps={{
                  endAdornment:(
                    <mui.InputAdornment position="end">
                      <small style={{color:"red"}} >{errors.name && touched.name && errors.name}</small>
                    </mui.InputAdornment>
                  )
                }}
                required 
                />
                <br/>
              <TextField
                id="username"
                name='username'
                placeholder='Username'
                label="Username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className="input"
                margin="normal"
                InputProps={{
                  endAdornment:(
                    <mui.InputAdornment position="end">
                      <small style={{color:"red"}} >{errors.username && touched.username && errors.username}</small>
                    </mui.InputAdornment>
                  )
                }}
                required 
                />
                <br/>
              <TextField
                id="email"
                name='email'
                type= 'email'
                placeholder='Email'
                label="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="input"
                margin="normal"
                InputProps={{
                  endAdornment:(
                    <mui.InputAdornment position="end">
                     <small style={{color:"red"}} >{errors.email && touched.email && errors.email}</small>
                    </mui.InputAdornment>
                  )
                }}
                required 
                />
               <br/> 
                <TextField
                type={showPassword ? "text" : "password"}
                id="password"
                name='password'
                placeholder='password'
                label="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="input"
                margin="normal"
                InputProps={{
                  endAdornment:(
                    <mui.InputAdornment position="end">
                      <small style={{color:"red"}} >{errors.password && touched.password && errors.password}</small>
                      <mui.IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Icons.Visibility /> : <Icons.VisibilityOff />}
                      </mui.IconButton>
                    </mui.InputAdornment>
                    
                  )
                }}
                required/>
                <br/>
               
              <br/>
              <Button
                variant="contained"
                type="submit"
                color="inherit"
                size="large"
                onClick={handleSubmit}
              >
                {loader ? "..." :"Create Account"}
              </Button>

           <br/>
          
       <small>Already a user ? <span><Link to='/' className='link' >Login</Link></span></small> 
       </div>
       <div>
         <img src="img/signup.png" alt="signup" />
       </div>
      </div>
      
    </div>
  </div>)
}

const Home = () =>{

 let auth = useAuth()
useEffect(()=>{
  document.title = 'Home'
})

  return (
    <div className='App'>
      <div className='App-header'>
       {auth.user ?<div>
         <h1>We!Come {auth.user.name}</h1>
         <Button
         onClick={()=>{
           auth.signOut(()=>{})
         }}
         >
           sign out
         </Button>
       </div> : <Link to="login" className='link' ><h1>Login</h1></Link> } 
      </div>
    </div>
  )
}

const ForgetPassword = () =>{

  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  
  const Submission = (formData, { setSubmitting, resetForm }) =>{
    setLoader(true)
    let data = {
      username : formData.username
    }

    const checkFunc = (data) =>{
      if(!data.result){
        alert(data.message)
        setLoader(false)
      }else{
        alert("Request sent !")
        setLoader(false)
        return true
      }
    }

    try{
      fetch(`${BASE_URL}/forgetpassword`,{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type' : "application/json",
        'Accept' : "*/*"
      }
    }).then(res=> res.json()).then(data=> {
     let isCompleted = checkFunc(data)

     if(isCompleted){ 
       setSubmitting(false);
        resetForm(); 
      navigate(`register/${data.registeration.insertedId}`)
      }

    })}
    catch(err){
      console.log(err.message)
      alert('error occur')
    }
  }

  let formValidateSchema = yup.object({username: formValidationModel.username})

  const {values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues:{
      username:''
    },
    validationSchema : formValidateSchema,
    onSubmit: Submission
  })
 

  return (
    <div className="App">
      <div className="App-header">
          <div className="container" >
                <div style={{ textAlign: "center" }}>
                  <h1>Forget Password ?</h1>
                  <small>Enter your username to send a password changing request</small>
                  <TextField
                    id="username"
                    name='username'
                    placeholder='Username'
                    label="Username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    className="input"
                    margin="normal"
                    InputProps={{
                      endAdornment:(
                        <mui.InputAdornment position="end">
                          <small style={{color:"red"}} >{errors.username && touched.username && errors.username}</small>
                        </mui.InputAdornment>
                      )
                    }}
                    required
                    />
                  <Button
                    variant="contained"
                    type="submit"
                    color="inherit"
                    size="large"
                    onClick={handleSubmit}
                  >
                    {loader ? <div className='loader' ></div> : "Request"}
                  </Button>
                  <br/>
            <small>
              <Link to='/login' className='link' > Log in</Link>
              <p>New one ? <span><Link to='signup' className='link' >Sign Up</Link></span></p>
            </small>
             </div>
          </div>
      </div>
    </div>
  );
}

const Requested = () =>{
  const {requestId} = useParams()
const navigate = useNavigate()
  const [requestData, setRequestData] = useState(null)

  useEffect(()=>{
    fetch(`${BASE_URL}/request/${requestId}/?verify=true`).then(res=> res.json()).then(data=> {setRequestData(data.data)})
  },[requestId])
return (
  <div className="App">
      <div className="App-header">
          <div >
           {!requestData? <div className='loader' ></div> : !requestData.verify ? <h3>Request have been sent to {requestData.to.substring(0, 2)}******@****.com for {requestData.for}</h3> : <h2>404</h2>}

           <Button
            onClick={()=>{
              navigate('/')
            }}
           >
             Home
           </Button>
          </div>
      </div>
  </div>
)
}

const ChangePassword= () =>{

  const location = useLocation()
  const {username} = useParams()
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  let key = location.search

  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  let formValidateSchema = yup.object({
    password : formValidationModel.password
  })
  
  const Submission = (formData, { setSubmitting, resetForm }) =>{
    setLoader(true)
    let data = {
      password : formData.password
    }

    const checkFunc = (data) =>{
      if(!data.result){
        alert(data.message)
        setLoader(false)
      }else{
        alert("Request sent !")
        setLoader(false)
        return true
      }
    }

    try{
      fetch(`${BASE_URL}/changepassword/${username}/${key}`,{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type' : "application/json",
        'Accept' : "*/*"
      }
    }).then(res=> res.json()).then(data=> {
     let isCompleted = checkFunc(data)

     if(isCompleted){ 
       setSubmitting(false);
        resetForm(); 
      navigate(`/`)
      }

    })}
    catch(err){
      console.log(err.message)
      alert('error occur')
    }
  }

  const {values, handleChange, handleSubmit, handleBlur,errors, touched } = useFormik({
    initialValues:{
      password:''
    },
    validationSchema: formValidateSchema,
    onSubmit: Submission
  })
  return  <div className="App">
      <div className="App-header">
          <div className="container" >
                <div style={{ textAlign: "center" }}>
                  <h1>Forget Password ?</h1>
                  <small>Change Your Password</small>
                  <TextField
                type={showPassword ? "text" : "password"}
                id="password"
                name='password'
                placeholder='New Password'
                label="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="input"
                margin="normal"
                InputProps={{
                  endAdornment:(
                    <mui.InputAdornment position="end">
                      <small style={{color:"red"}} >{errors.password && touched.password && errors.password}</small>
                      <mui.IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Icons.Visibility /> : <Icons.VisibilityOff />}
                      </mui.IconButton>
                    </mui.InputAdornment>
                    
                  )
                }}
                required/>
                  <Button
                    variant="contained"
                    type="submit"
                    color="inherit"
                    size="large"
                    onClick={handleSubmit}
                  >
                    {loader ? <div className='loader' ></div> : "Change Password"}
                  </Button>
                  <br/>
            <small>
              <Link to='/login' className='link' > Log in</Link>
              <p>New one ? <span><Link to='signup' className='link' >Sign Up</Link></span></p>
            </small>
             </div>
          </div>
      </div>
    </div>


}

export { Login, SignUp, Home, ForgetPassword, Requested, ChangePassword};
