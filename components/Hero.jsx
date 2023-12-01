import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

import { FaSearch } from "react-icons/fa";
import { Button } from "./ui/button";

  
const Hero = () => {

    const username = "John Doe"
  return (
    <div className="">
        <div className="w-full flex items-center">
            <h2>Home</h2>
            <div className="flex flex-grow justify-end items-center gap-4"> 
            <FaSearch size={18} color="white"/>
            <Avatar >
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </div>
       
        </div>
            

        <h1 className="text-3xl font-extrabold mt-6">Welcome to Task Mastery, {username}</h1>
        <Button className="my-6">Overview</Button>
    </div>
  )
}

export default Hero