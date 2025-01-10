

// import type { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';
//
// export async function GET(
//   req: NextApiRequest,
//   res: NextApiResponse
// ): Promise<void> {
//
//   if (req.method !== "GET") {
//     return res.status(405).json({ message: "hello" });
//   }
//
//
//   console.log('Request Method:', req.method);
//   console.log('Request URL:', req.url);
//   try {
//     const response = await axios.get('https://api.backpack.exchange/api/v1/tickers');
//
//     console.log('Request Method:', req.method);
//     console.log('Request URL:', req.url);
//     // Forward the response data to the frontend
//     res.status(200).json(response.data);
//   } catch (error) {
//     // Handle errors and send a meaningful response
//     console.error('Error fetching data from the API:', error);
//
//     if (axios.isAxiosError(error) && error.response) {
//       // If the error is from Axios and the server responded with an error status
//       res.status(error.response.status).json({ message: error.response.data || 'API Error' });
//     } else {
//       // General error handling
//       res.status(500).json({ message: 'Failed to fetch data' });
//     }
//   }
// }



import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const response = await fetch("https://api.backpack.exchange/api/v1/tickers");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    return NextResponse.json({ message: "Failed to fetch data" }, { status: 500 });
  }
}
