import { NextResponse } from "next/server";
import { getCalendarData } from "@/lib/calendar";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const aula = url.searchParams.get("aula")!;

  const calendarData = await getCalendarData(aula);

  return NextResponse.json(calendarData);
}