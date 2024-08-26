import parl from './images/parl.jpg'
import './Login.css'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'

  const Login=()=>{

  const [data,setData]=useState({
    Aanum:0,
    password:0,
    
  })

  function submit(e){
    return axios.post("http://127.0.0.1:5000/login", {
      Aanum:data.Aanum,
      password:data.password,
    },{
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }})
    .then(res=>{
      console.log(res.data)
    })
  }

  function handle(e){
    const newdata={...data}
    newdata[e.target.id]=e.target.value
    setData(newdata)
    console.log(newdata)
  }


    return(
        <div>
            <div className='login'>
      <Card className='bg-[#00000054] text-white' shadow={false}>
        <Typography className="ml-40" variant="h4" color="white" >
          Sign In
        </Typography>
        <Typography color="white" className="mt-1 ml-24 font-normal">
          Enter your details to sign in.
        </Typography>
        <form method="POST" action='/login' className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 ml-10 flex flex-col gap-6">
            <Input onChange={(e)=>handle(e)} value={data.Aanum} id='Aanum' size="lg" type='number' label="Aadhar No." color='white' />
            <Input onChange={(e)=>handle(e)} value={data.password} id='password' type="password" size="lg" label="Password" color='white' />
          </div>
          <NavLink to={data.Aanum}>
          <Button className="mt-6 ml-5" fullWidth onClick={(e)=>submit(e)}>
            Sign in
          </Button>
          </NavLink>  
          <Typography color="white" className="mt-4 ml-14 text-center font-normal">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Register
            </a>
          </Typography>
        </form>
      </Card>
      </div>


            <img src={parl}></img>
        </div>
    )
}

export default Login

