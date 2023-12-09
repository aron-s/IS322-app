'use client'

import { useState, useEffect } from "react"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  import { FaCheckCircle } from "react-icons/fa";
  import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
  import { Badge } from "@/components/ui/badge"


const AllTasks = () => {

    const [sortedGroupTasks, setSortedGroupTasks] = useState([]);

    useEffect(() => {
        fetch('/api/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })
        .then((response) => response.json())
        .then((data) => {
        console.log(data)
        setSortedGroupTasks(data.sortedGroupedTasks)
        }).catch((error) => {
        console.error('Error:', error);
        }
        )
    }, [])

  return (
    <div className="mb-24">
        <div className="text-3xl tracking-tight flex">
        <h1 className="font-thin">Today,</h1>
        <h1 className="font-semibold mx-auto"> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</h1>
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
        <Separator className='my-4'/>

        <h1 className="text-xl tracking-tight font-semibold my-6">All Tasks</h1>
        {sortedGroupTasks.length > 0 && sortedGroupTasks.map((group) => (
            <div>
                <h2 className="text-xl tracking-tight font-semibold my-6">Date: {group.date}</h2>
                <div className="gap-4">
                <Card className="w-full">
                <CardHeader>
                    {group.tasks.map((task, index) => (
                        <>
                        <div className="flex justify-between" key={task.id}>
                            <div className="flex flex-col gap-2">
                            <p className="text-lg tracking-tighter">{task.title}</p>
                            <CardDescription>{task.description} </CardDescription>
                            
                            {task.isCompleted && <div className="my-1"><Badge variant="default">Completed</Badge></div>}

                            </div>
                            <div>{task.isCompleted ? <FaCheckCircle size={16}/>
 : <MdOutlineRadioButtonUnchecked size={20} className="bg-background rounded-full"/>
}</div>
                        </div>
                        {index != group.tasks.length - 1 && (<div>
                            <Separator className='my-4 bg-background'/>
                            </div>)}
                        </>
                    ))}
                    <CardTitle></CardTitle>
                </CardHeader>
                </Card>
                </div>
                
            </div>
        ))
        }
    </div>
  )
}

export default AllTasks