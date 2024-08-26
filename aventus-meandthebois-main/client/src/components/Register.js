import parl from './images/parl.jpg'
import './Register.css'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import React,{useState,useEffect} from "react"
import axios from "axios";


const Register=()=>{
  
  const [data,setData]=useState({
    Aanum:0,
    mobnum:0,
    password:0,
    name:0,
    state:0,
    religion:0,
    profession:0,
    age:0

  })
  
    function submit(e){
      return axios.post("http://127.0.0.1:5000/register", {
        Aanum:data.Aanum,
        mobnum:data.mobnum,
        password:data.password,
        name:data.name,
        state:data.state,
        religion:data.religion,
        profession:data.profession,
        age:data.age
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
          Sign Up
          
        </Typography>
        <Typography color="white" className="mt-1 ml-24 font-normal">
          Enter your details to sign up.
        </Typography>
        <form method="POST" action='/register' className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 ml-10 flex flex-col gap-6">
            <Input onChange={(e)=>handle(e)} value={data.Aanum} id='Aanum' size="lg" label="Aadhar No." type='number'  color='white' />
            <Input onChange={(e)=>handle(e)} value={data.mobnum} id='mobnum' size="lg" label="Mobile No." type='number' color='white' />
            <Input onChange={(e)=>handle(e)} value={data.password} id='password' type="password" size="lg" label="Password" color='white' />
            <Input onChange={(e)=>handle(e)} value={data.name} id='name' size="lg" label="Name" color='white' />
            <Input onChange={(e)=>handle(e)} value={data.state} id='state' size="lg" type='text' label="State" color='white' />
            <Input onChange={(e)=>handle(e)} value={data.religion} id='religion' size="lg" label="Religion" color='white' />
            <Input onChange={(e)=>handle(e)} value={data.profession} id='profession' size="lg" label="Profession" color='white' />
            <Input onChange={(e)=>handle(e)} value={data.age} id='age' size="lg" label="Age" type='number' color='white' />


          </div>
          
          <Button onClick={(e)=>submit(e)} className="mt-6 ml-5" fullWidth>
            Sign up
          </Button>
          <Typography color="white" className="mt-4 ml-14 text-center font-normal">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign in
            </a>
          </Typography>
        </form>
      </Card>
      </div>


            <img src={parl}></img>
        </div>
    )
}
export default Register

