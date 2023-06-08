import CodeRunner from "@/components/codeRunner/CodeRunner";
import TaskDescription from '@/components/codeRunner/TaskDescription';
import db from "@/db/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export const revalidate = 60;

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
    return (
        <div className="flex flex-row justify-between bg-gray-700 h-full">
            {/* @ts-expect-error Server Component */}
            <div className='flex-[1_0_0%]'><TaskDescription task={task}/></div>
            <div className='flex-[1.5_0_0%]'><CodeRunner currentTask={task}/></div>
        </div>
    )
}