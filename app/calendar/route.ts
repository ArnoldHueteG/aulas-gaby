// create a nextjs 14 route for getting the calendar data from postgres database

import { NextResponse } from "next/server";
import { getCalendarData } from "@/lib/calendar";

export async function GET(req: Request) {
    // return hello worl
    // return NextResponse.json({ message: "Hello World" });
  const calendarData = await getCalendarData();
  return NextResponse.json(calendarData);
}

