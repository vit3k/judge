import { tasks } from "@/db/schema";
import CodeRunner from "./components/codeRunner/CodeRunner";
import db from "@/db/db";

export default async function Home() {
  let taskList = await db.select().from(tasks).orderBy(tasks.id);
  return <CodeRunner tasks={taskList}/>
}
