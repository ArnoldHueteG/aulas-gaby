import { NextResponse } from "next/server";
import { getAulas } from "@/lib/aulas";

export async function GET(req: Request) {
  const aulas = await getAulas();
  return NextResponse.json(aulas);
}