import { NextResponse } from "next/server"
export async function POST(req, res) {

    const { body } = req
    const { name, description, category, dueDate } = body
    
    console.log('test')

    const message = "test"

    // const task = await db.task.create({
    //     data: {
    //     name,
    //     description,
    //     category,
    //     dueDate,
    //     },
    // })
    
    return NextResponse.json(
        { message: 'created' }, { status: 200 }
    )

}