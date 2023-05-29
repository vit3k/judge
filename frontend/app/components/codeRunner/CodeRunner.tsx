"use client"

import Editor from '@monaco-editor/react';
import { useRef, useState } from 'react';
import LoadingCircle from '../LoadingCircle';
import PlayButton from './PlayButton';
import TasksDropDown from './TasksDropDown';
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
  tasks: Task[]
}
export default function CodeRunner({tasks}: CodeRunnerProps) {
  const editorRef = useRef<any>(null);
  const [executeResult, setExecuteResult] = useState<ExecuteResult | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [currentTaskIdx, setCurrentTaskIdx] = useState(0);

  function handleEditorDidMount(editor: any, _monaco: any) {
    editorRef.current = editor;
  }

  function onTaskChanged(idx: number) {
    setCurrentTaskIdx(idx);
  }

  async function execute() {
    try {
      setIsExecuting(true);
      if (!editorRef.current)
        return;
      let sourceCode = editorRef.current.getValue();
      let result = await executeCode(sourceCode, tasks[currentTaskIdx].id);
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
    <div className="flex-auto flex flex-col bg-gray-700">
      <div className="h-10 p-1 pl-6 flex items-center bg-gray-700">
        <div className="w-8 h-8">
          {!isExecuting ? <PlayButton onClick={execute}/> : <LoadingCircle/> }
        </div>
        <div className="ml-2 w-64 z-10">
          <TasksDropDown tasks={tasks} selected={currentTaskIdx} onTaskChanged={onTaskChanged}/>
        </div>
      </div>
      <div className='flex-1'>
        <Editor className="" loading={<div className="font-semibold text-white">Loading...</div>} options={{ padding: { top: 10 }, automaticLayout: true }} theme="vs-dark" onMount={handleEditorDidMount} defaultLanguage="python" defaultValue="print(input())" />
      </div>
      <div className="pl-8 pt-4 flex-auto">
        {!isExecuting ? <Output result={executeResult}/> : <LoadingCircle/>}
      </div>
    </div>
  )
}
