import { Testcase } from "@/db/schema"

export enum TestcaseStatus {
    OK,
    NOT_OK
}
export interface Result {
    testcase: Testcase,
    output: string,
    status: TestcaseStatus
}

export interface ExecuteResult
{
  status: string,
  results: Result[]
}