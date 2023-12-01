"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "./ui/textarea"
import { DatePicker } from "./DatePicker"
import { Checkbox } from "./ui/checkbox"

import { useState } from "react"

import { DialogFooter } from "./ui/dialog"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from "date-fns"


const AddTaskForm = () => {
    const [formData, setFormData] = useState({
        description: '',
        autocategorize: true,
        autoprioritize: true,
        autoheader: true,
        autosomething: false,
      });
      const [date, setDate] = useState();
      const [loading, setLoading] = useState(false);
    
      const items = [
        {
          id: "autocategorize",
          label: "Auto Categorize",
        },
        {
          id: "autoprioritize",
          label: "Auto Prioritize",
        },
        {
          id: "autoheader",
          label: "Auto Title",
        },
        {
          id: "autosomething",
          label: "autosomething",
        },
      ];
    
      const handleCheckboxChange = (id) => {
        setFormData((prevData) => ({
          ...prevData,
          [id]: !prevData[id],
        }));
      };
      
      const handleSubmit = async () => {
        setLoading(true);
        try {
          
          const response = await toast.promise(
            fetch('/api/add', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...formData,
                date: date ? date.toLocaleDateString() : null,
              }),
            }),
            {
              pending: 'Creating task...',
              success: 'Task created!',
              error: 'Failed to create task',
            }
          )
          
          if (response.ok) {
            const json = await response.json();
            // Handle success
            console.log(json)
              
          } else {
            // Handle error
            console.error('Failed to create task');
          }
        } catch (error) {
          console.error('Error during the POST request:', error);
        }
        setLoading(false);
      };
  return (
    <>
   
    <div className="grid gap-4 py-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Description</Label>
            <Textarea
              placeholder="Type your message here."
              id="message"
              value={formData.description}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="date">Date</Label>
            <DatePicker
            date = {date}
            setDate = {setDate}
            />
          </div>
          <h3 className="text-xl font-semibold py-2">AI Autocomplete</h3>
          <div className="grid w-full gap-1.5 grid-cols-2">
            {items.map((item) => (
              <div className="flex items-center space-x-2" key={item.id}>
                <Checkbox
                  id={item.id}
                  checked={formData[item.id]}
                  onClick={() => handleCheckboxChange(item.id)}
                />
                <label
                  htmlFor={item.id}
                  className="text-sm font-medium text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            Create Task
          </Button>
        </DialogFooter>


        </>
  )
}

export default AddTaskForm