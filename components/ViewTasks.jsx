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

import { Button } from "@/components/ui/button"
import TaskCard  from "./TaskCard"
  
const ViewTasks = ({category, tasks, setTask}) => {
  return (
    <DialogContent>
                <DialogHeader>
          <DialogTitle>{category}</DialogTitle>
          <DialogDescription>
            List of your tasks in this category.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            {tasks.map((task) => (
                <TaskCard task={task} setTask={setTask} key={task.id}/>
                ))
                
            }
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>

    </DialogContent>
  )
}

export default ViewTasks