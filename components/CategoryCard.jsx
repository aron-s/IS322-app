
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

import ViewTasks  from "./ViewTasks"


export function CategoryCard({ category, tasks, setTask}) {
  return (
    <Dialog>

    <Card className="">
      <CardHeader>
      <CardDescription>{tasks.length} New Tasks  </CardDescription>

        <CardTitle>{category}</CardTitle>
      </CardHeader>
      <CardContent>
       
      </CardContent>
      <CardFooter className="flex justify-end">
      <DialogTrigger>

        <Button>
          View Tasks
        </Button>
        </DialogTrigger>
      </CardFooter>
    </Card>

    <ViewTasks tasks={tasks} category={category} setTask={setTask}/>
    
    </Dialog>

  )
}
