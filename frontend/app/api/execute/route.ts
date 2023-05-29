import db from "@/db/db";
import { Testcase, tasks, testcases } from "@/db/schema";
import { Result, TestcaseStatus } from "@/dtos/execute";
import { eq } from "drizzle-orm";
import { P } from "drizzle-orm/column.d-c31e7ad3";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
    let body = await req.json();

    let task = await db.query.tasks.findFirst({
      with: {
        testcases: true
      },
      where: eq(tasks.id, body.taskId)
    });
    //let task = await db.select().from(tasks).where(eq(tasks.id, body.taskId));
    
    if (!task) {
      return NextResponse.json({error: 'task not found'}, {status: 404});
    }

    console.log(task);
    let results: Result[] = [];

    for(let testcase of task.testcases) {
      let response = await fetch(`${process.env.PISTON_URL}/api/v2/execute`,{
          next: { revalidate: 0 },
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            language: "python",
            version: "3.10.0",
            files: [
              {
                content: body.sourceCode
              }
            ],
            stdin: testcase.input
          })
        });
      let data = await response.json();
      results.push({
        testcase,
        output: data.run.output,
        status: testcase.expected?.trim() === data.run.output.trim() ? TestcaseStatus.OK : TestcaseStatus.NOT_OK
      })
    }
    console.log(results);
    return NextResponse.json({status: "OK", results});
}