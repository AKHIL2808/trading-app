
// import { NextResponse } from "next/server";
//
// export async function GET(req: Request) {
//   try {
//     const { path } = req.query;
//     const response = await fetch(`https://api.backpack.exchange/api/v1/depth?symbol=${path}`);
//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error fetching data from the API:", error);
//     return NextResponse.json({ message: "Failed to fetch data" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Use `req.nextUrl` to get query parameters
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path");

    if (!path) {
      return NextResponse.json({ message: "Path parameter is required" }, { status: 400 });
    }

    // Proxy the request to the external API
    const response = await fetch(`https://api.backpack.exchange/api/v1/depth?symbol=${path}`);
    const data = await response.json();

    // Return the API response
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    return NextResponse.json({ message: "Failed to fetch data" }, { status: 500 });
  }
}
