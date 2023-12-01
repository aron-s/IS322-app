'use client'

import { set } from "date-fns"
import { CategoryCard } from "./CategoryCard"
import { useEffect, useState } from "react"

const Categories = () => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('/api/add', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setCategories(data.categories)
      console.log(data)
    }).catch((error) => {
      console.error('Error:', error);
    }
    )
  }
  , [])

  const setTask = (task) => {
    console.log(task)
    const newCategories = categories.map((category) => {
      if (category.id == task.categoryId) {
        console.log('found category')
        console.log(category.category)
        const newTasks = category.taskIds.map((taskDetails) => {
          if (taskDetails.id == task.id) {
            console.log('found task')
            return task
          }
          return taskDetails

        })
        return {
          ...category,
          taskIds: newTasks
          }
      } else {
        return category
      }
    })
    setCategories(newCategories)  
  }
  

  return (
    <div className="mt-6 mb-10">
      <h2 className="text-2xl tracking-tight font-semibold my-6">Categories</h2>
      <div className="gap-4 grid grid-cols-2">
        {categories.length > 0 &&
          categories.map((category) => (
            <CategoryCard category={category.category} tasks={category.taskIds} key={category.id} setTask={setTask}/>
          )) 
        }
      </div>
      {
          categories.length == 0 &&
          <div className="flex flex-col justify-center items-center my-6">
            <h3 className="text-xl font-semibold">No Categories yet.</h3>
            <p className="text-lg text-muted">Create a task to get started.</p>
          </div>
        }
    </div>
  )
}

export default Categories