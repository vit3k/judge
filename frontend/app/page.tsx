import db from "@/db/db";
import { tasks } from "@/db/schema";
import { redirect } from "next/navigation";

export default async function Home() {
  let taskList = await db.select().from(tasks).orderBy(tasks.id);  
  if (taskList.length > 0)
    redirect(`/${taskList[0].id}`);
  return <div>No tasks</div>
}
