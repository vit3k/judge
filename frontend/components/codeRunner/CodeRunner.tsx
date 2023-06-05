"use client"

import Editor from '@monaco-editor/react';
import { useRef, useState } from 'react';
import LoadingCircle from '../LoadingCircle';
import PlayButton from './PlayButton';
import { Task } from '@/db/schema';
import { ExecuteResult, Status } from '@/dtos/execute';
import Output from './Output';

async function executeCode(sourceCode: string, taskId: number): Promise<ExecuteResult> {
  let response = await fetch("/api/execute", {
    method: "POST", body: JSON.stringify({ sourceCode, taskId }), headers: {
      "Content-Type": "application/json"
    },
  });
  return await response.json();
}

interface CodeRunnerProps{
  currentTask: Task
}
export default function CodeRunner({currentTask}: CodeRunnerProps) {
  const editorRef = useRef<any>(null);
  const [executeResult, setExecuteResult] = useState<ExecuteResult | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  function handleEditorDidMount(editor: any, _monaco: any) {
    editorRef.current = editor;
  }

  async function execute() {
    try {
      setIsExecuting(true);
      if (!editorRef.current)
        return;
      let sourceCode = editorRef.current.getValue();
      let result = await executeCode(sourceCode, currentTask.id);
      setExecuteResult(result);
    } catch (error: any) {
      setExecuteResult({
        status: Status.NOT_OK,
        results: [],
        error
      });
      console.log(error);
    } finally {
      setIsExecuting(false);
    }
  }

  return (
    <div className="flex flex-col bg-gray-700 h-full">
      <div className="pt-2 h-12">
        {!isExecuting ? <PlayButton onClick={execute} /> : <LoadingCircle/>}
      </div>
      <div className='flex-[2_1_0%]'>
        <Editor className="" loading={<div className="font-semibold text-white">Loading...</div>} options={{ padding: { top: 10 }, automaticLayout: true }} theme="vs-dark" onMount={handleEditorDidMount} defaultLanguage="python" defaultValue="print(input())" />
      </div>
      <div className="pt-4 flex-[1_1_0%]">
        {!isExecuting ? <Output result={executeResult}/> : <LoadingCircle/>}
      </div>
    </div>
  )
}
