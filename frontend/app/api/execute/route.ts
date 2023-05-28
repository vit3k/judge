import { NextResponse } from "next/server";

export async function POST(req: Request) {
    let body = await req.json();
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
          ]
        })
      });
      return NextResponse.json(await response.json());
}