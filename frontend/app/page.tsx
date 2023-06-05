import { tasks } from "@/db/schema";
import CodeRunner from "../components/codeRunner/CodeRunner";
import db from "@/db/db";
import TaskList from "@/components/TaskList";
import { notFound, redirect, useParams } from "next/navigation";
import TaskContainer from "@/components/codeRunner/TaskContainer";
import { eq } from "drizzle-orm";

export default async function Home() {
  let taskList = await db.select().from(tasks).orderBy(tasks.id);  
  if (taskList.length > 0)
    redirect(`/${taskList[0].id}`);
  return <div>No tasks</div>
}
