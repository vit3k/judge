import CodeRunner from "./CodeRunner";
import TaskDescription from './TaskDescription';
import { Task } from "@/db/schema";

export default async function TaskContainer({task} : {task: Task}) {
    return (
        <div className="flex flex-row justify-between bg-gray-700 h-full">
             {/* @ts-expect-error Server Component */}
            <div className='flex-[1_0_0%]'><TaskDescription task={task}/></div>
            <div className='flex-[1.5_0_0%]'><CodeRunner currentTask={task} /></div>
        </div>
    )
}