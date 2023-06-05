import { Task, tasks } from "@/db/schema";
import { micromark } from "micromark";
import TasksDropDown from "./TasksDropDown";
import db from "@/db/db";

interface TaskDescriptionProps {
    task: Task
}
export default async function TaskDescription({task}: TaskDescriptionProps) {
    let taskList = await db.select().from(tasks).orderBy(tasks.id);  
    
    return <div className="h-full flex-1">
                <div className="h-16 pr-4 text-3xl font-semibold"><TasksDropDown currentTask={task} tasks={taskList}/></div>
                <div className="px-4 prose prose-invert prose-code:before:content-none prose-code:after:content-none" 
                    dangerouslySetInnerHTML={{__html: micromark(task?.description ?? '')}}></div>
            </div>
}