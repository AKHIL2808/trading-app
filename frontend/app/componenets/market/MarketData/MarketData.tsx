// import axios from "axios"
//
// export default async function MarketData() {
//   const tickerValues = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
//   const backPackValues = await axios.get("https://api.backpack.exchange/api/v1/tickers")
//   const relevantData = tickerValues.data.map((tickerValue, index) => {
//     return {
//       key: index,
//       symbol: tickerValue.symbol,
//       name: tickerValue.name,
//       image: tickerValue.image,
//       price: tickerValue.current_price,
//       marketCap: tickerValue.market_cap,
//       change: tickerValue.price_change_percentage_24h,
//       // volume: tickerValue.quoteVolume,
//     }
//   }).map((tickerValue, num, arr) => {
//     backPackValues.data.filter((backPackValue, index) => {
//       if (backPackValue.symbol.split("_")[0] == tickerValue.symbol) {
//         return {
//           key: num,
//           symbol: tickerValue.symbol,
//           name: tickerValue.name,
//           image: tickerValue.image,
//           price: tickerValue.price,
//           marketCap: tickerValue.marketCap,
//           change: tickerValue.change,
//           volume: backPackValue.quoteVolume
//         }
//       }
//     })
//   })
//   console.log("relevantData : ", relevantData)
//   return (
//     <div></div>
//   )
// }

import Link from "next/link";
import ChartData from "./ChartData";
import Image from "next/image";
// import numeral from "numeral"
import { compactInteger } from "humanize-plus";
export default async function MarketData({ datas }) {
  const sortedData = [...datas].sort((a, b) => Number(b.price) - Number(a.price))
  return (
    <div className="px-4">
      <div className="grid grid-cols-7 h-20 border-b border-gray-600/50 ">
        <div className="col-span-2 flex items-center ml-8 text-trade-text-color/100">Name</div>
        <div className="flex justify-center items-center text-trade-text-color/100">Price</div>
        <div className="flex justify-center items-center text-trade-text-color/100">Trades</div>
        <div className="flex justify-center items-center text-trade-text-color/100">24hr Volume</div>
        <div className="flex justify-center items-center text-trade-text-color/100">24hr Change</div>
        <div className="flex justify-center items-center text-trade-text-color/100">Last 7 Days</div>
      </div>
      {sortedData.map((data, index) => {
        const change = String(data.change);
        const isNegative = change.startsWith("-");
        const symbolString = String(data.symbol).toLowerCase();
        const formattedVolume = compactInteger(Number(data.volume), 1);
        return (
          <Link
            key={index}
            href={`/trade/${data.pairs}`}
            className="cursor-pointer h-20 grid grid-cols-7 border-b border-gray-600/50 hover:bg-background-tile-top/100"
          >
            <div className="grid grid-cols-5 gap-4 col-span-2">
              <div className="col-span-1 flex items-center flex-row-reverse">
                {/* Use an absolute path for images */}
                <Image
                  className="rounded-full"
                  src={`/images/${symbolString}.webp`} // Ensure the file extension matches your images
                  alt={symbolString}
                  width={40}
                  height={40}
                />
              </div>
              <div className="col-span-4 flex flex-col justify-center">
                <div className="right-0">
                  <h1 className="text-base font-bold tabular-nums">{data.name}</h1>
                </div>
                <div className="text-trade-text-color">{data.symbol}</div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-base font-bold tabular-nums">${data.price}</p>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-base font-bold tabular-nums">{data.trades}</p>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-base font-bold tabular-nums">${formattedVolume}</p>
            </div>
            <div className="flex justify-center items-center">
              <p
                className={`text-base font-bold tabular-nums ${isNegative ? "text-radium-red/100" : "text-radium-green/100"
                  }`}
              >
                {data.change} %
              </p>
            </div>
            <div className="flex justify-center items-center">
              <ChartData chartData={data.kline} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
