import MarketData from "@/app/componenets/market/MarketData/MarketData";
import Popular from "@/app/componenets/market/TopCards/Popular";
import TopGainers from "@/app/componenets/market/TopCards/TopGainers";
import TopLosers from "@/app/componenets/market/TopCards/TopLosers";
import { cryptocurrencies } from "@/app/utils/coinVaues";
import axios from "axios";

export default async function () {


  // const tickerResponse = await axios.get(
  //   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
  // );
  const backpackResponse = await axios.get(
    "https://api.backpack.exchange/api/v1/tickers"
  );
  const tickerResponse = cryptocurrencies
  // let symbolArray = []
  // backpackResponse.data.map((backpackItem) => {
  //   symbolArray.push(backpackItem.symbol.split("_")[0])
  // })
  // console.log(symbolArray)
  const startTime = Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 7) / 1000)
  const klineBackPack = await axios.get(`https://api.backpack.exchange/wapi/v1/marketDataKlines?interval=6h&startTime=${startTime}`)
  const relevantData = tickerResponse
    .map((tickerValue, index) => {
      // Find matching backpack value based on symbol
      const backPackValue = backpackResponse.data.find(
        (backpackItem) =>
          backpackItem.symbol.split("_")[0].toLowerCase() ===
          tickerValue.symbol.toLowerCase()
      );
      const klineValue = klineBackPack.data.find(
        (value) =>
          value.symbol.split("_")[0].toLowerCase() ===
          tickerValue.symbol.toLowerCase()
      )
      // Return combined data only if a match is found
      let change = null
      if (backPackValue) {
        const stringOFChange = String(backPackValue.priceChangePercent)
        if (stringOFChange.startsWith("-")) {
          const value = String(Math.floor((parseFloat(stringOFChange.substring(1)) * 100) * 100) / 100)
          change = `-${value}`
        } else {
          const value = String(Math.floor((parseFloat(stringOFChange) * 100) * 100) / 100)
          change = value
        }
      }
      return {
        key: index,
        symbol: tickerValue.symbol,
        pairs: backPackValue ? backPackValue.symbol : null,
        name: tickerValue.name,
        image: tickerValue.image,
        price: backPackValue ? backPackValue.lastPrice : null,
        trades: backPackValue ? backPackValue.trades : null,
        change: change,
        volume: backPackValue ? backPackValue.quoteVolume : null, // Use `null` if no match
        kline: klineValue ? klineValue.data : null
      };
    })
  // .filter((item) => item.pairs && item.volume && item.kline !== null); // Exclude items with no volume data

  // console.log("relevantData:", relevantData);

  return (
    <div className=" bg-black h-fit w-full ">
      <div className="grid gap-4 h-fit my-5 mx-64">
        <div className=" grid grid-cols-3 gap-4">
          <div className="bg-background-tile/100 rounded-lg h-fit p-4">
            <div>
              <h2 className="text-base font-bold tabular-nums">Top Gainers</h2>
            </div>
            <div>
              <TopGainers datas={relevantData} />
            </div>
          </div>
          <div className="bg-background-tile/100 rounded-lg h-fit p-4">
            <div>
              <h2 className="text-base font-bold tabular-nums">Popular</h2>
            </div>
            <div>
              <Popular datas={relevantData} />
            </div>
          </div>
          <div className="bg-background-tile/100 rounded-lg h-fit p-4">
            <div>
              <h2 className="text-base font-bold tabular-nums">Top Losers</h2>
            </div>
            <div>
              <TopLosers datas={relevantData} />
            </div>
          </div>
        </div>
        <div className="grid h-fit bg-background-tile/100 rounded-lg">
          <MarketData datas={relevantData} />
        </div>
      </div>
    </div>
  )
}
