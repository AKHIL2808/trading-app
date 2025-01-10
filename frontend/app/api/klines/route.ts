
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Use `req.nextUrl` to get query parameters
    const { searchParams } = new URL(req.url);
    // console.log(searchParams)
    const path = searchParams.get("path");
    const start = searchParams.get("start")
    // console.log(start)
    if (!path) {
      return NextResponse.json({ message: "Path parameter is required" }, { status: 400 });
    }
    if (!start) {
      return NextResponse.json(start)
    }

    // Proxy the request to the external API
    const response = await fetch(`https://api.backpack.exchange/api/v1/klines?symbol=${path}&interval=1d&startTime=${start}`);
    const data = await response.json();

    // Return the API response
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    return NextResponse.json({ message: "Failed to fetch data" }, { status: 500 });
  }
}
