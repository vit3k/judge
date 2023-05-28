"use client"

import Editor from '@monaco-editor/react';
import { useRef, useState } from 'react';
//import { executeCode } from './actions';
import { useSession } from 'next-auth/react';
import LoadingCircle from './components/LoadingCircle';
import PlayButton from './components/PlayButton';

async function executeCode(sourceCode: string) {
  let response = await fetch("/api/execute", {
    method: "POST", body: JSON.stringify({ sourceCode }), headers: {
      "Content-Type": "application/json"
    },
  });
  return await response.json();
}

export default function Home() {
  const editorRef = useRef<any>(null);
  const [output, setOutput] = useState<string>("");
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
      let result = await executeCode(sourceCode);
      setOutput(result.run.output);
    } catch (error: any) {
      setOutput(error);
      console.log(error);
    } finally {
      setIsExecuting(false);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-700">
      <div className="h-10 p-1 pl-6 flex bg-gray-700">
        <div className="w-8 h-8">
          {!isExecuting ?
            <PlayButton onClick={execute}/>
            : <LoadingCircle/>
          }
        </div>
      </div>
      <div>
        <Editor loading={<div className="font-semibold text-white">Loading...</div>} options={{ padding: { top: 10 } }} theme="vs-dark" height="60vh" onMount={handleEditorDidMount} defaultLanguage="python" defaultValue="print(&quot;Hello world&quot;)" />
      </div>
      <div className="pl-8 pt-4 flex-auto font-mono text-sm bg-gray-700 text-gray-100 whitespace-pre-wrap overflow-y-scroll overflow-visible">
        {!isExecuting ? output : <LoadingCircle/>}
      </div>
    </div>
  )
}
