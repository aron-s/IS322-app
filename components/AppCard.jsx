
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export function AppCard() {
  const completePercentage = 76;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Daily Progress</CardTitle>
        <CardDescription>Here, TaskMastery shows your daily tasks </CardDescription>
      </CardHeader>
      <CardContent>
       
      </CardContent>
      <CardFooter className="flex justify-start">
        <h2 className="text-xl font-semibold">{completePercentage}%</h2>
      </CardFooter>
    </Card>
  )
}
