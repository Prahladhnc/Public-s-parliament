import { Textarea, Button, IconButton } from "@material-tailwind/react";
import { LinkIcon } from "@heroicons/react/24/outline";
import { Slider } from "@material-tailwind/react";
import { useState } from "react";
import axios from 'axios'

export default function Comment() {
    const [data,setData]=useState({
        comments:"",
        rating:0,
    
      })
      
        function submit(e){
          return axios.post("http://127.0.0.1:5000/comments", {
            comments:data.comments,
            rating:data.rating
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


  return (
    <div className="relative w-[32rem]" style={{marginLeft:"5rem",marginTop:"2rem"}}>
    <form method="POST" action="http://127.0.0.1:5000/comments"  >
     <p>Rating</p>

      <input onChange={(e)=>handle(e)} value={data.rating} id="rating" type="range"  ></input>      
      <Textarea onChange={(e)=>handle(e)} value={data.comments} id="comments" variant="static" placeholder="Your Comment" rows={8} />

      <div className="w-full flex justify-between py-1.5">
        
        <div className="flex gap-2">
          <Button
            size="sm"
            color="red"
            variant="text"
            className="rounded-md"
          >
            Cancel
          </Button>
          <Button size="sm" className="rounded-md">Post Comment</Button>
        </div>
      </div>
      </form>
    </div>
  );
}