// import axios from "axios"
// import ElementsOfTop from "./ElementsOfTop"
// interface coinValueType {
//   firstPrice: string
//   high: string
//   lastPrice: string
//   low: string
//   priceChange: string
//   priceChangePercent: string
//   quoteVolume: string
//   symbol: string
//   trades: string
//   volume: string
// }
// export default async function Top({ path }: { path: string }) {
//   const allCoinValuesNoData = await axios.get("https://api.backpack.exchange/api/v1/tickers")
//   const allCoinValues: coinValueType[] = allCoinValuesNoData.data
//   const coinValue = allCoinValues.find(allCoinValue => allCoinValue.symbol === { path })
//   console.log(coinValue)
//   console.log(allCoinValues)
//   return (
//     <div className="grid grid-cols-6 col-span-1 row-span-1  ">
//       <div className="flex justify-center items-center">{coinValue.symbol}</div>
//       <ElementsOfTop top="Price" value={coinValue.lastPrice} name="price" />
//       <ElementsOfTop top="24H Change" value={coinValue.priceChangePercent} name="change" />
//       <ElementsOfTop top="24H High" value={coinValue.high} name="high" />
//       <ElementsOfTop top="24H Low" value={coinValue.low} name="low" />
//       <ElementsOfTop top="24H Volume" value={coinValue.quoteVolume} name="volume" />
//     </div>
//   )
// }
//
//
"use client"
import ElementsOfTop from "./ElementsOfTop";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchPriceByApi, setTickerData } from "@/lib/features/tickerPrice/tickerPriceSlice";
import { webSocketManager } from "@/app/utils/webSocketManager";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

interface coinValueType {
  firstPrice: string;
  high: string;
  lastPrice: string;
  low: string;
  priceChange: string;
  priceChangePercent: string;
  quoteVolume: string;
  symbol: string;
  trades: string;
  volume: string;
}

export default function Top({ path }: { path: string }) {
  const dispatch = useAppDispatch()
  const { tickerData, loading, error } = useAppSelector((state) => state.fetchTickerValue)
  // const prevValue = useAppSelector((state) => console.log(state.fetchTickerValue.tickerData?.lastPrice))
  // console.log(prevValue)
  const coinValue = tickerData
  const pathStirng = path.split("_")[0].toLocaleLowerCase()
  useEffect(() => {
    if (path) {
      // getDataOfTickers()
      // dispatch(fetchPriceByApi(path));
      webSocketManager.getInstance().registerCallback("ticker", (data: coinValueType) => dispatch(setTickerData({
        firstPrice: data?.firstPrice ?? '',
        high: data?.high ?? '',
        lastPrice: data?.lastPrice ?? '',
        low: data?.low ?? '',
        priceChange: data?.priceChange ?? '',
        priceChangePercent: data?.priceChangePercent ?? '',
        quoteVolume: data?.quoteVolume ?? '',
        symbol: data?.symbol ?? '',
        trades: data?.trades ?? '',
        volume: data?.volume ?? '',
      })), `TICKER${path}`)
      webSocketManager.getInstance().sendMessage({ "method": "SUBSCRIBE", "params": [`ticker.${path}`] });

      return () => {
        webSocketManager.getInstance().deRegisterCallback("ticker", `TICKER-${path}`);
        webSocketManager.getInstance().sendMessage({ "method": "UNSUBSCRIBE", "params": [`ticker.${path}`] });
      }
    }
  }, [path]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!coinValue) {
    return (
      <div className="w-full h-full">
        <Skeleton
          className="w-full h-full rounded-md animate-pulse"
          baseColor="rgba(32, 33, 39, 0.8)" // Base color for the skeleton background
          highlightColor="rgba(32, 33, 39, 0.6)" // Highlight color for the shimmer
          style={{
            backgroundColor: "rgba(32, 33, 39, 1)", // Ensures the background matches
            borderRadius: "8px", // Optional: Rounded corners
          }}
        />
      </div>
    );
  }
  //
  return (
    <div className=" grid grid-cols-6 col-span-1 row-span-1">
      <div className="grid grid-cols-2">
        <div className="flex justify-end items-center">
          <Image className="rounded-full mr-2" src={`/images/${pathStirng}.webp`} alt={`${pathStirng} logo`} width={35} height={35} />
        </div>
        <div className="flex items-center text-lg font-bold">{coinValue.symbol.split("_")[0]}</div>
      </div>
      <ElementsOfTop top="Price" value={coinValue.lastPrice} name="price" />
      {/* <ElementsOfTop top="24H Change" value={coinValue.priceChangePercent} name="change" /> */}
      <ElementsOfTop top="24H High" value={coinValue.high} name="high" />
      <ElementsOfTop top="24H Low" value={coinValue.low} name="low" />
      <ElementsOfTop top="24H Volume" value={coinValue.quoteVolume} name="volume" />
    </div>
  );
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  //   return <div>Error loading data</div>;
  // }
}


// const getDataOfTickers = async () => {
//   // "use server"
//   const response = await axios.get('https://api.backpack.exchange/api/v1/tickers')
//   console.log(response.data)
// }
