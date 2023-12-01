
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "./ui/textarea"
import { FaCirclePlus } from "react-icons/fa6";
import { DatePicker } from "./DatePicker"
import { Checkbox } from "./ui/checkbox"
import AddTaskForm from "./AddTaskForm"

export function AddTask(){

  return (
    <Dialog>
      <DialogTrigger>
        <FaCirclePlus size={76} className='-translate-y-8 border-8 border-background rounded-full' />
      </DialogTrigger>
      <DialogContent className=''>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>Create a task.</DialogDescription>
        </DialogHeader>
        <AddTaskForm />
      </DialogContent>
    </Dialog>
  );
};
