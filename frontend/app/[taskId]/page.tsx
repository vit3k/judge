import CodeRunner from "@/components/codeRunner/CodeRunner";
import db from "@/db/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound, useParams } from "next/navigation";
import TaskDescription from "@/components/codeRunner/TaskDescription";
import TaskContainer from "@/components/codeRunner/TaskContainer";

interface TaskProps {
    params: {
        taskId: number
    }
}
export default async function TaskPage({params}: TaskProps) {
    
    let task = await db.query.tasks.findFirst({where: eq(tasks.id, params.taskId)})
    if (!task) {
        notFound()
    }
    {/* @ts-expect-error Server Component */}
    return <TaskContainer task={task}/>
}