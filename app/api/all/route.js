import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'


export async function GET(req, res) {
    try {
        const prisma = new PrismaClient();
        const tasks = await prisma.tasks.findMany({
            include: {
                category: {
                    select: {
                        category: true
                    }

                }
            }

        })
        await prisma.$disconnect()

        // Group tasks by due date
        const groupedTasks = tasks.reduce((acc, task) => {
            const dueDate = task.dueDate;
            if (!acc[dueDate]) {
                acc[dueDate] = [];
            }
            acc[dueDate].push(task);
            return acc;
        }, {});

        // Sort tasks within each due date group by due date
        for (const key in groupedTasks) {
            groupedTasks[key].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        }

        // Sort due date groups
        const sortedDueDateGroups = Object.keys(groupedTasks).sort((a, b) => new Date(a) - new Date(b));

        // Create an array of objects with sorted due date groups and their tasks
        const sortedGroupedTasks = sortedDueDateGroups.map((dueDate) => ({
            date: dueDate,
            tasks: groupedTasks[dueDate]
        }));

        return NextResponse.json(
            {
                message: 'Successfully fetched!',
                sortedGroupedTasks
            }, { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.error(error, { status: 500 })
    }
}