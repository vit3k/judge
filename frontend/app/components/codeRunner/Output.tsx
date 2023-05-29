'use client';

import { ExecuteResult, TestcaseStatus } from "@/dtos/execute";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Output({result}: {result: ExecuteResult | null}) {
    return (
        <div className=" font-mono text-sm bg-gray-700 text-gray-100 whitespace-pre-wrap overflow-y-scroll overflow-visible">
            {result?.results.map( (r, idx) => 
            <div className={`flex flex-row justify-start items-center pt-1
                ${r.status === TestcaseStatus.OK ? 'text-teal-600' : 'text-rose-600'}`}>
                <div>{idx + 1}. </div>
                <div>{r.output}</div>
                <div className="h-6 w-6 ml-2">{r.status === TestcaseStatus.OK ? <CheckIcon /> : <XMarkIcon/>}</div>
            </div>
            )}
        </div>)
}