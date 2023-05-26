'use server';

export async function executeCode(source_code: string) {
  let response = await fetch("http://localhost:2000/api/v2/execute",{
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
          content: source_code
        }
      ]
    })
  });
  return await response.json();
}