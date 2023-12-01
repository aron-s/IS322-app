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
          });
          
        const prompt = new ChatPromptTemplate({
            promptMessages: [
              SystemMessagePromptTemplate.fromTemplate(
                "Given the description of a task, classify it into a category, and create a short summarized title for it. Uisng the task description and the due date given, predict a priority score."
              ),
              HumanMessagePromptTemplate.fromTemplate("Task Description: {inputText} \nTask Due Date: {inputDate}"),
            ],
            inputVariables: ["inputText", "inputDate"],
          });
    
        const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0.8 });
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
          
          const response = await chain.invoke({
            inputText:
                  description,
                inputDate: dueDate,      });
          
        console.log(JSON.stringify(response, null, 2));
    
        const prisma = new PrismaClient();
    
    
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
                            dueDate,
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