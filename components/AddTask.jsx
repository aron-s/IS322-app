
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "./ui/textarea"
import { FaCirclePlus } from "react-icons/fa6";
import { DatePicker } from "./DatePicker"
import { Checkbox } from "./ui/checkbox"
import AddTaskForm from "./AddTaskForm"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export function AddTask(){
  

  return (
    <>   
            <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable={false}
    pauseOnHover
    theme="dark"
    />   
    <Dialog>
    <DialogPortal>
      <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable={false}
    pauseOnHover
    theme="dark"
    />
      </DialogPortal>
      <DialogTrigger>
        <FaCirclePlus size={76} className='-translate-y-8 border-8 border-background rounded-full z-100' />
      </DialogTrigger>

      <DialogContent className=''>
    
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>Create a task.</DialogDescription>
        </DialogHeader>
        <AddTaskForm />
      </DialogContent>
    </Dialog>
    </>

  );
};
