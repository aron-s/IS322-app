import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
import { Button } from "@/components/ui/button"
const TaskCard = ({task, setTask}) => {

    const handleMarkComplete = async () => {
        const response = await fetch('/api/add', {
            method: 'PUT',
            body: JSON.stringify({
                ...task,
                isCompleted: true,
            })
        })

        if (response.ok) {
            console.log('tesposdf okay')
            const json = await response.json();
            const task = json.result
            // Handle success
            setTask(task)
        } else {
            // Handle error
            console.error('Failed to create task');
        }
    }

  return (
    <>   
     <Card className="bg-black">
    <CardHeader>

    <CardTitle>{task.title}</CardTitle>
    <CardDescription> Priority: {task.priority} | Deadline: {task.dueDate}  </CardDescription>


    </CardHeader>
    <CardContent>
    <p className='whitespace-pre-line'> {task.description}  </p>

    </CardContent>
    <CardFooter className="flex justify-end">

      <Button variant={task.isCompleted? 'outline': 'secondary'} disabled={task.isCompleted} onClick={handleMarkComplete}>
      {task.isCompleted? 'Completed': 'Mark as Completed'}
      </Button>

    </CardFooter>
  </Card>
  </>

  )
}


export default TaskCard