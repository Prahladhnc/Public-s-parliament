import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button
  } from "@material-tailwind/react";
import { NavLink } from 'react-router-dom'
import { useState,useEffect } from "react";
import Type from "./Type";
import { Alert } from "@material-tailwind/react";

  export default function Cardu(props) {
    const [data, setData] = useState()

    var string = `${window.location.href}`;
    var length = 0;
    var len=string.length;
    var trimmedString = string.substring(length, len );
    var commie = `${trimmedString}`

   

      useEffect(() => {
      
      fetch('http://127.0.0.1:5000/bills')
        .then((response) => response.json())
        .then((responseData) => {
          setData(responseData);
          console.log(data)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, [])
  
  
    return (
      <div>
              {data.map(name => (  
          <div style={{display:"flex"}}>
          
          <div>
          <Card className="mt-6 w-96 ml-20 " style={{border:"1px solid black",boxShadow:"1.5px 1.5px"}}>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              <h2 className={"ml-25"} style={{color:"blue", fontFamily:"monospace"}}>TITLE: </h2>
              <p>{name[0]}</p>
              <br></br>
              <h2 className={"ml-25"} style={{color:"blue", fontFamily:"monospace"}}>MINISTRY: </h2>
              <p>{name[1]}</p>
              <br></br>
              <h2 className={"ml-25"} style={{color:"blue", fontFamily:"monospace"}}>STATUS: </h2>
              <p>{name[2]}</p>
              <br></br>
              <h2 className={"ml-25"} style={{color:"blue", fontFamily:"monospace"}}>YEAR: </h2>
              <p>{name[4]}</p>
              <br></br>


            </Typography>
            <Typography>
              
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            
            <Type description={name[3]}/>            
            <a href="http://127.0.0.1:5000/signup">
            <Button className=" mt-4 ">Comment</Button>
            </a>
          </CardFooter>

        </Card>
        </div>
        <div>
        <Alert style={{width:"40rem",marginLeft:"15rem",marginTop:"1rem"}}>
            <p id="doc">{name[3]}</p>
          </Alert>
          </div>
          
        </div>
          
      ))}  
      

          
    
       </div>

    );
  }
  
  