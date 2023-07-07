import db from "@/db/db";
import { Testcase, tasks, testcases } from "@/db/schema";
import { Result, Status } from "@/dtos/execute";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    let body = await req.json();
    let task = await db.query.tasks.findFirst({
      with: {
        testcases: true
      },
      where: eq(tasks.id, body.taskId)
    });
    
    if (!task) {
      return NextResponse.json({error: 'task not found'}, {status: 404});
    }

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
            run_timeout: 1000,
            files: [
              {
                content: body.sourceCode
              }
            ],
            stdin: testcase.input
          })
        });
      let data = await response.json();
      console.log(data);

      if (data.run.code && data.run.code !== 0) {
        return NextResponse.json({status: Status.NOT_OK, error: data.run.output, results: []});
      }

      if (data.run.signal !== null) {
        results.push({
          status: Status.NOT_OK,
          testcase,
          output: 'Przekroczenie czasu wykonywania'
        })
      } else {
        const re = new RegExp(testcase.expected ?? '', 'g');
        let output: string = data.run.output;
        let matches = output.match(re);
        let status = matches?.length === 1 && matches[0] === output ? Status.OK : Status.NOT_OK;
        results.push({
          testcase,
          output: data.run.output,
          status
        })
      }
    }
    return NextResponse.json({status: Status.OK, results});
}