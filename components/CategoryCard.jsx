
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CategoryCard() {
    const tasks = 5;
    const category = "Work";
  return (
    <Card className="">
      <CardHeader>
      <CardDescription>{tasks} New Tasks  </CardDescription>

        <CardTitle>{category}</CardTitle>
      </CardHeader>
      <CardContent>
       
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Complete</Button>
      </CardFooter>
    </Card>
  )
}
