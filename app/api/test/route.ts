import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    console.log(req.headers);
    return Response.json({ "message": "hi" })
}