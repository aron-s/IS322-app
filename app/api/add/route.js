import { NextResponse } from "next/server"

import {z} from 'zod'
import { zodToJsonSchema } from "zod-to-json-schema";

import { ChatOpenAI } from "langchain/chat_models/openai";

import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
  } from "langchain/prompts";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { PrismaClient } from "@prisma/client";

export async function POST(req, res) {
    try {
        const body = await req.json()
        const description = body.description
        const dueDate = body.date
    
    
        const zodSchema = z.object({
            priority: z.number().int().describe("Priority score of the task from 0 to 100"),        // Assuming taskId is an integer
            category: z.string().describe("The category of a task"),            // Assuming category is a string
            description: z.string().describe("The description of the task provided"),         // Assuming description is a string
            title: z.string().describe("A short summarized title generated from the description of the task"),               // Assuming title is a string
            dueDate: z.string().describe("The due date of the task in 'MM/DD/YYYY' format"),               // Assuming title is a string
          });
          
        const prompt = new ChatPromptTemplate({
            promptMessages: [
              SystemMessagePromptTemplate.fromTemplate(
                "Given the description of a task, classify it into a category, and create a short summarized title for it. Uisng the task description and the due date given, predict a priority score. If due date is not given predict the due date. \nIf the task is a fit for the current existing categories, you can choose that category. If not, you can create a new category."
              ),
              HumanMessagePromptTemplate.fromTemplate("Task Description: {inputText} \nTodays Date: {inputToday}\nTask Due Date: {inputDate}\nCurrent existing categories: {inputCategories}"),
            ],
            inputVariables: ["inputText", "inputToday", "inputDate", "inputCategories"],
          });
    
        const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 1 });
        const functionCallingModel = llm.bind({
            functions: [
              {
                name: "output_formatter",
                description: "Should always be used to properly format output",
                parameters: zodToJsonSchema(zodSchema),
              },
            ],
            function_call: { name: "output_formatter" },
          });
          
          const outputParser = new JsonOutputFunctionsParser();
          
          const chain = prompt.pipe(functionCallingModel).pipe(outputParser);
          
          const today = new Date().toLocaleDateString();

          const prisma = new PrismaClient();
          let currentCategories = await prisma.categories.findMany({
              where: {
                  taskIds:{
                      some: {}  
                  }
              },
              include: {
                  taskIds: false
              }
          })

          currentCategories = currentCategories.map(category => category.category)
          const listAsString = currentCategories.join(", ");
          
          const response = await chain.invoke({
            inputText:
                  description,
            inputToday: today,
                inputDate: dueDate,     
                inputCategories: listAsString });
          
        console.log(JSON.stringify(response, null, 2));
    

    
    
        let category = await prisma.categories.findUnique({
            where: {
                category: response.category
            }
        })
    
        if (!category) {
            console.log('category does not exist')
    
            const createdCategory = await prisma.categories.create({
                data: {
                    category: response.category,
                    taskIds: {
                        create: {
                            description,
                            dueDate: response.dueDate,
                            priority: response.priority,
                            title: response.title,
                        }
                        
                    }
                },
                include: {
                    taskIds: true
                }
            })
            await prisma.$disconnect()
    
            return NextResponse.json(
                { message: 'Successfully created!',
                category: response.category,
                task: createdCategory.taskIds[0]
            }, { status: 201 }
            )
            
        } else {
            console.log('category exists')
            const task = await prisma.tasks.create({
                data: {
                    title: response.title,
                    description,
                    dueDate,
                    priority: response.priority,
                    category: {
                        connect: {
                            id: category.id
                        }
                    }
                }
            })
            await prisma.$disconnect()
    
            return NextResponse.json(
                { message: 'Successfully created!',
                category: response.category,
                task
                
            }, { status: 201 }
            )
        
        }
    
    } catch (error) { 
        console.log(error)
        return NextResponse.error(error, { status: 500 })
    }    
}


export async function GET(req, res) {
    try {
        const prisma = new PrismaClient();
        const categories = await prisma.categories.findMany({
            where: {
                taskIds:{
                    some: {}  
                }
            },
            include: {
                taskIds: true
            }
        })
        await prisma.$disconnect()
        return NextResponse.json(
            { message: 'Successfully fetched!',
            categories
        }, { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.error(error, { status: 500 })
    }
}

export async function PUT(req, res) {
    try {
        const task = await req.json();

        const prisma = new PrismaClient();
        const result = await prisma.tasks.update({
            where: {
                id : task.id
            },
            data: {
                isCompleted: task.isCompleted
            }
        })
        await prisma.$disconnect()
        return NextResponse.json(
            { message: 'Successfully updated!',
            result
        }, { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.error(error, { status: 500 })
    }
}