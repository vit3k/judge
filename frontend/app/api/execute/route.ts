import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    /*let session = getServerSession(authOptions);
    if (!session) {
        return new NextResponse(JSON.stringify({error: 'auth required'}), {
            status: 401
          });
    }*/
    
    let body = await req.json();
    console.log(body);
    //req.json
    //let source_code = req.body.source_code;
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
      //console.log(await response.json());
      return NextResponse.json(await response.json());
}