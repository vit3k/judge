import { Task } from "@/db/schema";

export const revalidate = 60;

interface TaskListProps {
    tasks: Task[]
}
const TaskList = async ({tasks}: TaskListProps) => {
    return <div><h1>Tasklist</h1>
        <ul>
            {tasks.map(t => 
                <li><a href={`/tasks/${t.id}`}>{t.name}</a></li>
            )}
        </ul>
    </div>
}

export default TaskList;