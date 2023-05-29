import { Testcase } from "@/db/schema"

export enum Status {
    OK,
    NOT_OK
}
export interface Result {
    testcase: Testcase,
    output: string,
    status: Status
}

export interface ExecuteResult
{
  status: Status,
  error: string,
  results: Result[]
}