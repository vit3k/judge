'use client';

import { ExecuteResult, Status } from "@/dtos/execute";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

export default function Output({result}: {result: ExecuteResult | null}) {
    function mapError(error: string): string {
        switch(error) {
            case 'SIGKILL':
                return 'Przekroczenie czasu wykonywania (2000 ms)'
            default:
                return error;
        }
    }
    return (
        <div className=" font-mono text-sm bg-gray-700 text-gray-100 whitespace-pre-wrap overflow-y-scroll overflow-hidden">
            {result?.status !== Status.OK ? <div className='text-red-600'>{mapError(result?.error ?? "")}</div> :
            <table>
                {result?.results.map( (r, idx) => 
                <tr key={idx} className={`p-2
                    ${r.status === Status.OK ? 'text-emerald-600' : 'text-red-600'}`}>
                    <td className='pr-4'>{idx + 1}.</td>
                    <td className='py-2 pr-10'>{r.output}</td>
                    <td className="h-8 w-8">{r.status === Status.OK ? <CheckIcon className='text-emerald-400'/> 
                                                                            : <XMarkIcon className='text-red-500'/>}</td>
                </tr>
                )}
            </table>
            }
        </div>)
}